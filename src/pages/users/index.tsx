import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Layout, UsersTable, Pagination } from '../../components';
import { useAppSelector } from '../../store/hooks';
import Api from '../../utilities/api';
import { QueryKey } from '../../utilities/types';
import { MAX_RECORDS } from '../../utilities/constant';
import LINKS from '../../utilities/links';
import { useQueryHook } from '../../utilities/api/hooks';

const Users = () => {
	const { token } = useAppSelector((store) => store.authState);

	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQueryHook({
		queryKey: QueryKey.AllUsers,
		queryFn: () =>
			Api.User.AllUsers({
				token: token as string,
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					populate: 'manager',
				},
			}),
		onSuccessFn: (data: any) => {
			const total = data.metadata.total;
			setTotal(data.metadata.total);
			const count = Math.ceil(total / MAX_RECORDS);
			setCount(count);
		},
	});

	const handlePageChange = (page: number) => {
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.Users}?&page=${page}`);
		} else {
			navigate(LINKS.Users);
			setPage(page);
		}
	};

	return (
		<Layout>
			<UsersTable isLoading={isLoading} users={data && data.payload} />
			{total > MAX_RECORDS && (
				<Box sx={{}}>
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

export default Users;
