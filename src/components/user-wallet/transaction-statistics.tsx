import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQuery } from 'react-query';
import { formatNumberToCurrency, User, QueryKeys } from 'utilities';

import { useAppSelector } from 'store/hooks';
import { useAlert, useHandleError } from 'hooks';
import { userTransactionStatistics } from 'api';

type Props = {
	user: User | null;
};

const UserTransactionStat = ({ user }: Props) => {
	const theme = useTheme();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const userId = user?.id as string;

	const token = useAppSelector((store) => store.authState.token);

	const { data } = useQuery(
		[QueryKeys.UserTransactionStatistics, user?.id],
		() => userTransactionStatistics(userId),
		{
			enabled: !!(token && user),
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}
			},
		}
	);

	const payload = data && data.payload;

	return (
		<>
			<Box style={styles.container}>
				<Box>
					<Typography>Total Amount of Transaction</Typography>
					<Typography variant={'h4'}>
						{formatNumberToCurrency(
							(payload?.usersTotalTransactionAmount as string) || 0
						)}
					</Typography>
				</Box>
				<Box>
					<Typography>Total Number of Transactions</Typography>
					<Typography variant={'h4'}>
						{payload?.usersTotalNumberOfTransactions || 0}
					</Typography>
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
