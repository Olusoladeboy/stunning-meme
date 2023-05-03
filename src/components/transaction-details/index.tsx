import React, { useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import moment from 'moment';
import {
	Transaction,
	formatNumberToCurrency,
	cleanString,
} from '../../utilities';
import DisputeTransactionItem from './transaction-item';
import { useSearchCoupon } from '../../hooks';

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
		return (
			<Box>
				<Container>
					{transaction.transaction && transaction.transaction.service ? (
						<DisputeTransactionItem
							label={'Service'}
							value={transaction.transaction.service}
						/>
					) : (
						transaction.service && (
							<DisputeTransactionItem
								label={'Service'}
								value={transaction.service}
							/>
						)
					)}
					{transaction.transaction && transaction.transaction.type ? (
						<DisputeTransactionItem
							label={'Type'}
							value={transaction.transaction.type}
						/>
					) : (
						transaction.type && (
							<DisputeTransactionItem label={'Type'} value={transaction.type} />
						)
					)}
					{transaction.reference && (
						<DisputeTransactionItem
							label={'Reference'}
							value={transaction.reference}
						/>
					)}
					{transaction.withdrawalChannel && (
						<DisputeTransactionItem
							label={'Channel'}
							value={transaction.withdrawalChannel}
						/>
					)}
					{transaction.accountNumber && (
						<DisputeTransactionItem
							label={'Account Number'}
							value={transaction.accountNumber}
						/>
					)}
					{transaction.paymentGateway && (
						<DisputeTransactionItem
							label={'Payment Gateway'}
							value={transaction.paymentGateway}
						/>
					)}

					{transaction.pin_data && transaction.pin_data.service_type && (
						<DisputeTransactionItem
							label={'Service Provider'}
							value={cleanString(transaction.pin_data.service_type as string)}
						/>
					)}
					{transaction.pin && (
						<DisputeTransactionItem label={'Pin'} value={transaction.pin} />
					)}
					{transaction.amount && (
						<DisputeTransactionItem
							label={'Amount'}
							value={formatNumberToCurrency(
								typeof transaction.amount === 'object'
									? transaction.amount.$numberDecimal
									: transaction.amount
							)}
						/>
					)}
					{transaction.createdAt && (
						<DisputeTransactionItem
							label={'Date'}
							value={moment.utc(transaction.createdAt).format('l')}
						/>
					)}
					{transaction.createdAt && (
						<DisputeTransactionItem
							label={'Time'}
							value={moment.utc(transaction.createdAt).format('LT')}
						/>
					)}
					{transaction.number && (
						<DisputeTransactionItem
							label={'Phone'}
							value={transaction.number}
						/>
					)}
					{transaction.status && (
						<DisputeTransactionItem
							label={'Status'}
							value={transaction.status}
						/>
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
