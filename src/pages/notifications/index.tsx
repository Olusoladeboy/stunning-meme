import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import { Layout, NotificationsTable, Pagination } from 'components';
import { useAlert, useHandleError } from 'hooks';
import { LINKS, MAX_RECORDS, QueryKeys } from 'utilities';
import { notifications } from 'api';
import { Box } from '@mui/material';

const Notifications = () => {
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
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQuery(
		[QueryKeys.Notifications],
		() =>
			notifications({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
				},
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
			navigate(`${LINKS.Notifications}?&page=${page}`);
		} else {
			navigate(LINKS.Notifications);
			setPage(page);
		}
		setEnableQuery(true);
	};
	return (
		<Layout>
			<NotificationsTable
				isLoading={isLoading}
				notifications={data && data.payload}
			/>
			{total > MAX_RECORDS && (
				<Box
					sx={{
						marginTop: '2rem',
						marginLeft: ['15px, 30px'],
						display: 'flex',
						justifyContent: 'flex-end',
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
		</Layout>
	);
};

export default Notifications;
