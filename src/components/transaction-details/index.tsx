import React, { useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import moment from 'moment';
import {
	Transaction,
	formatNumberToCurrency,
	cleanString,
	extractExactTransactionService,
	extractTransactionType,
	checkAmount,
} from 'utilities';
import TransactionItem from './transaction-item';
import { useSearchCoupon } from 'hooks';

interface Props {
	transaction: Transaction | null;
}

const TransactionDetails: React.FC<Props> = ({ transaction }) => {
	const { searchCoupon } = useSearchCoupon();

	useEffect(() => {
		if (
			transaction &&
			transaction.transaction &&
			transaction.transaction.discount_code
		) {
			const code = transaction.transaction.discount_code;
			searchCoupon(code.toString());
		}
		// () => clearSearch();
	}, [transaction, searchCoupon]);

	if (transaction) {
		const service = extractExactTransactionService(transaction as Transaction);
		const type = extractTransactionType(transaction as Transaction);
		return (
			<Box>
				<Container>
					{service && <TransactionItem label={'Service'} value={service} />}
					{type && (
						<TransactionItem label={'Type'} value={type.replace(/_/g, ' ')} />
					)}
					{transaction.card_number && (
						<TransactionItem
							label={'Card Number'}
							value={transaction.card_number}
						/>
					)}

					{transaction.dataType && typeof transaction.dataType === 'object' && (
						<TransactionItem
							label={'Data Type'}
							value={transaction.dataType.name as string}
						/>
					)}
					{transaction.plan && typeof transaction.plan === 'object' && (
						<TransactionItem
							label={'Data Plan'}
							value={transaction.plan.name as string}
						/>
					)}
					{transaction.plan &&
						typeof transaction.plan === 'object' &&
						transaction.plan.network &&
						typeof transaction.plan.network === 'object' && (
							<TransactionItem
								label={'Network'}
								value={transaction.plan.network.name as string}
							/>
						)}
					{transaction.reference && (
						<TransactionItem
							label={'Reference'}
							value={transaction.reference}
						/>
					)}
					{transaction.data_unit && (
						<TransactionItem
							label={'Data Unit'}
							value={transaction.data_unit.$numberDecimal}
						/>
					)}
					{transaction.electricity_token && (
						<Box>
							<Typography
								sx={{ fontWeight: 'bold', marginBottom: '8px' }}
								variant={'body1'}
							>
								Electricity Token:
							</Typography>

							<Typography>
								{`Electricity unit of ${transaction.electricity_token.unit}`}
							</Typography>
						</Box>
					)}
					{transaction.withdrawalChannel && (
						<TransactionItem
							label={'Channel'}
							value={transaction.withdrawalChannel}
						/>
					)}
					{transaction.accountNumber && (
						<TransactionItem
							label={'Account Number'}
							value={transaction.accountNumber}
						/>
					)}
					{transaction.paymentGateway && (
						<TransactionItem
							label={'Payment Gateway'}
							value={transaction.paymentGateway}
						/>
					)}

					{transaction.pin_data && transaction.pin_data.service_type && (
						<TransactionItem
							label={'Service Provider'}
							value={cleanString(transaction.pin_data.service_type as string)}
						/>
					)}
					{transaction.pin && (
						<TransactionItem label={'Pin'} value={transaction.pin} />
					)}
					{transaction.amount && (
						<TransactionItem
							label={'Amount'}
							value={formatNumberToCurrency(
								typeof transaction.amount === 'object'
									? transaction.amount.$numberDecimal
									: transaction.amount
							)}
						/>
					)}

					{transaction.return_amount && (
						<TransactionItem
							label={'Return Amount'}
							value={formatNumberToCurrency(
								checkAmount(transaction.return_amount)
							)}
						/>
					)}

					{transaction.number && (
						<TransactionItem label={'Phone'} value={transaction.number} />
					)}
					{transaction.phone_number && (
						<TransactionItem label={'Phone'} value={transaction.phone_number} />
					)}
					{transaction.sentTo && typeof transaction.sentTo === 'string' && (
						<TransactionItem label={'Sent To'} value={transaction.sentTo} />
					)}
					{transaction.createdAt && (
						<TransactionItem
							label={'Date'}
							value={moment.utc(transaction.createdAt).format('l')}
						/>
					)}
					{transaction.createdAt && (
						<TransactionItem
							label={'Time'}
							value={moment.utc(transaction.createdAt).format('LT')}
						/>
					)}
					{transaction.status && (
						<TransactionItem label={'Status'} value={transaction.status} />
					)}
				</Container>
			</Box>
		);
	}
	return (
		<Box>
			<Typography variant={'body1'}>No Related Transaction</Typography>;
		</Box>
	);
};

const Container = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: '1fr',
	gap: theme.spacing(3),
	[theme.breakpoints.up('md')]: {
		gridTemplateColumns: 'repeat(2, 1fr)',
	},
}));

export default TransactionDetails;
