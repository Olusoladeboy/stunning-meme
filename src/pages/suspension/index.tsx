import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import SuspensionTable from '../../components/table/suspension-table';

const Suspension = () => {
	return (
		<Layout>
			<Box>
				<SuspensionTable />
			</Box>
		</Layout>
	);
};

export default Suspension;
