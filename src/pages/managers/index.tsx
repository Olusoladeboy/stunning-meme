import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import ManagersTable from '../../components/table/managers-table';

const Managers = () => {
	return (
		<Layout>
			<Box>
				<ManagersTable />
			</Box>
		</Layout>
	);
};

export default Managers;
