import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import NotificationsTable from '../../components/table/notifications-table';

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
