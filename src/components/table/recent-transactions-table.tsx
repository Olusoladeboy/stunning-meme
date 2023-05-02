import React, { useState } from 'react';
import {
	Typography,
	useTheme,
	Box,
	TableBody,
	Table,
	TableCell,
	TableHead,
	styled,
	TableRow,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

import { grey } from '@mui/material/colors';
import {
	LIGHT_GRAY,
	BOX_SHADOW,
	LINKS,
	QueryKeys,
	formatNumberToCurrency,
	Transaction,
} from '../../utilities';
import Link from '../link';
import Empty from '../empty/table-empty';
import Loader from '../loader/table-loader';
import { allTransactions } from '../../api';
import TransactionModal from '../modal/transaction-details-modal';
import { useQueryHook } from '../../hooks';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// backgroundColor: LIGHT_GRAY,
		backgroundSize: 'cover',

		backgroundPosition: 'top-left',
		fontSize: '14px',
		color: theme.palette.primary.main,
		fontWeight: '600',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: '14px',
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	color: theme.palette.primary.main,
	cursor: 'pointer',
	'&:nth-of-type(odd)': {
		backgroundColor: '#FDF8F1',
	},
	'&:nth-of-type(even)': {
		backgroundColor: grey[50],
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const RecentTransactionsTable = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);

	const { isLoading, data } = useQueryHook({
		queryKey: QueryKeys.RecentTransactions,
		queryFn: () =>
			allTransactions({
				params: { sort: '-createdAt', limit: 4 },
			}),
	});

	return (
		<>
			{selectedTransaction && (
				<TransactionModal
					transaction={selectedTransaction}
					closeModal={() => setSelectedTransaction(null)}
				/>
			)}
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box style={styles.header}>
					<Typography variant={'h5'} style={styles.headerText}>
						Recent Transactions
					</Typography>
					<Link style={styles.link} to={LINKS.Transactions}>
						view more
					</Link>
				</Box>
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
							<StyledTableCell>Full Name</StyledTableCell>
							<StyledTableCell>Reference</StyledTableCell>
							<StyledTableCell>Phone No.</StyledTableCell>
							<StyledTableCell>Amount</StyledTableCell>
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
							<Loader colSpan={4} />
						) : (
							data && (
								<>
									{data.payload.length > 0 ? (
										data.payload.map((row: Transaction, key: number) => (
											<StyledTableRow
												onClick={() => setSelectedTransaction(row)}
												key={key}
											>
												<StyledTableCell>
													{row.user.firstname} {row.user.lastname}
												</StyledTableCell>
												<StyledTableCell>{row.reference}</StyledTableCell>
												<StyledTableCell>{row.user.phone}</StyledTableCell>
												<StyledTableCell>
													{formatNumberToCurrency(
														typeof row.amount !== 'string'
															? row.amount.$numberDecimal
															: row.amount
													)}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={4} />
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
		border: `0.5px solid ${theme.palette.secondary.main}`,
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
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0px 16px',
	},
	headerText: {
		fontWeight: '600',
	},
	text: {
		color: theme.palette.primary.main,
	},
	link: {
		color: theme.palette.secondary.main,
	},
});

export default RecentTransactionsTable;
