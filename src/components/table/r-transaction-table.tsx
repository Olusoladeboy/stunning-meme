import React, { useState } from 'react';
import moment from 'moment';
import {
	Transaction,
	checkAmount,
	extractUserName,
	formatNumberToCurrency,
} from 'utilities';
import AppTable from './components/table';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';
import {
	updateInternationalAirtimeTransactions,
	updateInternationalDataSubscriptions,
} from 'api';
import { useHandleError } from 'hooks';
import { useMutation } from 'react-query';
import Loader from 'components/loader';
import { Box } from '@mui/material';
import Button from 'components/button';
import { green, red } from '@mui/material/colors';
import { SERVICES } from 'utilities';
import useToastAlert from 'hooks/useToastAlert';
import { useAppSelector } from 'store/hooks';

interface Props {
	data: Transaction[] | null;
	isLoading?: boolean;
	reloadTransactions?: () => void;
	transactionType?: string;
}

const RTransactionTable = ({
	data,
	isLoading,
	reloadTransactions,
	transactionType,
}: Props) => {
	const handleError = useHandleError();
	const alert = useToastAlert();
	const isSupperAdmin = useAppSelector(
		(store) => store.authState.isSupperAdmin
	);
	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	const handleRowClick = (transaction: Transaction) => {
		setSelectedTransaction(transaction);
	};

	const mutationFn =
		transactionType === SERVICES.INTERNATIONAL_AIRTIME_TOP_UP
			? updateInternationalAirtimeTransactions
			: transactionType === SERVICES.INTERNATIONAL_DATA_SUBSCRIPTION
			? updateInternationalDataSubscriptions
			: undefined;

	const { isLoading: isUpdatingTransaction, mutate: mutateUpdateTransaction } =
		useMutation(mutationFn as any, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}

				if (data && (data as any).success) {
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
		if (!isSupperAdmin) {
			alert({
				message: 'You are not authorized to perform this action',
				type: 'error',
			});
			return;
		}
		(mutateUpdateTransaction as Function)({
			id,
			data: {
				status,
			},
		});
	};

	return (
		<>
			{/* <TransactionDetails ref={transactionDetailsRef} /> */}
			{isUpdatingTransaction && <Loader />}
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
				numberOfColumns={9}
				isLoading={isLoading}
				header={[
					'Reference',
					'User',
					'Operator',
					'Product',
					'Phone Number',
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
								value?.phone_number,
								formatNumberToCurrency(checkAmount(`${value?.amount}`)),
								moment(value.createdAt).format('ll'),
								value.status,
								value.status === 'PENDING' && (
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
								),
								value.status === 'PENDING' && (
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

export default RTransactionTable;
