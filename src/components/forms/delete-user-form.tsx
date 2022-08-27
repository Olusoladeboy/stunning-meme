import React, { CSSProperties, useState } from 'react';
import { Box, useTheme, Typography, Switch } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
// import Button from '../button';
import { grey } from '@mui/material/colors';
import { UserDetailsType } from '../../utilities/types';
import Api from '../../utilities/api';
import { QueryKeyTypes } from '../../utilities/types';
import { useAlert } from '../../utilities/hooks';
import Loader from '../loader';
import { useAppSelector } from '../../store/hooks';

type Props = {
	user: UserDetailsType | null;
};

const DeleteUserForm = ({ user }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const setAlert = useAlert();
	const queryClient = useQueryClient();
	const [isActive, setActive] = useState<boolean>(
		user?.isActive ? true : false
	);

	const { token } = useAppSelector((store) => store.authState);
	const { isLoading, mutate } = useMutation(Api.User.ActivateOrDeativateUser, {
		onSettled: (data, error) => {
			if (error) {
				setAlert({ data: error, isError: true });
			}

			if (data && data.success) {
				setAlert({ data: data.message, type: 'success' });

				queryClient.invalidateQueries(QueryKeyTypes.GetSingleUser);
				queryClient.invalidateQueries(QueryKeyTypes.AllUsers);
			}
		},
	});

	const handleSwitch = () => {
		setActive(!isActive);
		mutate({
			token: token as string,
			data: {
				isActive: !user?.isActive,
			},
			id: user?.id as string,
		});
	};

	return (
		<>
			{isLoading && <Loader />}
			<Box component={'form'}>
				<Box style={styles.switchWrapper}>
					<Typography style={styles.text as CSSProperties}>
						{user?.isActive ? 'Deactivate user' : 'Activate user'}
					</Typography>
					<Switch checked={isActive} onChange={() => handleSwitch()} />
				</Box>
				{/* <Box style={styles.formWrapper as CSSProperties}>
				<Box>
					<TextArea rows={8} fullWidth placeholder={'Enter suspension note'} />
				</Box>

				<Button size={'large'} style={styles.btn}>
					Deactivate user
				</Button>
			</Box> */}
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	formWrapper: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	switchWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(1),
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		minWidth: '140px',
	},
	text: {
		fontWeight: '600',
		textTransform: 'capitalize',
	},
});

export default DeleteUserForm;
