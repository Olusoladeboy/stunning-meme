import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Switch, ButtonProps } from '@mui/material';
import Button from '../button/custom-button';
import { QueryKey, UserDetails } from '../../utilities/types';
import { useAlert } from '../../utilities/hooks';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';

type Props = {
	text?: string;
	isSwitch?: boolean;
	buttonProps?: ButtonProps;
	user: UserDetails | null;
};

const UnsuspendUserButton = ({
	text = 'Unsuspend user',
	isSwitch,
	buttonProps,
	user,
}: Props) => {
	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const { token } = useAppSelector((store) => store.authState);
	const [isSuspended, setSuspended] = useState(false);
	useEffect(() => {
		if (user) {
			setSuspended(user.suspended);
		}
	}, [user, user?.suspended]);

	const { isLoading, mutate } = useMutation(Api.User.SuspendUser, {
		onSettled: (data, error) => {
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
	});

	const handleUnSuspendUser = () => {
		setSuspended(false);
		mutate({
			token: token as string,
			data: { suspended: false },
			id: user?.id as string,
		});
	};

	return isSwitch ? (
		<Switch onChange={() => handleUnSuspendUser()} checked={isSuspended} />
	) : (
		<Button
			loading={isLoading}
			buttonProps={{ ...buttonProps, onClick: () => handleUnSuspendUser() }}
		>
			{text}
		</Button>
	);
};

export default UnsuspendUserButton;
