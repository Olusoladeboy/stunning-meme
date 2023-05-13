import React, { CSSProperties, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
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
} from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import { grey } from '@mui/material/colors';
import Image from '../image';
import Button from '../button/custom-button';
import Empty from '../empty';
import { networks, updateNetwork } from 'api';
import { useAppSelector } from 'store/hooks';
import TableLoader from '../loader/table-loader';
import NetworkForm from '../forms/network-form';
import Modal from '../modal/Wrapper';
import Loader from '../loader';
import { useAlert, useHandleError } from 'hooks';

const WARNING_MESSAGE = `You can't perform this operation`;

interface AitimeNetworkTypes extends NetworkData {
	isActive: boolean;
	id: string;
}

const AirtimeNetworkTable = () => {
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const [selectedNetwork, setSelectedNetwork] = useState<NetworkData | null>(
		null
	);

	const { token, canCreateOrUpdateRecord } = useAppSelector(
		(store) => store.authState
	);

	const { isLoading, data } = useQuery(
		QueryKeys.AirtimeNetwork,
		() =>
			networks({
				url: API_ENDPOINTS.AirtimeNetwork,
			}),
		{
			enabled: !!token,
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
					setAlert({ message: data.message, type: 'success' });
					queryClient.invalidateQueries(QueryKeys.DataNetwork);
					queryClient.invalidateQueries(QueryKeys.AirtimeNetwork);
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
		if (canCreateOrUpdateRecord) {
			return mutateUpdateNetwork({
				data: {
					isActive: status,
				},
				url: API_ENDPOINTS.AirtimeNetwork,
				id,
			});
		}
		setAlert({ message: WARNING_MESSAGE, type: 'info' });
	};

	return (
		<>
			{isUpdating && <Loader />}
			{selectedNetwork && (
				<Modal
					hasCloseButton
					title={`Edit ${selectedNetwork.name}`}
					closeModal={() => setSelectedNetwork(null)}
				>
					<NetworkForm
						isEdit
						network={selectedNetwork}
						type={NetworkPage.AIRTIME_NETWORK}
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
							<TableCell>USSD code</TableCell>
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
							data.payload.map((data: AitimeNetworkTypes) => (
								<TableRow key={data.id}>
									<TableCell>{data.name}</TableCell>
									<TableCell>{data.ussd}</TableCell>
									<TableCell>
										<Box
											onClick={() => {
												if (canCreateOrUpdateRecord) {
													return setSelectedNetwork(data);
												}

												setAlert({ message: WARNING_MESSAGE, type: 'info' });
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
												disabled={data.isActive}
												style={{
													backgroundColor: data.isActive
														? SUCCESS_COLOR
														: grey[400],
													color: grey[50],
												}}
												onClick={() =>
													handleEnableDisableNetwork({
														status: true,
														id: data.id,
													})
												}
											>
												Enable
											</Button>
											<Button
												disabled={!data.isActive}
												onClick={() =>
													handleEnableDisableNetwork({
														status: false,
														id: data.id,
													})
												}
												style={{
													backgroundColor: !data.isActive
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

export default AirtimeNetworkTable;
