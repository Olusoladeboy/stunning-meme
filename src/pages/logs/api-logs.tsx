import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { Layout, ApiLogsTable, TableHeader, Pagination } from 'components';
import { useAlert, useHandleError, usePageTitle, useSearchApiLog } from 'hooks';
import {
	ADMIN_ROLE,
	LINKS,
	MAX_RECORDS,
	QueryKeys,
	RouteGuard,
} from 'utilities';
import { apiLogs } from 'api';

const ApiLogs = () => {
	usePageTitle('Api logs');
	const handleError = useHandleError();
	const [isEnableQuery, setEnableQuery] = useState<boolean>(false);
	const alert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	const { apiLog, isSearchingApiLog, searchApiLog, clearSearch } =
		useSearchApiLog();

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
				populate: 'user',
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
			navigate(`${LINKS.ApiLogs}?page=${page}`);
		} else {
			navigate(`${LINKS.ApiLogs}`);
		}
		setPage(page);
		setEnableQuery(true);
	};

	return (
		<Layout>
			<RouteGuard roles={[ADMIN_ROLE.SUPER_ADMIN, ADMIN_ROLE.OPERATIONS]}>
				<TableHeader
					sx={{ marginBottom: '2rem', marginTop: '20px' }}
					title={'Api Logs'}
					searchPlaceholder={'Search records by reference'}
					handleSearch={searchApiLog}
					clearSearch={clearSearch}
				/>

				<ApiLogsTable
					isLoading={isLoading || isSearchingApiLog}
					data={apiLog ? apiLog : data && data.payload}
				/>

				{!isSearchingApiLog && !isLoading && !apiLog && total > MAX_RECORDS && (
					<Box
						sx={{
							marginLeft: ['15px', '30px'],
							marginTop: ['30px'],
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
