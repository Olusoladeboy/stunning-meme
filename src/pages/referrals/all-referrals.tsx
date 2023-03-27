import React from 'react';
import { Box } from '@mui/material';
import { Layout, AllReferralsTable } from '../../components';

const AllReferrals = () => {
	return (
		<Layout>
			<Box>
				<AllReferralsTable />
			</Box>
		</Layout>
	);
};

export default AllReferrals;
