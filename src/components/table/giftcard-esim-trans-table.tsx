import React, { useState } from 'react';
import moment from 'moment';
import {
	Transaction,
	checkAmount,
	extractUserName,
	formatNumberToCurrency,
	SERVICES,
} from 'utilities';
import AppTable from './components/table';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';
import { useMutation } from 'react-query';
import { useHandleError } from 'hooks';
import { updateESimTransactions, updateGiftCardTransactions } from 'api';
import Loader from 'components/loader';
import Button from 'components/button';
import { Box } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useAppSelector } from 'store/hooks';
import useToastAlert from 'hooks/useToastAlert';

interface Props {
	data: Transaction[] | null;
	isLoading?: boolean;
	reloadTransactions?: () => void;
	transactionType?: string;
}

const GiftcardESimTransactionTable = ({
	data,
	isLoading,
	reloadTransactions,
	transactionType,
}: Props) => {
	const isSupperAdmin = useAppSelector(
		(store) => store.authState.isSupperAdmin
	);
	const handleError = useHandleError();
	const alert = useToastAlert();
	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	const handleRowClick = (transaction: Transaction) => {
		setSelectedTransaction(transaction);
	};

	const mutationFn =
		transactionType === SERVICES.GIFT_CARD
			? updateGiftCardTransactions
			: transactionType === SERVICES.ESIM
			? updateESimTransactions
			: undefined;

	const { mutate, isLoading: isUpdatingTransaction } = useMutation(
		mutationFn as any,
		{
			onSettled: (data, error) => {
				if (error) {
					const errorResponse = handleError({ error });
					if (errorResponse?.message) {
						alert({ message: errorResponse.message, type: 'error' });
					}
				}

				if (data && (data as any).success) {
					reloadTransactions?.();
					alert({
						message: 'Transaction updated successfully',
						type: 'success',
					});
				}
			},
		}
	);

	const handleUpdateTransaction = ({}: { id: string; status: string }) => {
		if (!isSupperAdmin) {
			alert({
				message: 'You are not authorized to perform this action',
				type: 'error',
			});
			return;
		}
		(mutate as Function)({
			data: {
				status: 'completed',
			},
			id: selectedTransaction?.id,
		});
	};

	return (
		<>
			{isUpdatingTransaction && <Loader />}
			{/* <TransactionDetails ref={transactionDetailsRef} /> */}
			{selectedTransaction && (
				<TransactionDetailsModal
					closeModal={() => setSelectedTransaction(null)}
					transaction={selectedTransaction as any}
					isDisplayButtons
				/>
			)}
			<AppTable
				canClickRow
				onRowClick={handleRowClick}
				numberOfColumns={6}
				isLoading={isLoading}
				header={[
					'Reference',
					'User',
					'Operator',
					'Product',
					'Amount',
					'Created At',
					'Status',
					'Action',
				]}
				body={
					data &&
					data.map((value) => {
						return {
							data: [
								value.reference,
								extractUserName(value.user),
								value?.operator,
								value?.product,
								formatNumberToCurrency(checkAmount(`${value?.amount}`)),
								moment(value.createdAt).format('ll'),
								value.status,
								value.status.toLocaleLowerCase() === 'pending' && (
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
								),
							],
							rawData: value,
						};
					})
				}
				emptyText={'No transaction'}
			/>
		</>
	);
};

export default GiftcardESimTransactionTable;
