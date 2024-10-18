import React, { CSSProperties, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { formatNumberToCurrency, User, IWallet, checkAmount } from 'utilities';
import Button from '../button';
import ModalWrapper from '../modal/Wrapper';
import { useAppSelector } from 'store/hooks';
import LienForm from 'components/forms/lien-form';

type Props = {
	user: User | null;
	wallet: IWallet;
};

const UserLien = ({ user, wallet }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [isEditWallet, setEditWallet] = useState<boolean>(false);
	const amount = wallet?.lien;
	const { canCreateOrUpdateRecord } = useAppSelector(
		(store) => store.authState
	);

	return (
		<>
			{isEditWallet && (
				<ModalWrapper
					title={
						<Box>
							<Typography sx={{ textTransform: 'uppercase' }} variant={'h6'}>
								Current Lien balance
							</Typography>
							<Typography variant={'h4'}>
								{formatNumberToCurrency(amount ? checkAmount(amount) : 0)}
							</Typography>
						</Box>
					}
					hasCloseButton
					closeModal={() => setEditWallet(false)}
				>
					<LienForm user={user} close={() => setEditWallet(false)} />
				</ModalWrapper>
			)}
			<Box style={styles.container}>
				<Typography>
					User Lien <br />
					Balance
				</Typography>
				<Box style={styles.balanceBtnContainer}>
					<Typography variant={'h4'}>
						{formatNumberToCurrency(amount ? checkAmount(amount) : 0)}
					</Typography>
					{canCreateOrUpdateRecord && (
						<Button
							onClick={() => setEditWallet(true)}
							variant={'outlined'}
							style={styles.editBtn as CSSProperties}
						>
							Edit Lien
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

export default UserLien;
