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

interface Props {
	data: Transaction[] | null;
	isLoading?: boolean;
}

const RTransactionTable = ({ data, isLoading }: Props) => {
	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	const handleRowClick = (transaction: Transaction) => {
		setSelectedTransaction(transaction);
	};

	return (
		<>
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
					'Phone Number',
					'Amount',
					'Created At',
					'Status',
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
