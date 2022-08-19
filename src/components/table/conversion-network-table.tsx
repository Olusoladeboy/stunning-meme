import React, { CSSProperties, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import { useSnackbar } from 'notistack';
import TableHead from '@mui/material/TableHead';
import {
	LIGHT_GRAY,
	BOX_SHADOW,
	SUCCESS_COLOR,
	DANGER_COLOR,
} from '../../utilities/constant';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import { grey } from '@mui/material/colors';
import Image from '../image';
import Button from '../button/custom-button';
import Empty from '../empty';
import {
	QueryKeyTypes,
	API_ENDPOINTS,
	NetworkDataTypes,
	NetworkPageTypes,
} from '../../utilities/types';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';
import TableLoader from '../loader/table-loader';
import handleResponse from '../../utilities/helpers/handleResponse';
import NetworkForm from '../forms/add-network-form';
import Modal from '../modal/Wrapper';
import Loader from '../loader';

interface ConversionNetworkTypes extends NetworkDataTypes {
	isActive: boolean;
	id: string;
}

const ConversionNetworkTable = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const [selectedNetwork, setSelectedNetwork] =
		useState<NetworkDataTypes | null>(null);

	const { enqueueSnackbar } = useSnackbar();
	const { token } = useAppSelector((store) => store.authState);

	const { isLoading, data } = useQuery(
		QueryKeyTypes.ConvertNetwork,
		() =>
			Api.Network.GetNetwork({
				token: token || '',
				url: API_ENDPOINTS.ConvertNetworks,
			}),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}
			},
		}
	);

	const { isLoading: isUpdating, mutate: updateNetwork } = useMutation(
		Api.Network.UpdateNetwork,
		{
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}

				if (data && data.success) {
					queryClient.invalidateQueries(QueryKeyTypes.ConvertNetwork);
					enqueueSnackbar(data.message, { variant: 'success' });
				}
			},
		}
	);

	const handleEnableDisableNetwork = ({
		status,
		id,
	}: {
		status: boolean;
		id: string;
	}) => {
		updateNetwork({
			token: token as string,
			data: {
				isActive: status,
			},
			url: API_ENDPOINTS.ConvertNetworks,
			id,
		});
	};

	return (
		<>
			{isUpdating && <Loader />}
			{selectedNetwork && (
				<Modal
					title={`Edit ${selectedNetwork.name}`}
					close={() => setSelectedNetwork(null)}
				>
					<NetworkForm
						isEdit
						network={selectedNetwork}
						type={NetworkPageTypes.CONVERSION_NETWORK}
						handleContinue={() => setSelectedNetwork(null)}
					/>
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
							<TableCell>Number</TableCell>
							<TableCell>Rate</TableCell>
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
							<TableLoader colSpan={4} />
						) : data && data.payload.length > 0 ? (
							data.payload.map((data: ConversionNetworkTypes) => (
								<TableRow key={data.id}>
									<TableCell>{data.name}</TableCell>
									<TableCell>{data.number}</TableCell>
									<TableCell>{data.rate}%</TableCell>
									<TableCell>
										<Box
											onClick={() => setSelectedNetwork(data)}
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
												src={require('../../assets/icons/edit.png')}
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
												buttonProps={{
													style: {
														backgroundColor: data.isActive
															? SUCCESS_COLOR
															: grey[400],
														color: grey[50],
													},
													disabled: data.isActive,
													onClick: () =>
														handleEnableDisableNetwork({
															status: true,
															id: data.id,
														}),
												}}
											>
												Enable
											</Button>
											<Button
												buttonProps={{
													style: {
														backgroundColor: !data.isActive
															? DANGER_COLOR
															: grey[400],
														color: grey[50],
													},
													disabled: !data.isActive,
													onClick: () =>
														handleEnableDisableNetwork({
															status: false,
															id: data.id,
														}),
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
								<TableCell colSpan={4}>
									<Empty />
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

export default ConversionNetworkTable;
