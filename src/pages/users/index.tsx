import React from 'react';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import Layout from '../../components/layout';
import UsersTable from '../../components/table/users-table';
import { useAppSelector } from '../../store/hooks';
import Api from '../../utilities/api';
import { QueryKeyTypes } from '../../utilities/types';
import handleResponse from '../../utilities/helpers/handleResponse';

const Users = () => {
	const { token } = useAppSelector((store) => store.authState);
	const { enqueueSnackbar } = useSnackbar();
	const { isLoading, data } = useQuery(
		QueryKeyTypes.AllUsers,
		() => Api.User.AllUsers({ token: token || '' }),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}
			},
		}
	);

	return (
		<Layout>
			<UsersTable isLoading={isLoading} users={data && data.payload} />
		</Layout>
	);
};

export default Users;
