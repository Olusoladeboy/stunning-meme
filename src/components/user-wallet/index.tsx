import React, { CSSProperties, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { formatNumberToCurrency, IWallet, User } from 'utilities';
import Button from '../button';
import ModalWrapper from '../modal/Wrapper';
import EditWalletForm from '../forms/edit-wallet-form';
import { useAppSelector } from 'store/hooks';

type Props = {
	user: User | null;
	wallet: IWallet;
};

const UserWallet = ({ user, wallet }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const [isEditWallet, setEditWallet] = useState<boolean>(false);
	const { canCreateOrUpdateRecord } = useAppSelector(
		(store) => store.authState
	);

	const amount = wallet?.balance || 0;

	return (
		<>
			{isEditWallet && (
				<ModalWrapper
					title={
						<Box>
							<Typography sx={{ textTransform: 'uppercase' }} variant={'h6'}>
								current wallet balance
							</Typography>
							<Typography variant={'h4'}>
								{formatNumberToCurrency(amount)}
							</Typography>
						</Box>
					}
					hasCloseButton
					closeModal={() => setEditWallet(false)}
				>
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
					{canCreateOrUpdateRecord && (
						<Button
							onClick={() => setEditWallet(true)}
							variant={'outlined'}
							style={styles.editBtn as CSSProperties}
						>
							Edit wallet
						</Button>
					)}
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
