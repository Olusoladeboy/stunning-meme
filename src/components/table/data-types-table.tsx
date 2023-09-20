import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import { useQueryClient, useMutation } from 'react-query';
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
	LINKS,
	LIGHT_GRAY,
	BOX_SHADOW,
	SUCCESS_COLOR,
	DANGER_COLOR,
	DataType,
	QueryKeys,
} from 'utilities';
import TableLoader from '../loader/table-loader';
import Loader from '../loader';
import { updateDataType } from 'api';
import { useAlert, useHandleError } from 'hooks';
import { useAppSelector } from 'store/hooks';

interface Props {
	data: DataType[] | null | undefined;
	isLoading?: boolean;
}

const DataTypesTable: React.FC<Props> = ({ isLoading, data }) => {
	const theme = useTheme();
	const { network } = useParams();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { canCreateOrUpdateRecord } = useAppSelector(
		(store) => store.authState
	);

	const { isLoading: isUpdating, mutate: mutateUpdateDataType } = useMutation(
		updateDataType,
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
					queryClient.invalidateQueries(QueryKeys.DataTypes);
				}
			},
		}
	);

	const handleEnableDisableDataType = ({
		status,
		id,
	}: {
		status: boolean;
		id: string;
	}) => {
		if (canCreateOrUpdateRecord) {
			return mutateUpdateDataType({
				data: {
					isActive: status,
				},
				id,
			});
		}
		setAlert({ message: `You can't perform  this operation`, type: 'info' });
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
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((data: DataType) => (
											<TableRow key={data.id}>
												<TableCell>{data.name}</TableCell>
												<TableCell>{data.no_of_plans}</TableCell>
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
																handleEnableDisableDataType({
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
																handleEnableDisableDataType({
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
															`${LINKS.DataPlan}/${data.id}/${(
																data.name as string
															)
																.toString()
																.toLowerCase()}/${network}`
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
												{/* <TableCell
													onClick={() => console.log('Delete')}
													sx={{
														':hover': {
															textDecoration: 'underline',
														},
													}}
													style={styles.deletePlan}
												>
													Delete
												</TableCell> */}
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={4}>
												<Empty text={'No data type'} />
											</TableCell>
										</TableRow>
									)}
								</>
							)
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
