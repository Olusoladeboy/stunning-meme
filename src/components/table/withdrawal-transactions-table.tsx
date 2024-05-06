import { useState } from 'react';
import {
	TableBody,
	TableHead,
	Table,
	useTheme,
	Box,
	styled,
} from '@mui/material';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from './components';
import {
	IWithdrawal,
	extractUserName,
	formatNumberToCurrency,
} from 'utilities';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from 'components/loader/table-loader';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';

type Props = {
	data: IWithdrawal[];
	isLoading?: boolean;
};

const WithdrawalTransactionsTable = ({ data, isLoading }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [selectedTransaction, setSelectedTransaction] =
		useState<null | IWithdrawal>(null);

	const handleClickRow = (value: IWithdrawal) => {
		console.log(value);
		setSelectedTransaction(value);
	};

	return (
		<Container>
			{selectedTransaction && (
				<TransactionDetailsModal
					closeModal={() => setSelectedTransaction(null)}
					transaction={selectedTransaction as any}
					isDisplayButtons
				/>
			)}
			<Box sx={{ overflow: 'auto' }}>
				<Table sx={{ overflow: 'auto' }}>
					<TableHead
						sx={{
							'& tr': {
								color: theme.palette.primary.main,
							},
						}}
					>
						<StyledTableRow>
							<CustomTableCell
								style={styles.headTableCell}
								label={'Reference ID'}
							/>
							<CustomTableCell style={styles.headTableCell} label={'User'} />
							<CustomTableCell
								style={styles.headTableCell}
								label={'Withdrawal Channel'}
							/>
							<CustomTableCell
								style={styles.headTableCell}
								label={'Account Number'}
							/>
							<CustomTableCell style={styles.headTableCell} label={'Amount'} />
							<CustomTableCell style={styles.headTableCell} label={'Type'} />
							<CustomTableCell style={styles.headTableCell} label={'Date'} />
							<CustomTableCell style={styles.headTableCell} label={'Status'} />
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
							<TableLoader colSpan={8} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((value) => (
											<StyledTableRow
												onClick={() => handleClickRow(value)}
												key={value.reference}
											>
												<StyledTableCell style={styles.text}>
													{value.reference}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.user &&
														typeof value.user === 'object' &&
														Object.keys(value.user).length > 0 &&
														extractUserName(value.user)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.withdrawalChannel}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.accountNumber}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(value.amount)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.type}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{moment(value.createdAt).format('l')}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.status}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={8} text={'No available Withdrawal'} />
									)}
								</>
							)
						)}
					</TableBody>
				</Table>
			</Box>
		</Container>
	);
};

const Container = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
}));

const useStyles = (theme: any) => ({
	headTableCell: {
		cursor: 'pointer',
	},
	headerText: {
		fontWeight: '600',
	},
	searchInput: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '0px 15px',
		marginBottom: '2rem',
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.primary.main,
	},
	link: {
		color: theme.palette.secondary.main,
	},
});

export default WithdrawalTransactionsTable;
