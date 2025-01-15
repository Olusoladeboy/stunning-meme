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
import moment from 'moment';
import {
	LIGHT_GRAY,
	formatNumberToCurrency,
	Transaction,
	extractUserName,
	checkAmount,
	Amount,
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

const LienTransactionsTable = ({ data, isLoading }: Props) => {
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
							<CustomTableCell label={'Email'} />
							<CustomTableCell label={'Reference'} />
							<CustomTableCell label={'Lien Before'} />
							<CustomTableCell label={'Lien After'} />
							<CustomTableCell label={'Amount'} />
							<CustomTableCell label={'Date'} />
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
							<Loader colSpan={8} />
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
														<Typography sx={{ whiteSpace: 'nowrap' }}>
															{data?.user && extractUserName(data.user)}
														</Typography>
													</Box>
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{data.type}
												</StyledTableCell>

												<StyledTableCell style={styles.text}>
													{data.reference}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(
														checkAmount(data.lienBefore as string)
													)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(
														checkAmount(data.lienAfter as string)
													)}
												</StyledTableCell>

												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(
														checkAmount(data.amount as string | Amount)
													)}
												</StyledTableCell>
												<StyledTableCell
													sx={{
														whiteSpace: 'nowrap',
													}}
													style={styles.text}
												>
													{moment.utc(data.createdAt).format('ll')}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={8} text={'No Lien Transactions'} />
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

export default LienTransactionsTable;
