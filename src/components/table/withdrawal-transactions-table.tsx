import { useState } from 'react';
import {
	TableBody,
	TableHead,
	Table,
	useTheme,
	Box,
	styled,
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { updateWalletWithdrawal } from 'api';
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
import Button from 'components/button';
import { green, red } from '@mui/material/colors';
import Loader from 'components/loader';
import { useAlert, useHandleError } from 'hooks';

type Props = {
	data: IWithdrawal[];
	isLoading?: boolean;
	hasActionButton?: boolean;
};

const WithdrawalTransactionsTable = ({
	data,
	isLoading,
	hasActionButton,
}: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const queryClient = useQueryClient();
	const alert = useAlert();
	const styles = useStyles(theme);
	const [selectedTransaction, setSelectedTransaction] =
		useState<null | IWithdrawal>(null);

	const handleClickRow = (value: IWithdrawal) => {
		setSelectedTransaction(value);
	};

	const { isLoading: isUpdating, mutate } = useMutation(
		updateWalletWithdrawal,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response && response?.message) {
						alert({
							message: response.message,
							type: 'error',
						});
					}
				}
				if (data && data.success) {
					queryClient.invalidateQueries(['Withdrawal']);
					alert({
						message: 'Transaction updated successfully',
						type: 'success',
					});
				}
			},
		}
	);

	const handleMutate = ({ id, status }: { id: string; status: string }) => {
		mutate({
			id,
			data: {
				status,
			},
		});
	};

	return (
		<Container>
			{isUpdating && <Loader />}
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
							{hasActionButton && (
								<CustomTableCell
									style={styles.headTableCell}
									label={'Action'}
								/>
							)}
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
							<TableLoader colSpan={hasActionButton ? 9 : 8} />
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
													{formatNumberToCurrency(
														(value.amount as any)?.$numberDecimal ||
															value.amount
													)}
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
												{hasActionButton && (
													<StyledTableCell style={styles.text}>
														<Button
															onClick={(e) => {
																e.stopPropagation();
																handleMutate({
																	id: value.id,
																	status: 'APPROVE',
																});
															}}
															sx={{
																backgroundColor: green['600'] + '!important',
																marginRight: '6px',
																color: 'white',
															}}
															size='small'
														>
															Approve
														</Button>
														<Button
															onClick={(e) => {
																e.stopPropagation();
																handleMutate({
																	id: value.id,
																	status: 'DECLINE',
																});
															}}
															sx={{
																backgroundColor: red['600'] + '!important',
																color: 'white',
															}}
															size='small'
														>
															Decline
														</Button>
													</StyledTableCell>
												)}
											</StyledTableRow>
										))
									) : (
										<Empty
											colSpan={hasActionButton ? 9 : 8}
											text={'No available Withdrawal'}
										/>
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
