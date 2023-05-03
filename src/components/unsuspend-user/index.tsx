import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Switch, ButtonProps } from '@mui/material';
import Button from '../button/custom-button';
import { QueryKeys, User } from '../../utilities';
import { useAlert, useHandleError } from '../../hooks';
import { suspendUser } from '../../api';

type Props = {
	text?: string;
	isSwitch?: boolean;
	buttonProps?: ButtonProps;
	user: User | null;
};

const UnsuspendUserButton = ({
	text = 'Unsuspend user',
	isSwitch,
	buttonProps,
	user,
}: Props) => {
	const queryClient = useQueryClient();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const [isSuspended, setSuspended] = useState(false);
	useEffect(() => {
		if (user) {
			setSuspended(user?.suspended as boolean);
		}
	}, [user, user?.suspended]);

	const { isLoading, mutate } = useMutation(suspendUser, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message)
					setAlert({ message: response.message, type: 'error' });
			}

			if (data && data.success) {
				setAlert({ message: data.message, type: 'success' });
				queryClient.invalidateQueries(QueryKeys.Users);
				queryClient.invalidateQueries(QueryKeys.User);
				queryClient.invalidateQueries(QueryKeys.Statistics);
			}
		},
	});

	const handleUnSuspendUser = () => {
		setSuspended(false);
		mutate({
			data: { suspended: false },
			id: user?.id as string,
		});
	};

	return isSwitch ? (
		<Switch onChange={() => handleUnSuspendUser()} checked={isSuspended} />
	) : (
		<Button
			{...buttonProps}
			loading={isLoading}
			onClick={() => handleUnSuspendUser()}
		>
			{text}
		</Button>
	);
};

export default UnsuspendUserButton;
