import React from 'react';
import { Box } from '@mui/material';
import { Layout, NotificationsTable } from '../../components';

const Notifications = () => {
	return (
		<Layout>
			<Box>
				<NotificationsTable />
			</Box>
		</Layout>
	);
};

export default Notifications;
