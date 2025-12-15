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
	IPurchasedBill,
	Transaction,
	checkAmount,
	extractUserName,
	formatNumberToCurrency,
} from 'utilities';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from 'components/loader/table-loader';
import { useState } from 'react';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';
import Button from 'components/button';
import { green, red } from '@mui/material/colors';
import { useMutation } from 'react-query';
import { useHandleError } from 'hooks';
import { updateBillTransactions } from 'api/bill';
import { useAppSelector } from 'store/hooks';
import Loader from 'components/loader';

type Props = {
	data: IPurchasedBill[];
	isLoading?: boolean;
	reloadTransactions?: () => void;
};

const BettingTransactionsTable = ({
	data,
	isLoading,
	reloadTransactions,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const handleError = useHandleError();
	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	const isSupperAdmin = useAppSelector(
		(store) => store.authState.isSupperAdmin
	);

	const handleClickRow = (value: Transaction) => {
		setSelectedTransaction(value);
	};

	const { isLoading: isUpdatingTransaction, mutate: mutateUpdateTransaction } =
		useMutation(updateBillTransactions, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}

				if (data && data.success) {
					reloadTransactions?.();
					alert({
						message: 'Betting status updated successfully!!',
						type: 'success',
					});
				}
			},
		});

	const onUpdateTransaction = ({
		id,
		status,
	}: {
		id: string;
		status: string;
	}) => {
		if (!isSupperAdmin) {
			alert({
				message: 'You are not authorized to perform this action',
				type: 'error',
			});
			return;
		}
		mutateUpdateTransaction({
			id,
			data: {
				status,
			},
		});
	};

	return (
		<Container>
			{isUpdatingTransaction && <Loader />}
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
							<CustomTableCell style={styles.headTableCell} label={'Product'} />
							<CustomTableCell style={styles.headTableCell} label={'Amount'} />
							<CustomTableCell style={styles.headTableCell} label={'Date'} />
							<CustomTableCell style={styles.headTableCell} label={'Status'} />
							<CustomTableCell style={styles.headTableCell} label={'Action'} />
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
							<TableLoader colSpan={6} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((value) => (
											<StyledTableRow
												onClick={() => handleClickRow(value as any)}
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
													{value.name}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(checkAmount(value.amount))}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{moment(value.createdAt).format('l')}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.status}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.status === 'PENDING' && (
														<Box sx={{ display: 'flex', gap: '10px' }}>
															<Button
																onClick={(e) => {
																	e.stopPropagation();
																	onUpdateTransaction({
																		id: value.id,
																		status: 'SUCCESSFUL',
																	});
																}}
																sx={{
																	backgroundColor: `${green['600']} !important`,
																	color: 'white',
																}}
															>
																Approve
															</Button>
															<Button
																onClick={(e) => {
																	e.stopPropagation();
																	onUpdateTransaction({
																		id: value.id,
																		status: 'FAILED',
																	});
																}}
																sx={{
																	backgroundColor: `${red['600']} !important`,
																	color: 'white',
																}}
															>
																Decline
															</Button>
														</Box>
													)}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={6} text={'No available Betting'} />
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

export default BettingTransactionsTable;
