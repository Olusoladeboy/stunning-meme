import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import RefereesTable from '../../components/table/referees-table';

const ViewReferees = () => {
	return (
		<Layout>
			<Box>
				<RefereesTable />
			</Box>
		</Layout>
	);
};

export default ViewReferees;
