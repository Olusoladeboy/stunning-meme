import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../components/layout';
import UsersTable from '../../components/table/users-table';

const Users = () => {
	return (
		<Layout>
			<UsersTable />
		</Layout>
	);
};

export default Users;
