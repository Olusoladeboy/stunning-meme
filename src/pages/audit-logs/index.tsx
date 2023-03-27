import React from 'react';
import { Box } from '@mui/material';
import { Layout, AuditLogsTable } from '../../components';

const AuditLogs = () => {
	return (
		<Layout>
			<Box>
				<AuditLogsTable />
			</Box>
		</Layout>
	);
};

export default AuditLogs;
