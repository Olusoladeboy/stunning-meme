import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import DisputesTable from '../../components/table/disputes-table';

const Dispute = () => {
	return (
		<Layout>
			<Box>
				<DisputesTable />
			</Box>
		</Layout>
	);
};

export default Dispute;
