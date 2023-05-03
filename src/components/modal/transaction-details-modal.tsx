import React from 'react';
import { Typography, styled, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModalWrapper from './Wrapper';
import { grey } from '@mui/material/colors';
import { IModal, Transaction, LINKS } from '../../utilities';
import Button from '../button';
import TransactionDetails from '../transaction-details';

interface Props extends IModal {
	transaction: Transaction;
	isDisplayButtons?: boolean;
}

const TransactionDetailsModal: React.FC<Props> = ({
	closeModal,
	transaction,
	isDisplayButtons = false,
}) => {
	const navigate = useNavigate();

	return (
		<ModalWrapper
			sx={{ maxWidth: '760px' }}
			closeModal={closeModal}
			hasCloseButton
		>
			<Typography sx={{ marginBottom: '2rem' }} variant={'h4'}>
				Transaction Details
			</Typography>
			<TransactionDetails transaction={transaction} />

			{isDisplayButtons && (
				<ButtonWrapper>
					<ButtonOutlined
						onClick={() => navigate(`${LINKS.Users}/${transaction.user.id}`)}
					>
						View user profile
					</ButtonOutlined>
					<DoneButton onClick={closeModal}>Done</DoneButton>
				</ButtonWrapper>
			)}
		</ModalWrapper>
	);
};

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
