import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import ReferralTableWithAvatar from '../../components/table/referral-table-with-avatar';

const Referrals = () => {
	return (
		<Layout>
			<Box>
				<ReferralTableWithAvatar />
			</Box>
		</Layout>
	);
};

export default Referrals;
