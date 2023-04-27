import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ButtonProps } from '@mui/material';
import Button from '../button/custom-button';
import { QueryKey, User } from '../../utilities';
import { useAppSelector } from '../../store/hooks';
import { useAlert, useHandleError } from '../../hooks';
import { verifyUser } from '../../api';

type Props = {
	text?: string;
	buttonProps?: ButtonProps;
	user: User | null;
	id?: string;
};

const VerifyUser = ({ text = 'Verify user', buttonProps, user, id }: Props) => {
	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const { token } = useAppSelector((store) => store.authState);
	const [isVerifyUser, setVerifyUser] = useState<boolean>(false);

	const { isLoading } = useQuery('', () => verifyUser(user?.id as string), {
		enabled: !!(token && isVerifyUser),
		onSettled: (data, error) => {
			setVerifyUser(false);
			if (error) {
				const response = handleError({ error });
				if (response?.message)
					setAlert({ message: response.message, type: 'error' });
			}

			if (data && data.success) {
				setAlert({ message: data.message, type: 'success' });
				queryClient.invalidateQueries(QueryKey.AllUsers);
				queryClient.invalidateQueries(QueryKey.GetSingleUser);
				queryClient.invalidateQueries(QueryKey.Statistics);
			}
		},
	});

	return (
		<Button
			loading={isLoading}
			{...buttonProps}
			onClick={() => setVerifyUser(true)}
		>
			{text}
		</Button>
	);
};

export default VerifyUser;
