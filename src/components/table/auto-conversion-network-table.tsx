import React, { CSSProperties, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { useTheme, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import {
	LIGHT_GRAY,
	BOX_SHADOW,
	SUCCESS_COLOR,
	DANGER_COLOR,
	QueryKeys,
	API_ENDPOINTS,
	NetworkData,
	NetworkPage,
	AUTO_AIRTIME_CONVERT_PROVIDERS,
} from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import { grey } from '@mui/material/colors';
import Image from '../image';
import Button from '../button/custom-button';
import Empty from '../empty';
import { useAppSelector } from 'store/hooks';
import TableLoader from '../loader/table-loader';
import NetworkForm from '../forms/network-form';
import Modal from '../modal/Wrapper';
import Loader from '../loader';
import { useAlert, useHandleError, useUpdateSettings } from 'hooks';
import { networks, updateAutoConvertAirtimeProvider, updateNetwork } from 'api';

const AutoConversionNetworkTable = () => {
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const [selectedNetwork, setSelectedNetwork] = useState<NetworkData | null>(
		null
	);
	const [isEdit, setEdit] = useState<boolean>(false);
	const [isSwitchProvider, setSwitchProvider] = useState<boolean>(false);

	const token = useAppSelector((store) => store.authState.token);

	const { isLoading, data } = useQuery(
		QueryKeys.AutoConvertNetwork,
		() =>
			networks({
				url: API_ENDPOINTS.AutoConvertNetwork,
				params: {
					sort: '-createdAt',
				},
			}),
		{
			enabled: !!token,
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}
			},
		}
	);

	const { isLoading: isUpdating, mutate: mutateUpdateNetwork } = useMutation(
		updateNetwork,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					queryClient.invalidateQueries(QueryKeys.AutoConvertNetwork);
					setAlert({ message: data.message, type: 'success' });
				}
			},
		}
	);

	const {
		isLoading: isUpdatingNetworkProvider,
		mutate: mutateUpdateNetworkProvider,
	} = useMutation(updateAutoConvertAirtimeProvider, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}

			if (data && data.success) {
				queryClient.invalidateQueries(QueryKeys.AutoConvertNetwork);
				setSelectedNetwork(null);
				setSwitchProvider(false);
				setAlert({ message: data.message, type: 'success' });
			}
		},
	});

	const handleEnableDisableNetwork = ({
		status,
		id,
	}: {
		status: boolean;
		id: string;
	}) => {
		mutateUpdateNetwork({
			data: {
				isActive: status,
			},
			url: API_ENDPOINTS.AutoConvertNetwork,
			id,
		});
	};

	const onSwitchProvider = (value: string) => {
		if (selectedNetwork) {
			mutateUpdateNetworkProvider({
				id: selectedNetwork.id as string,
				data: {
					isActive: true,
					gateway: value,
				},
			});
		}
	};

	return (
		<>
			{(isUpdating || isUpdatingNetworkProvider) && <Loader />}
			{selectedNetwork && isEdit && (
				<Modal
					title={`Edit ${selectedNetwork?.name}`}
					hasCloseButton
					closeModal={() => {
						setSelectedNetwork(null);
						setEdit(false);
					}}
				>
					<NetworkForm
						isEdit
						network={selectedNetwork}
						type={NetworkPage.AUTO_CONVERSION_NETWORK}
						callback={() => {
							setSelectedNetwork(null);
							setEdit(false);
						}}
					/>
				</Modal>
			)}
			{selectedNetwork && isSwitchProvider && (
				<Modal
					title={`Switch Provider`}
					hasCloseButton
					closeModal={() => {
						setSelectedNetwork(null);
						setSwitchProvider(false);
					}}
				>
					<Typography>Select Provider</Typography>
					<Box
						sx={{
							display: 'grid',
							gap: '4px',
							marginTop: '6px',
						}}
					>
						{Object.values(AUTO_AIRTIME_CONVERT_PROVIDERS).map((value) => (
							<Button
								disabled={selectedNetwork.gateway === value}
								onClick={() => onSwitchProvider(value)}
								variant='outlined'
								sx={{
									borderColor: theme.palette.secondary.main,
									backgroundColor:
										selectedNetwork.gateway === value
											? theme.palette.secondary.main
											: 'white',
									color:
										selectedNetwork.gateway === value
											? 'white'
											: theme.palette.primary.main,
									':hover': {
										background: theme.palette.secondary.main,
										borderColor: theme.palette.secondary.main,
										color: 'white',
									},
								}}
								key={value}
							>
								{value}
							</Button>
						))}
					</Box>
				</Modal>
			)}
			<Box sx={{ overflow: 'auto' }}>
				<Table sx={{ overflow: 'auto' }} stickyHeader>
					<TableHead
						sx={{
							'& tr': {
								backgroundColor: LIGHT_GRAY,
								color: theme.palette.primary.main,
							},
						}}
					>
						<TableRow>
							<TableCell>Network Name</TableCell>
							<TableCell>Rate</TableCell>
							<TableCell>Provider</TableCell>
							<TableCell>Actions</TableCell>
							<TableCell sx={{ minWidth: '50px', maxWidth: '100px' }} />
						</TableRow>
					</TableHead>
					<TableBody
						sx={{
							'& tr': {
								color: theme.palette.primary.main,
							},
						}}
					>
						{isLoading ? (
							<TableLoader colSpan={5} />
						) : data && data.payload.length > 0 ? (
							data.payload.map((data: NetworkData) => (
								<TableRow key={data.id}>
									<TableCell>{data.name}</TableCell>
									<TableCell>{data.rate}%</TableCell>
									<TableCell>
										<Box
											onClick={() => {
												setSelectedNetwork(data);
												setSwitchProvider(true);
											}}
											style={styles.editNetwork as CSSProperties}
										>
											{data.gateway ? (
												<>
													{data?.gateway}
													<Image
														sx={{
															width: '15px',
															img: { width: '100%' },
															display: 'flex',
															alignItems: 'center',
														}}
														src={require('assets/icons/edit.png')}
														alt={'edit'}
													/>
												</>
											) : (
												'No available gateway'
											)}
										</Box>
									</TableCell>
									<TableCell>
										<Box
											onClick={() => {
												setSelectedNetwork(data);
												setEdit(true);
											}}
											style={styles.editNetwork as CSSProperties}
										>
											Edit network{' '}
											<Image
												sx={{
													width: '15px',
													img: { width: '100%' },
													display: 'flex',
													alignItems: 'center',
												}}
												src={require('assets/icons/edit.png')}
												alt={'edit'}
											/>
										</Box>
									</TableCell>

									<TableCell sx={{ maxWidth: '200px' }}>
										<Box
											sx={{
												button: {
													minWidth: '120px',
													color: grey[50],
													backgroundColor: grey[400],
													textTransform: 'uppercase',
												},
											}}
											style={styles.statusBtnWrapper}
										>
											<Button
												disabled={Boolean(data.isActive)}
												style={{
													backgroundColor: Boolean(data.isActive)
														? SUCCESS_COLOR
														: grey[400],
													color: grey[50],
												}}
												onClick={() =>
													handleEnableDisableNetwork({
														status: true,
														id: data.id as string,
													})
												}
											>
												Enable
											</Button>
											<Button
												disabled={!Boolean(data.isActive)}
												onClick={() =>
													handleEnableDisableNetwork({
														status: false,
														id: data.id as string,
													})
												}
												style={{
													backgroundColor: !Boolean(data.isActive)
														? DANGER_COLOR
														: grey[400],
													color: grey[50],
												}}
											>
												Disable
											</Button>
										</Box>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5}>
									<Empty text={'No available network'} />
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	editNetwork: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		cursor: 'pointer',
		userSelect: 'none',
	},
	statusBtnWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(4),
	},
});

export default AutoConversionNetworkTable;
