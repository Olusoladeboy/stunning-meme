import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { Layout, AuditLogsTable, TableHeader, Pagination } from 'components';
import { useAlert, useHandleError, usePageTitle } from 'hooks';
import {
	ADMIN_ROLE,
	LINKS,
	MAX_RECORDS,
	QueryKeys,
	RouteGuard,
} from 'utilities';
import { auditLogs } from 'api';

const AuditLogs = () => {
	usePageTitle('Audit logs');
	const handleError = useHandleError();
	const [isEnableQuery, setEnableQuery] = useState<boolean>(false);
	const alert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	useEffect(() => {
		setEnableQuery(true);
		// if (query && query.page) {
		// 	setPage(parseInt(query.page as string));
		// }
	}, []);

	const { isLoading, data } = useQuery(
		[QueryKeys.AuditLogs, page],
		() =>
			auditLogs({
				sort: '-createdAt',
				limit: MAX_RECORDS,
				skip: (page - 1) * MAX_RECORDS,
				populate: 'staff',
			}),
		{
			enabled: isEnableQuery,
			onSettled: (data: any, error) => {
				setEnableQuery(false);
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						alert({ message: response.message, type: 'error' });
					}
				}
				if (data && data.success) {
					const total = data.metadata.total;
					setTotal(data.metadata.total);
					const count = Math.ceil(total / MAX_RECORDS);
					setCount(count);
				}
			},
		}
	);

	const handlePageChange = (page: number) => {
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.AuditLogs}?page=${page}`);
		} else {
			navigate(LINKS.AuditLogs);
			setPage(page);
		}
		setEnableQuery(true);
	};
	return (
		<Layout>
			<RouteGuard roles={[ADMIN_ROLE.SUPER_ADMIN]}>
				<TableHeader sx={{ marginBottom: '2rem' }} title={'Audit Logs'} />
				<AuditLogsTable isLoading={isLoading} data={data && data.payload} />
				{total > MAX_RECORDS && (
					<Box
						sx={{
							marginLeft: ['15px', '30px'],
						}}
					>
						<Pagination
							sx={{
								marginTop: '20px',
							}}
							size={'large'}
							variant={'outlined'}
							shape={'rounded'}
							page={page}
							count={count}
							onChange={(e, number) => handlePageChange(number)}
						/>
					</Box>
				)}
			</RouteGuard>
		</Layout>
	);
};

export default AuditLogs;
