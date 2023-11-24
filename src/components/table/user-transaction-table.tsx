import React, { useState } from 'react';
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
import TableHeader from '../header/table-header';
import {
	Transaction,
	formatNumberToCurrency,
	ErrorBoundary,
	LIGHT_GRAY,
	checkAmount,
} from 'utilities';
import Loader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TransactionDetailsModal from '../modal/transaction-details-modal';

type Props = {
	data?: Transaction[] | null;
	isLoading?: boolean;
	clearSearch?(): void;
	searchTransaction?(value: string): void;
};

const UserTransactionsTable = ({
	clearSearch,
	searchTransaction,
	isLoading,
	data,
}: Props) => {
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
			<Box sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' }, width: '100%' }}>
				<TableHeader
					title={'User Transaction Summary'}
					searchPlaceholder={'Search transaction by reference...'}
					clearSearch={clearSearch}
					handleSearch={searchTransaction}
				/>
			</Box>
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
							<CustomTableCell isSortable label={'Transaction'} />
							<CustomTableCell isSortable label={'Reference'} />
							<CustomTableCell isSortable label={'Amount'} />
							<CustomTableCell label={'Date'} />
							<CustomTableCell label={'Time'} />
							<CustomTableCell label={'Status'} />
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
							<Loader colSpan={6} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((row: Transaction) => (
											<StyledTableRow
												onClick={() => setSelectedTransaction(row)}
												key={row.id}
											>
												<StyledTableCell style={styles.text}>
													{row.transaction
														? row.transaction.service
														: row.service
														? row.service
														: row.type}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{row.reference
														? row.reference
														: row.transaction
														? row.transaction.reference
														: 'No Reference'}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(checkAmount(row.amount))}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{moment.utc(row.createdAt).format('ll')}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{moment.utc(row.createdAt).format('LT')}
												</StyledTableCell>

												<StyledTableCell style={styles.text}>
													{row.status}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={6} text={'No Transaction Summary'} />
									)}
								</>
							)
						)}
					</TableBody>
				</Table>
			</ErrorBoundary>
		</Box>
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
});

export default UserTransactionsTable;
