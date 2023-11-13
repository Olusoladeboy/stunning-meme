import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
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
	LOG_TAB,
	MAX_RECORDS,
	QueryKeys,
	RouteGuard,
} from 'utilities';
import { apiLogs, auditLogs } from 'api';
import LogTab from 'components/tabs/log-tab';

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

	const [currentTab, setCurrentTab] = useState<string>(
		(query?.tab as string) || LOG_TAB.Audit
	);

	useEffect(() => {
		setEnableQuery(true);

		// if (query && query.page) {
		// 	setPage(parseInt(query.page as string));
		// }
	}, []);

	// Audit logs
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

	// AuApidit logs
	const { isLoading: isLoadingApi, data: dataApi } = useQuery(
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
			navigate(`/logs?tab=${query?.tab}&page=${page}`);
		} else {
			navigate(`/logs?tab=${query?.tab}`);
			setPage(page);
		}
		setEnableQuery(true);
	};

	const handleChangeTab = (tab: string) => {
		setEnableQuery(true);
		setCurrentTab(tab);
		switch (tab) {
			case 'audit':
				navigate(LINKS.AuditLogs);

				break;

			case 'api':
				navigate(LINKS.ApiLogs);

				break;

			default:
				navigate(LINKS.ApiLogs);
				break;
		}
	};

	return (
		<Layout>
			<RouteGuard roles={[ADMIN_ROLE.SUPER_ADMIN]}>
				<LogTab currentTab={currentTab} onChangeTab={handleChangeTab} />
				<TableHeader
					sx={{ marginBottom: '2rem', marginTop: '20px' }}
					title={query?.tab === 'audit' ? 'Audit Logs' : 'Api Logs'}
				/>

				{query?.tab === 'audit' && (
					<AuditLogsTable isLoading={isLoading} data={data && data.payload} />
				)}

				{query?.tab === 'api' && (
					<ApiLogsTable
						isLoading={isLoadingApi}
						data={dataApi && dataApi.payload}
					/>
				)}

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

export default AuditLogs;
