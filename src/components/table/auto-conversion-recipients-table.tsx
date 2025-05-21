import React, { useState } from 'react';
import { Switch } from '@mui/material';
import {
	IRecipient,
	QueryKeys,
	SECOUNDARY_COLOR,
	Transaction,
	checkAmount,
	formatNumberToCurrency,
} from 'utilities';
import AppTable from './components/table';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';
import { updateRecipient } from 'api';
import { useHandleError } from 'hooks';
import { useMutation, useQueryClient } from 'react-query';
import Loader from 'components/loader';
import Button from 'components/button';
import useToastAlert from 'hooks/useToastAlert';
import { Edit } from '@mui/icons-material';
import ModalWrapper from 'components/modal/Wrapper';
import RecipientForm from 'components/forms/recipient-form';

interface Props {
	data?: IRecipient[] | null;
	isLoading?: boolean;
}

const AutoConversionRecipientsTable = ({ data, isLoading }: Props) => {
	const [recipient, setRecipient] = useState<null | IRecipient>(null);
	const handleError = useHandleError();
	const queryClient = useQueryClient();
	const alert = useToastAlert();

	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	const { isLoading: isUpdatingRecipient, mutate: mutateUpdateRecipient } =
		useMutation(updateRecipient, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}

				if (data && (data as any).success) {
					queryClient.invalidateQueries(QueryKeys.AutoConversionRecipients);
					alert({
						message: 'Recipient updated successfully!!',
						type: 'success',
					});
				}
			},
		});

	const onUpdateTransaction = (recipient: IRecipient) => {
		mutateUpdateRecipient({
			id: recipient.id,
			data: {
				isActive: !recipient.isActive,
			},
		});
	};

	return (
		<>
			{/* <TransactionDetails ref={transactionDetailsRef} /> */}
			{isUpdatingRecipient && <Loader />}
			{selectedTransaction && (
				<TransactionDetailsModal
					closeModal={() => setSelectedTransaction(null)}
					transaction={selectedTransaction as any}
					isDisplayButtons
				/>
			)}
			{recipient && (
				<ModalWrapper
					closeModal={() => setRecipient(null)}
					title={'EDIT RECIPIENT'}
				>
					<RecipientForm
						callback={() => setRecipient(null)}
						dataPayload={recipient}
					/>
				</ModalWrapper>
			)}
			<AppTable
				// canClickRow
				// onRowClick={handleRowClick}
				numberOfColumns={9}
				isLoading={isLoading}
				header={[
					'ID',
					'Phone Number',
					'Alias',
					'Switch',
					'Target Balance',
					'Action',
				]}
				body={
					data
						? data.map((value) => {
								return {
									data: [
										value.id,
										value.phoneNumber,
										value?.alias,
										<Switch
											checked={value.isActive}
											onChange={() => onUpdateTransaction(value)}
										/>,
										formatNumberToCurrency(
											checkAmount(`${value?.targetBalance}`)
										),
										<Button
											onClick={() => setRecipient(value)}
											sx={{
												backgroundColor: `${SECOUNDARY_COLOR} !important`,
												color: 'white',
												display: 'flex',
												gap: '4px',
												minWidth: '100px',
											}}
										>
											<Edit sx={{ fontSize: '16px' }} fontSize='small' />
											Edit
										</Button>,
									],
									rawData: value as unknown as Transaction,
								};
						  })
						: null
				}
				emptyText={'No transaction'}
			/>
		</>
	);
};

export default AutoConversionRecipientsTable;
