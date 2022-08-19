import React from 'react';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import Layout from '../../components/layout';
import { useAppSelector } from '../../store/hooks';
import { QueryKeyTypes } from '../../utilities/types';
import Api from '../../utilities/api';
import AdminUserTable from '../../components/table/admin-user-table';
import handleResponse from '../../utilities/helpers/handleResponse';

const Admin = () => {
	const { token } = useAppSelector((store) => store.authState);
	const { enqueueSnackbar } = useSnackbar();
	const { data, isLoading } = useQuery(
		QueryKeyTypes.AllStaff,
		() => Api.Staff.RetrieveAll(token as string),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}
			},
		}
	);

	return (
		<Layout>
			<Box>
				<AdminUserTable isLoading={isLoading} managers={data && data.payload} />
			</Box>
		</Layout>
	);
};

export default Admin;
