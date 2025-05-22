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
	Transaction,
	User,
	extractUserName,
	formatNumberToCurrency,
	checkAmount,
} from 'utilities';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from 'components/loader/table-loader';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { updateBillTransactions } from 'api/bill';
import { useHandleError } from 'hooks';
import useToastAlert from 'hooks/useToastAlert';
import Loader from 'components/loader';
import Button from 'components/button';
import { green, red } from '@mui/material/colors';
import { useAppSelector } from 'store/hooks';

type Props = {
	data: Transaction[];
	isLoading?: boolean;
	reloadTransactions?: () => void;
};

const CableTransactionsTable = ({
	data,
	isLoading,
	reloadTransactions,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const handleError = useHandleError();
	const alert = useToastAlert();
	const isSupperAdmin = useAppSelector(
		(store) => store.authState.isSupperAdmin
	);

	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	const handleClickRow = (value: Transaction) => {
		console.log(value);
		setSelectedTransaction(value);
	};

	const { mutate, isLoading: isUpdatingTransaction } = useMutation(
		updateBillTransactions,
		{
			onSettled: (data, error) => {
				if (error) {
					const errorResponse = handleError({ error });
					if (errorResponse?.message) {
						alert({ message: errorResponse.message, type: 'error' });
					}
				}

				if (data && data.success) {
					reloadTransactions?.();
					alert({
						message: 'Transaction updated successfully',
						type: 'success',
					});
				}
			},
		}
	);

	const handleUpdateTransaction = ({
		status,
		id,
	}: {
		status: string;
		id: string;
	}) => {
		if (!isSupperAdmin) {
			alert({
				message: 'You are not authorized to perform this action',
				type: 'error',
			});
			return;
		}

		mutate({
			id,
			data: { status },
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
							<CustomTableCell
								style={styles.headTableCell}
								label={'Card number'}
							/>
							<CustomTableCell style={styles.headTableCell} label={'User'} />
							<CustomTableCell
								style={styles.headTableCell}
								label={'Cable Provider'}
							/>
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
							<TableLoader colSpan={9} />
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
													{value.card_number}
												</StyledTableCell>
												<StyledTableCell
													sx={{
														whiteSpace: 'nowrap',
													}}
													style={styles.text}
												>
													{value.user &&
														Object.keys(value.user).length > 0 &&
														extractUserName(value?.user as User)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.name}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(checkAmount(value.amount))}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{moment(value.createdAt).format('ll')}
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
																	handleUpdateTransaction({
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
																	handleUpdateTransaction({
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
										<Empty colSpan={9} text={'No Cable Information'} />
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

export default CableTransactionsTable;
