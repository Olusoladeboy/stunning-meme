import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import CouponsTable from '../../components/table/coupons-table';

const Coupons = () => {
	return (
		<Layout>
			<Box>
				<CouponsTable />
			</Box>
		</Layout>
	);
};

export default Coupons;
