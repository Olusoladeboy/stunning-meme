import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQuery } from 'react-query';
import { formatNumberToCurrency, QueryKey, User } from 'utilities';

import { useAppSelector } from 'store/hooks';
import { useAlert, useHandleError } from 'hooks';
import { walletAccount } from 'api';

type Props = {
	user: User | null;
};

const UserTransactionStat = ({ user }: Props) => {
	const theme = useTheme();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const [amount, setAmount] = useState<string>('');
	const [isEditWallet, setEditWallet] = useState<boolean>(false);
	const { token, canCreateOrUpdateRecord } = useAppSelector(
		(store) => store.authState
	);

	useQuery(
		[QueryKey.UserWallet, user?.id],
		() =>
			walletAccount({
				params: {
					user: user?.id,
				},
			}),
		{
			enabled: !!(token && user),
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					const amount = data.payload[0].balance;
					setAmount(amount);
				}
			},
		}
	);

	return (
		<>
			<Box style={styles.container}>
				<Box>
					<Typography>Total Balance</Typography>
					<Typography variant={'h4'}>
						{formatNumberToCurrency('10000')}
					</Typography>
				</Box>
				<Box>
					<Typography>Total Transactions</Typography>
					<Typography variant={'h4'}>100</Typography>
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
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gap: theme.spacing(2),
	},
});

export default UserTransactionStat;
