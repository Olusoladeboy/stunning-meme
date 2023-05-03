import React, { useState } from 'react';
import {
	Table,
	Box,
	useTheme,
	TableBody,
	TableHead,
	TableRow,
} from '@mui/material';
import moment from 'moment';
import { StyledTableRow, StyledTableCell } from './components';
import {
	Transaction,
	formatNumberToCurrency,
	LIGHT_GRAY,
	checkTransactionAmount,
	checkAmount,
} from '../../utilities';
import Loader from '../loader/table-loader';
import Empty from '../empty/table-empty';

import CustomTableCell from './components/custom-table-cell';
import TransactionDetailsModal from '../modal/transaction-details-modal';

type Props = {
	transactions: Transaction[] | null;
	isLoading?: boolean;
};

const WalletSummaryTable = ({ transactions, isLoading }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);

	return (
		<Box sx={{ overflow: 'auto' }}>
			{selectedTransaction && (
				<TransactionDetailsModal
					closeModal={() => setSelectedTransaction(null)}
					transaction={selectedTransaction}
				/>
			)}
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
						<CustomTableCell label={'Reference'} />
						<CustomTableCell label={'Amount'} />
						<CustomTableCell label={'Product'} />
						<CustomTableCell label={'Prev Balance'} />
						<CustomTableCell label={'New Balance'} />

						<CustomTableCell label={'Date'} />
						<CustomTableCell label={'Time'} />
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
						<Loader colSpan={7} />
					) : (
						transactions && (
							<>
								{transactions.length > 0 ? (
									transactions.map((row: Transaction) => (
										<StyledTableRow
											onClick={() => setSelectedTransaction(row)}
											key={row.id}
										>
											<StyledTableCell style={styles.text}>
												{row.reference || 'No transaction reference'}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{formatNumberToCurrency(checkAmount(row.amount))}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{row.transaction
													? row.transaction.service
													: row.service
													? row.service
													: 'No Available Service'}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{formatNumberToCurrency(
													checkTransactionAmount({
														transaction: row,
														field: 'balanceBefore',
													})
												)}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{formatNumberToCurrency(
													checkTransactionAmount({
														transaction: row,
														field: 'balanceAfter',
													})
												)}
											</StyledTableCell>

											<StyledTableCell style={styles.text}>
												{moment.utc(row.createdAt).format('ll')}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{moment.utc(row.createdAt).format('LT')}
											</StyledTableCell>
										</StyledTableRow>
									))
								) : (
									<Empty colSpan={7} text={'No Wallet Summary'} />
								)}
							</>
						)
					)}
				</TableBody>
			</Table>
		</Box>
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
	paginationWrapper: {
		marginRight: '20px',
		marginTop: '2rem',
		display: 'flex',
		justifyContent: 'flex-end',
	},
});

export default WalletSummaryTable;
