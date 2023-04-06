import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { grey, red } from '@mui/material/colors';
import Empty from '../empty';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Button from '../button';
import {
	QueryKey,
	API_ENDPOINTS,
	LINKS,
	LIGHT_GRAY,
	BOX_SHADOW,
	SUCCESS_COLOR,
	DANGER_COLOR,
} from '../../utilities';
import { useAppSelector } from '../../store/hooks';
import TableLoader from '../loader/table-loader';
import Loader from '../loader';
import { networks, updateNetwork } from '../../api';
import { useAlert, useHandleError } from '../../hooks';

const DataTypesTable = () => {
	const theme = useTheme();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { isAuthenticated } = useAppSelector((store) => store.authState);

	const { isLoading, data } = useQuery(
		QueryKey.DataNetwork,
		() =>
			networks({
				url: API_ENDPOINTS.DataNetwork,
				params: {
					sort: '-createdAt',
				},
			}),
		{
			enabled: isAuthenticated,
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
					queryClient.invalidateQueries(QueryKey.DataNetwork);
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
		mutateUpdateNetwork({
			data: {
				isActive: status,
			},
			url: API_ENDPOINTS.DataNetwork,
			id,
		});
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
							<TableCell>Data Type Name</TableCell>
							<TableCell>Number of plans</TableCell>
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
							data.payload.map((data: any) => (
								<TableRow key={data.id}>
									<TableCell>{data.name}</TableCell>
									<TableCell>{data.name}</TableCell>
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
														id: data.id,
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
									<TableCell
										onClick={() =>
											navigate(
												`${LINKS.DataPlan}/${data.name
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
										View plans
									</TableCell>
									<TableCell
										onClick={() => console.log('Delete')}
										sx={{
											':hover': {
												textDecoration: 'underline',
											},
										}}
										style={styles.deletePlan}
									>
										Delete
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
	deletePlan: {
		color: red['800'],
	},
});

export default DataTypesTable;
