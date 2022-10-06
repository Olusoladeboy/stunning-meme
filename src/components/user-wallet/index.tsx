import React, { CSSProperties, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQuery } from 'react-query';
import formatNumberToCurrency from '../../utilities/helpers/formatNumberToCurrency';
import Button from '../button';
import ModalWrapper from '../modal/Wrapper';
import EditWalletForm from '../forms/edit-wallet-form';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';
import { QueryKey, UserDetails } from '../../utilities/types';
import { useAlert } from '../../utilities/hooks';

type Props = {
	user: UserDetails | null;
};

const UserWallet = ({ user }: Props) => {
	const theme = useTheme();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const [amount, setAmount] = useState<string>('');
	const [isEditWallet, setEditWallet] = useState<boolean>(false);
	const { token } = useAppSelector((store) => store.authState);

	useQuery(
		[QueryKey.UserWallet, user?.id],
		() =>
			Api.Wallet.Account({
				token: token as string,
				params: {
					user: user?.id,
				},
			}),
		{
			enabled: !!(token && user),
			onSettled: (data, error) => {
				if (error) {
					setAlert({ data: error, type: 'error' });
				}

				if (data && data.success) {
					const amount = data.payload[0].balance.$numberDecimal;
					setAmount(amount);
				}
			},
		}
	);

	return (
		<>
			{isEditWallet && (
				<ModalWrapper closeModal={() => setEditWallet(false)}>
					<Box>
						<Typography sx={{ textTransform: 'uppercase' }} variant={'h6'}>
							current wallet balance
						</Typography>
						<Typography variant={'h4'}>
							{formatNumberToCurrency(amount)}
						</Typography>
					</Box>
					<EditWalletForm user={user} close={() => setEditWallet(false)} />
				</ModalWrapper>
			)}
			<Box style={styles.container}>
				<Typography>
					User Wallet <br />
					Balance
				</Typography>
				<Box style={styles.balanceBtnContainer}>
					<Typography variant={'h4'}>
						{formatNumberToCurrency(amount)}
					</Typography>
					<Button
						onClick={() => setEditWallet(true)}
						variant={'outlined'}
						style={styles.editBtn as CSSProperties}
					>
						Edit wallet
					</Button>
				</Box>
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	container: {
		backgroundColor: theme.palette.secondary.main,
		padding: theme.spacing(3),
		borderRadius: theme.spacing(2),
		color: grey[50],
	},
	balanceBtnContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: theme.spacing(3),
	},
	editBtn: {
		textTransform: 'uppercase',
		color: grey[50],
		borderColor: grey[50],
	},
});

export default UserWallet;
