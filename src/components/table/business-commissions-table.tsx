import React from 'react';
import {
	useTheme,
	Box,
	TableBody,
	TableHead,
	TableRow,
	Table,
} from '@mui/material';
import moment from 'moment';
import { StyledTableRow, StyledTableCell } from './components';
import { ErrorBoundary, LIGHT_GRAY, ICommission, QueryKeys } from 'utilities';
import TableLoader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import Button from 'components/button';
import { red } from '@mui/material/colors';
import { useMutation, useQueryClient } from 'react-query';
import { deleteBusinessCommissions } from 'api';
import Loader from 'components/loader';

type Props = {
	data?: ICommission[] | null;
	isLoading?: boolean;
	clearSearch?(): void;
	searchTransaction?(value: string): void;
	handleSelectCommission?: (commission: ICommission) => void;
};

const BusinessCommissionsTable = ({
	isLoading,
	data,
	handleSelectCommission,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: mutateDelete } = useMutation(
		deleteBusinessCommissions,
		{
			onSettled: (data, error) => {
				queryClient.invalidateQueries(QueryKeys.Commissions);
			},
		}
	);

	const handleMutateDelete = (id: string) => {
		mutateDelete(id);
	};

	return (
		<>
			{isDeleting && <Loader />}
			<Box sx={{ overflow: 'auto' }}>
				<ErrorBoundary>
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
								<CustomTableCell label={'Service Type'} />
								<CustomTableCell label={'Percentage Rate'} />
								<CustomTableCell label={'Date'} />
								<CustomTableCell label={'Time'} />
								<CustomTableCell label={'Actions'} />
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
								<TableLoader colSpan={6} />
							) : (
								data && (
									<>
										{data.length > 0 ? (
											data.map((row: ICommission) => (
												<StyledTableRow key={row.id}>
													<StyledTableCell style={styles.text}>
														{row.serviceType}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{parseFloat(row.commissionRate) * 100}%
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{moment.utc(row.createdAt).format('ll')}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{moment.utc(row.createdAt).format('LT')}
													</StyledTableCell>
													<StyledTableCell
														sx={{
															display: 'flex',
															gap: '5px',
															alignItems: 'center',
														}}
													>
														<Button
															onClick={() => {
																typeof handleSelectCommission === 'function' &&
																	handleSelectCommission(row);
															}}
															style={styles.updateButton}
															variant='outlined'
														>
															Update
														</Button>
														<Button
															onClick={() => handleMutateDelete(row.id)}
															style={styles.deleteButton}
															variant='outlined'
														>
															Delete
														</Button>
													</StyledTableCell>
												</StyledTableRow>
											))
										) : (
											<Empty colSpan={6} text={'No available commission'} />
										)}
									</>
								)
							)}
						</TableBody>
					</Table>
				</ErrorBoundary>
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.primary.main,
	},
	deleteButton: {
		backgroundColor: red['600'],
		color: 'white',
		borderColor: red['600'],
	},
	updateButton: {
		backgroundColor: theme.palette.secondary.main,
		color: 'white',
		borderColor: theme.palette.secondary.main,
	},
});

export default BusinessCommissionsTable;
