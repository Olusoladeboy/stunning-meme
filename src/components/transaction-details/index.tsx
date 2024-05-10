import React, { useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import {
	Transaction,
	formatNumberToCurrency,
	cleanString,
	extractExactTransactionService,
	extractTransactionType,
	checkAmount,
	SERVICES,
	extractUserName,
	User,
	LINKS,
	SECOUNDARY_COLOR,
	TRANSACTION_SERVICE,
	Amount,
} from 'utilities';
import TransactionItem from './transaction-item';
import { useSearchCoupon } from 'hooks';
import Button from 'components/button';
import { grey } from '@mui/material/colors';

interface Props {
	transaction: Transaction | null;
	transactionType?: string;
}

const TransactionDetails: React.FC<Props> = ({
	transaction,
	transactionType,
}) => {
	const { searchCoupon } = useSearchCoupon();
	const navigate = useNavigate();

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

		const isWalletTransfer = SERVICES.WALLET_TRANSFER === transaction.service;

		const viewUser = (id: string) => {
			navigate(`${LINKS.Users}/${id}`);
		};

		const isAutoConvert =
			TRANSACTION_SERVICE.AUTO_AIRTIME_CONVERSION === transactionType;

		const autoAirtimeConvert = isAutoConvert && (
			<>
				<Box
					sx={{
						marginTop: '16px',
						display: 'grid',
						gap: '10px',
						gridTemplateColumns: 'repeat(2, 1fr)',
					}}
				>
					<TransactionItem
						label={'Total Amount'}
						value={formatNumberToCurrency(
							typeof transaction?.totalAmount === 'object'
								? transaction.totalAmount.$numberDecimal
								: ''
						)}
					/>
					<TransactionItem
						label={'Total Return Amount'}
						value={formatNumberToCurrency(
							typeof transaction?.totalReturnAmount === 'object'
								? transaction.totalReturnAmount.$numberDecimal
								: ''
						)}
					/>
				</Box>
				{transaction?.transactions && (
					<Box>
						<Typography
							sx={{
								fontWeight: 'bold',
								marginTop: '16px !important',
								marginBottom: '8px !important',
							}}
						>
							Transaction Breakdown
						</Typography>
						<Box
							sx={{
								display: 'grid',
								gap: '8px',
							}}
						>
							{Array.isArray(transaction?.transactions) &&
								transaction?.transactions.map((value) => (
									<Box
										sx={{
											border: `1px solid ${grey['300']}`,
											padding: '8px 15px',
											borderRadius: '8px',
											display: 'grid',
											gap: '8px',
										}}
										key={value.id}
									>
										<Typography>Status: {value.status}</Typography>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
											}}
										>
											<Typography>
												Amount:{' '}
												{formatNumberToCurrency(
													checkAmount(value?.amount as string | Amount)
												)}
											</Typography>
											<Typography>
												Return Amount:{' '}
												{formatNumberToCurrency(
													checkAmount(value?.returnAmount as string | Amount)
												)}
											</Typography>
										</Box>
										<Typography
											sx={{
												span: {
													fontSize: '12px',
												},
											}}
										>
											Network Response: <br />
											<span>{value.networkResponse}</span>
										</Typography>
									</Box>
								))}
						</Box>
					</Box>
				)}
			</>
		);

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

					{transaction.network && typeof transaction.network === 'object' && (
						<TransactionItem
							label={'Network'}
							value={transaction.network.name as string}
						/>
					)}
					{transaction.reference && (
						<TransactionItem
							label={'Reference'}
							value={transaction.reference}
						/>
					)}

					{isWalletTransfer && (
						<>
							<TransactionItem
								label={'User from'}
								value={extractUserName(transaction.userFrom as User)}
								rightAside={
									<Button
										sx={{
											color: SECOUNDARY_COLOR,
										}}
										onClick={() =>
											viewUser((transaction?.userFrom as User)?.id as string)
										}
									>
										View user
									</Button>
								}
							/>
							<TransactionItem
								label={'User To'}
								value={extractUserName(transaction.userTo as User)}
								rightAside={
									<Button
										sx={{
											color: SECOUNDARY_COLOR,
										}}
										onClick={() =>
											viewUser((transaction?.userTo as User)?.id as string)
										}
									>
										View user
									</Button>
								}
							/>
						</>
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
					{transaction.summary && (
						<TransactionItem label={'Reason'} value={transaction.summary} />
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

				{autoAirtimeConvert}
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
