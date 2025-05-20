import React, { useState } from 'react';
import {
	TableBody,
	TableHead,
	Table,
	useTheme,
	Box,
	styled,
} from '@mui/material';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { StyledTableCell, StyledTableRow } from './components';
import {
	Transaction,
	formatNumberToCurrency,
	QueryKeys,
	extractUserName,
	User,
	checkAmount,
} from 'utilities';
import TableLoader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import SearchInput from '../form-components/search-input';
import CustomTableCell from './components/custom-table-cell';
import { updateAirtime, updateConvertAirtimeStatus } from 'api';
import Loader from '../loader';
import { useAlert, useHandleError } from 'hooks';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';
import Button from 'components/button';
import { green, red } from '@mui/material/colors';

type Props = {
	transactions: Transaction[] | null;
	isLoading?: boolean;
	handleSort?: (filter: string) => void;
	handleSearch?: (search: string) => void;
	clearSearch?: () => void;
	isDisplaySearchField?: boolean;
	reloadTransactions?: () => void;
};

const AirtimePurchaseTable = ({
	transactions,
	isLoading,
	handleSort,
	handleSearch,
	clearSearch,
	isDisplaySearchField = false,
	reloadTransactions,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const handleError = useHandleError();
	const alert = useAlert();
	const queryClient = useQueryClient();

	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	/* 
		Mutation
	*/
	const { isLoading: isUpdatingStatus } = useMutation(
		updateConvertAirtimeStatus,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}

				if (data && data.success) {
					queryClient.invalidateQueries([QueryKeys.ConvertAirtime]);
					queryClient.invalidateQueries([QueryKeys.RecentConvertAirtime]);
					alert({
						message: 'Airtime convert status updated successfully!!',
						type: 'success',
					});
				}
			},
		}
	);

	const { isLoading: isUpdatingTransaction, mutate: mutateUpdateTransaction } =
		useMutation(updateAirtime, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}

				if (data && data.success) {
					reloadTransactions?.();
					alert({
						message: 'Airtime status updated successfully!!',
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
		mutateUpdateTransaction({
			id,
			data: {
				status,
			},
		});
	};

	const handleClickRow = (value: Transaction) => {
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
			{(isUpdatingStatus || isUpdatingTransaction) && <Loader />}
			{isDisplaySearchField && (
				<SearchContainer>
					<SearchInput
						sx={{ maxWidth: '400px', width: '100%' }}
						placeholder='Search conversion with phone or reference ID...'
						handleSearch={handleSearch}
						clearSearch={clearSearch}
						fullWidth
					/>
				</SearchContainer>
			)}
			<Box sx={{ overflow: 'auto' }}>
				<Table sx={{ overflow: 'auto' }}>
					<TableHead
						sx={{
							'& tr': {
								// backgroundColor: LIGHT_GRAY,
								color: theme.palette.primary.main,
							},
						}}
					>
						<StyledTableRow>
							<CustomTableCell label={'Reference'} isSortable />
							<CustomTableCell label={'User'} isSortable />
							<CustomTableCell style={styles.headTableCell} label={'Network'} />
							<CustomTableCell style={styles.headTableCell} label={'Number'} />
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
							<TableLoader colSpan={8} />
						) : (
							transactions && (
								<>
									{transactions.length > 0 ? (
										transactions.map((transaction, key: number) => {
											return (
												<StyledTableRow
													onClick={() => handleClickRow(transaction)}
													key={transaction.id}
												>
													<StyledTableCell style={styles.text}>
														{transaction.reference}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{extractUserName(transaction?.user as User)}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{typeof transaction.network === 'object' &&
															transaction.network.name}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{transaction.phone_number}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{formatNumberToCurrency(
															checkAmount(transaction.amount)
														)}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{moment(transaction.createdAt).format('ll')}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{transaction.status}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{transaction.status === 'PENDING' && (
															<Box sx={{ display: 'flex', gap: '10px' }}>
																<Button
																	onClick={(e) => {
																		e.stopPropagation();
																		onUpdateTransaction({
																			id: transaction.id,
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
																			id: transaction.id,
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
											);
										})
									) : (
										<Empty colSpan={8} text={'No Airtime transaction'} />
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
	// overflow: 'auto',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	padding: '0px 15px',
	marginBottom: '2rem',
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

export default AirtimePurchaseTable;
