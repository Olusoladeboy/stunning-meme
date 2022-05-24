import React, { CSSProperties, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import formatNumberToCurrency from '../../utilities/helpers/formatNumberToCurrency';
import Button from '../button';
import ModalWrapper from '../modal/Wrapper';
import EditWalletForm from '../forms/edit-wallet-form';

const BALANCE = 500000;

const UserWallet = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [isEditWallet, setEditWallet] = useState<boolean>(false);
	return (
		<>
			{isEditWallet && (
				<ModalWrapper
					close={() => setEditWallet(false)}
					title={
						<Box>
							<Typography sx={{ textTransform: 'uppercase' }} variant={'h6'}>
								current wallet balance
							</Typography>
							<Typography variant={'h4'}>
								{formatNumberToCurrency(BALANCE)}
							</Typography>
						</Box>
					}
				>
					<EditWalletForm />
				</ModalWrapper>
			)}
			<Box style={styles.container}>
				<Typography>
					User Wallet <br />
					Balance
				</Typography>
				<Box style={styles.balanceBtnContainer}>
					<Typography variant={'h4'}>
						{formatNumberToCurrency(BALANCE)}
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
