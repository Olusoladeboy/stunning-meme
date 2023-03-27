import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ButtonProps } from '@mui/material';
import Button from '../button/custom-button';
import { QueryKey, UserDetails } from '../../utilities/types';
import { useAlert } from '../../utilities/hooks';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';

type Props = {
	text?: string;
	buttonProps?: ButtonProps;
	user: UserDetails | null;
	id?: string;
};

const VerifyUser = ({ text = 'Verify user', buttonProps, user, id }: Props) => {
	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const { token } = useAppSelector((store) => store.authState);
	const [isVerifyUser, setVerifyUser] = useState<boolean>(false);

	const { isLoading } = useQuery(
		'',
		() =>
			Api.User.VerifyUser({ token: token as string, id: user?.id as string }),
		{
			enabled: !!(token && isVerifyUser),
			onSettled: (data, error) => {
				setVerifyUser(false);
				if (error) {
					setAlert({ data: error, isError: true });
				}

				if (data && data.success) {
					setAlert({ data: data.message, type: 'success' });
					queryClient.invalidateQueries(QueryKey.AllUsers);
					queryClient.invalidateQueries(QueryKey.GetSingleUser);
					queryClient.invalidateQueries(QueryKey.Statistics);
				}
			},
		}
	);

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
