import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import {
	Layout,
	ApiLogsTable,
	TableHeader,
	Pagination,
	TablePagination,
} from 'components';
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

	const totalRef = useRef<number>(0);
	const pageRef = useRef<number>(0);

	const maxRecordRef = useRef<number>(MAX_RECORDS);

	const { apiLog, isSearchingApiLog, searchApiLog, clearSearch } =
		useSearchApiLog();

	// Audit logs
	const { isLoading, data, refetch } = useQuery(
		[QueryKeys.ApiLogs, pageRef.current],
		() =>
			apiLogs({
				sort: '-createdAt',
				limit: maxRecordRef.current,
				skip: pageRef.current * maxRecordRef.current,
				populate: 'user',
			}),
		{
			refetchOnWindowFocus: false,
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
					// setTotal(data.metadata.total);
					totalRef.current = total;
					// const count = Math.ceil(total / maxRecordRef.current);
					// setCount(count);
				}
			},
		}
	);

	const handlePageChange = (page: number) => {
		pageRef.current = page;
		if (page !== 0) {
			navigate(`${LINKS.ApiLogs}?page=${page}`);
		} else {
			navigate(`${LINKS.ApiLogs}`);
		}
		refetch();
	};

	const handleChangeRowsPerPage = (value: number) => {
		maxRecordRef.current = value;
		refetch();
	};

	return (
		<Layout>
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

			{!isSearchingApiLog &&
				!isLoading &&
				!apiLog &&
				totalRef.current > maxRecordRef.current && (
					<Box
						sx={{
							marginLeft: ['15px', '30px'],
							marginTop: ['30px'],
						}}
					>
						<TablePagination
							page={pageRef.current}
							count={Number(totalRef.current)}
							onPageChange={handlePageChange}
							rowsPerPage={maxRecordRef.current}
							handleChangeRowsPerPage={handleChangeRowsPerPage}
						/>
						{/* <Pagination
							sx={{}}
							size={'large'}
							variant={'outlined'}
							shape={'rounded'}
							page={page}
							count={count}
							onChange={(e, number) => handlePageChange(number)}
						/> */}
					</Box>
				)}
		</Layout>
	);
};

export default ApiLogs;
