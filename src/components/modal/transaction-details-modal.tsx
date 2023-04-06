import React from 'react';
import { Typography, styled, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import ModalWrapper from './Wrapper';
import { grey } from '@mui/material/colors';
import {
	IModal,
	Transaction,
	formatNumberToCurrency,
	LINKS,
	getCoupon,
} from '../../utilities';
import Button from '../button';

interface Props extends IModal {
	transaction: Transaction;
}

const TransactionDetailsModal: React.FC<Props> = ({
	closeModal,
	transaction,
}) => {
	const navigate = useNavigate();

	let $coupon = '';
	const discount_code =
		transaction.transaction && transaction.transaction.discount_code;
	if (discount_code && typeof discount_code !== 'string') {
		$coupon = getCoupon(discount_code);
	}

	return (
		<ModalWrapper
			sx={{ maxWidth: '760px' }}
			closeModal={closeModal}
			hasCloseButton
		>
			<Typography sx={{ marginBottom: '2rem' }} variant={'h4'}>
				Transaction Details
			</Typography>
			<Grid>
				<GridItem>
					<BoldText variant={'body1'}>Type</BoldText>
					<Typography variant={'body1'}>
						{transaction.transaction
							? transaction.transaction.service
							: transaction?.service}
					</Typography>
				</GridItem>
				<GridItem>
					<BoldText variant={'body1'}>Reference</BoldText>
					<Typography variant={'body1'}>{transaction.reference}</Typography>
				</GridItem>
				{/* {transaction.dataType && (
					<GridItem>
						<BoldText variant={'body1'}>Data Type</BoldText>
						<Typography variant={'body1'}>
							{transaction?.dataType.name}
						</Typography>
					</GridItem>
				)} */}
				{/* {transaction.plan && (
					<GridItem>
						<BoldText variant={'body1'}>Data Plan</BoldText>
						<Typography variant={'body1'}>{transaction?.plan.name}</Typography>
					</GridItem>
				)} */}
				<GridItem>
					<BoldText variant={'body1'}>Time</BoldText>
					<Typography variant={'body1'}>
						{moment.utc(transaction?.createdAt).format('LT')}
					</Typography>
				</GridItem>
				<GridItem>
					<BoldText variant={'body1'}>Phone</BoldText>
					<Typography variant={'body1'}>
						{transaction?.number || transaction?.user.phone}
					</Typography>
				</GridItem>
				<GridItem>
					<BoldText variant={'body1'}>Amount</BoldText>
					<Typography variant={'body1'}>
						{formatNumberToCurrency(
							typeof transaction.amount !== 'string'
								? transaction.amount.$numberDecimal
								: transaction.amount
						)}
					</Typography>
				</GridItem>
				{$coupon && (
					<GridItem>
						<BoldText variant={'body1'}>Coupon</BoldText>
						<Typography variant={'body1'}>{$coupon}</Typography>
					</GridItem>
				)}
				<GridItem>
					<BoldText variant={'body1'}>Email</BoldText>
					<Typography variant={'body1'}>{transaction?.user.email}</Typography>
				</GridItem>
				<GridItem>
					<BoldText variant={'body1'}>Date</BoldText>
					<Typography variant={'body1'}>
						{moment.utc(transaction?.createdAt).format('l')}
					</Typography>
				</GridItem>
				<GridItem>
					<BoldText variant={'body1'}>Status</BoldText>
					<Typography variant={'body1'}>{transaction.status}</Typography>
				</GridItem>
			</Grid>
			<ButtonWrapper>
				<ButtonOutlined
					onClick={() => navigate(`${LINKS.User}/${transaction.user.id}`)}
				>
					View user profile
				</ButtonOutlined>
				<DoneButton onClick={closeModal}>Done</DoneButton>
			</ButtonWrapper>
		</ModalWrapper>
	);
};

const Grid = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: '1fr',
	gap: '20px',
	[theme.breakpoints.up('md')]: {
		gridTemplateColumns: 'repeat(2, 1fr)',
	},
}));

const BoldText = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
}));

const GridItem = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: '3fr 7fr',
}));

const ButtonWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '15px',
	marginTop: '3rem',
	justifyContent: 'flex-end',
}));

const ButtonOutlined = styled(Button)(({ theme }) => ({
	border: `1px solid ${grey['800']}`,
	textTransform: 'uppercase',
	backgroundColor: 'unset !important',
	color: grey['800'],
	paddingLeft: '20px',
	paddingRight: '20px',
}));

const DoneButton = styled(Button)(({ theme }) => ({
	border: `1px solid ${grey['800']}`,
	textTransform: 'uppercase',
	backgroundColor: `${theme.palette.primary.main} !important`,
	color: grey['50'],
	paddingLeft: '20px',
	paddingRight: '20px',
}));

export default TransactionDetailsModal;
