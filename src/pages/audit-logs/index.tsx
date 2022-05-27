import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import AuditLogsTable from '../../components/table/audit-logs-table';

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
