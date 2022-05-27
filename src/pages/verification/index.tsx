import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import VerificationTable from '../../components/table/verification-table';

const Verification = () => {
	return (
		<Layout>
			<Box>
				<VerificationTable />
			</Box>
		</Layout>
	);
};

export default Verification;
