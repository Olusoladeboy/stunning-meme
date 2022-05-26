import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import AllReferralsTable from '../../components/table/all-referral-table';

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
