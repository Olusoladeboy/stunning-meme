import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { grey } from '@mui/material/colors';
import Empty from '../empty';
import {
	LIGHT_GRAY,
	BOX_SHADOW,
	SUCCESS_COLOR,
	DANGER_COLOR,
	QueryKeys,
	API_ENDPOINTS,
	LINKS,
	NetworkData,
} from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Button from '../button';
import { useAppSelector } from 'store/hooks';
import TableLoader from '../loader/table-loader';
import Loader from '../loader';
import { useAlert, useHandleError } from 'hooks';
import { networks, updateNetwork } from 'api';

const DataNetworkTable = () => {
	const theme = useTheme();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { token, canCreateOrUpdateRecord } = useAppSelector(
		(store) => store.authState
	);

	const { isLoading, data } = useQuery(
		QueryKeys.DataNetwork,
		() =>
			networks({
				url: API_ENDPOINTS.DataNetwork,
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
					setAlert({
						message: data.message,
						type: 'success',
					});
					queryClient.invalidateQueries(QueryKeys.DataNetwork);
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
				url: API_ENDPOINTS.DataNetwork,
				id,
			});
		}

		setAlert({ message: `You can't perform this opertaion`, type: 'info' });
	};

	return (
		<>
			{isUpdating && <Loader />}
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
							<TableCell>Number of Types</TableCell>
							<TableCell sx={{ minWidth: '50px', maxWidth: '100px' }} />
							<TableCell />
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
							data.payload.map((data: NetworkData) => (
								<TableRow key={data.id}>
									<TableCell>{data.name}</TableCell>
									<TableCell>{data.no_of_dataTypes}</TableCell>
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
												onClick={() =>
													handleEnableDisableNetwork({
														status: true,
														id: data.id as string,
													})
												}
												style={{
													backgroundColor: data.isActive
														? SUCCESS_COLOR
														: grey[400],
													color: grey[50],
												}}
											>
												Enable
											</Button>
											<Button
												disabled={!data.isActive}
												onClick={() =>
													handleEnableDisableNetwork({
														status: false,
														id: data.id as string,
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
									<TableCell
										onClick={() =>
											navigate(
												`${LINKS.DataTypes}/${(data.name as string)
													.toString()
													.toLowerCase()}/${data.id}`
											)
										}
										sx={{
											':hover': {
												textDecoration: 'underline',
											},
										}}
										style={styles.viewPlan}
									>
										View Types
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
	viewPlan: {
		color: theme.palette.secondary.main,
		cursor: 'pointer',
	},
});

export default DataNetworkTable;
