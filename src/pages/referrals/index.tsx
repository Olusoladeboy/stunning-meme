import React from 'react';
import { Box } from '@mui/material';
import { Layout, ReferralTableWithAvatar } from '../../components';

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
