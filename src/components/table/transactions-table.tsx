import React, { useState } from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import {
	Typography,
	useTheme,
	Avatar,
	TableBody,
	TableHead,
} from '@mui/material';
import { Check, Close, AccessTime } from '@mui/icons-material';
import moment from 'moment';
import {
	LIGHT_GRAY,
	SUCCESS_COLOR,
	PENDING_COLOR,
	DANGER_COLOR,
	formatNumberToCurrency,
	Transaction,
	TransactionStatus,
} from 'utilities';
import { StyledTableCell, StyledTableRow } from './components';
import Empty from '../empty/table-empty';
import Loader from '../loader/table-loader';
import TransactionDetailsModal from '../modal/transaction-details-modal';
import CustomTableCell from './components/custom-table-cell';

type Props = {
	data: Transaction[] | null;
	isLoading?: boolean;
};

const setColor = (status: string) => {
	if (status === TransactionStatus.SUCCESSFUL) {
		return SUCCESS_COLOR;
	} else if (status === TransactionStatus.PENDING) {
		return PENDING_COLOR;
	} else {
		return DANGER_COLOR;
	}
};

const TransactionsTable = ({ data, isLoading }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);
	return (
		<>
			{selectedTransaction && (
				<TransactionDetailsModal
					closeModal={() => setSelectedTransaction(null)}
					transaction={selectedTransaction}
					isDisplayButtons
				/>
			)}
			<Box sx={{ overflow: 'auto' }}>
				<Table sx={{ overflow: 'auto' }} stickyHeader>
					<TableHead
						sx={{
							'& tr': {
								backgroundColor: LIGHT_GRAY,
								color: theme.palette.primary.main,
								fontWeight: '600',
							},
						}}
					>
						<StyledTableRow>
							<CustomTableCell label={'User'} />
							<CustomTableCell label={'Transaction'} />
							<CustomTableCell label={'Reference'} />
							<CustomTableCell label={'Date'} />
							<CustomTableCell label={'Time'} />
							<CustomTableCell label={'Status'} />
							<CustomTableCell label={'Amount'} />
						</StyledTableRow>
					</TableHead>
					<TableBody
						sx={{
							'& tr': {
								color: theme.palette.primary.main,
							},
						}}
					>
						{isLoading ? (
							<Loader colSpan={7} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((data: Transaction, key: number) => (
											<StyledTableRow
												onClick={() => setSelectedTransaction(data)}
												key={key}
											>
												<StyledTableCell style={styles.text}>
													<Box
														sx={{
															display: 'flex',
															alignItems: 'center',
															gap: theme.spacing(2),
														}}
													>
														<Avatar
															style={styles.avatar}
															src={
																data && data.user && data.user.photoUrl
																	? data.user.photoUrl
																	: ''
															}
														/>
														<Typography>
															{data.user?.firstname} {data.user?.lastname}
														</Typography>
													</Box>
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{data.transaction
														? data.transaction.service
														: data.service
														? data.service
														: data.type}
												</StyledTableCell>

												<StyledTableCell style={styles.text}>
													{data.reference}
												</StyledTableCell>

												<StyledTableCell style={styles.text}>
													{moment.utc(data.createdAt).format('ll')}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{moment.utc(data.createdAt).format('LT')}
												</StyledTableCell>
												<StyledTableCell>
													<Box
														sx={{
															display: 'flex',
															color: setColor(data.status),
															alignItems: 'center',
															gap: theme.spacing(2),
														}}
													>
														<Box
															sx={{
																padding: '5px',
																position: 'relative',
																height: '20px',
																width: '20px',
																display: 'flex',
																alignItems: 'center',
																justifyContent: 'center',
																svg: {
																	fontSize: '14px',
																},
															}}
														>
															{data.status === TransactionStatus.SUCCESSFUL ? (
																<Check />
															) : data.status === TransactionStatus.PENDING ? (
																<AccessTime />
															) : (
																<Close />
															)}
															<Box
																sx={{
																	backgroundColor: setColor(data.status),
																	height: '100%',
																	width: '100%',
																	position: 'absolute',
																	zIndex: '0',
																	opacity: '0.15',
																	borderRadius: '50%',
																}}
															/>
														</Box>
														{data.status}
													</Box>
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(
														typeof data.amount !== 'string'
															? data.amount.$numberDecimal
															: data.amount
													)}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={7} text={'No Transactions'} />
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
	tableHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(3),
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.primary.main,
	},
	avatar: {
		height: '30px',
		width: '30px',
	},
});

export default TransactionsTable;
