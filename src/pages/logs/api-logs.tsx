import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import {
	Layout,
	AuditLogsTable,
	ApiLogsTable,
	TableHeader,
	Pagination,
} from 'components';
import { useAlert, useHandleError, usePageTitle } from 'hooks';
import {
	ADMIN_ROLE,
	LINKS,
	MAX_RECORDS,
	QueryKeys,
	RouteGuard,
} from 'utilities';
import { auditLogs, apiLogs } from 'api';

const ApiLogs = () => {
	usePageTitle('Api logs');
	const handleError = useHandleError();
	const [isEnableQuery, setEnableQuery] = useState<boolean>(false);
	const alert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	useEffect(() => {
		setEnableQuery(true);

		// if (query && query.page) {
		// 	setPage(parseInt(query.page as string));
		// }
	}, []);

	// Audit logs
	const { isLoading, data } = useQuery(
		[QueryKeys.ApiLogs, page],
		() =>
			apiLogs({
				sort: '-createdAt',
				limit: MAX_RECORDS,
				skip: (page - 1) * MAX_RECORDS,
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
			navigate(`${LINKS.ApiLogs}&page=${page}`);
		} else {
			navigate(`${LINKS.ApiLogs}`);
		}
		setPage(page);
		setEnableQuery(true);
	};

	return (
		<Layout>
			<RouteGuard roles={[ADMIN_ROLE.SUPER_ADMIN]}>
				<TableHeader
					sx={{ marginBottom: '2rem', marginTop: '20px' }}
					title={'Api Logs'}
				/>

				<ApiLogsTable isLoading={isLoading} data={data && data.payload} />

				{total > MAX_RECORDS && (
					<Box
						sx={{
							marginLeft: ['15px', '30px'],
						}}
					>
						<Pagination
							sx={{}}
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

export default ApiLogs;
