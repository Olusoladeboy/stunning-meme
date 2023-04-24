import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import moment from 'moment';
import { Transaction, formatNumberToCurrency } from '../../utilities';
import DisputeTransactionItem from './dispute-transaction-item';

interface Props {
	transaction: Transaction | null;
}

const DisputeTransactionDetails: React.FC<Props> = ({ transaction }) => {
	if (transaction) {
		return (
			<Container>
				{transaction.type && (
					<DisputeTransactionItem label={'Type'} value={transaction.type} />
				)}
				{transaction.reference && (
					<DisputeTransactionItem
						label={'Reference'}
						value={transaction.reference}
					/>
				)}
				{transaction.status && (
					<DisputeTransactionItem label={'Status'} value={transaction.status} />
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
						label={'Status'}
						value={moment.utc(transaction.createdAt).format('l')}
					/>
				)}
			</Container>
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
	gap: theme.spacing(2),
	[theme.breakpoints.up('md')]: {
		gridTemplateColumns: 'repeat(2, 1fr)',
	},
}));

export default DisputeTransactionDetails;
