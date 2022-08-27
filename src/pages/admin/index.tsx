import React from 'react';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import Layout from '../../components/layout';
import { useAppSelector } from '../../store/hooks';
import { QueryKeyTypes } from '../../utilities/types';
import Api from '../../utilities/api';
import AdminUserTable from '../../components/table/admin-user-table';
import { useAlert } from '../../utilities/hooks';

const Admin = () => {
	const setAlert = useAlert();
	const { token } = useAppSelector((store) => store.authState);
	const { data, isLoading } = useQuery(
		QueryKeyTypes.AllStaff,
		() => Api.Staff.RetrieveAll(token as string),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					setAlert({ data: error, type: 'error' });
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
