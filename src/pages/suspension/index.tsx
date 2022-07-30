import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import Layout from '../../components/layout';
import { useAppSelector } from '../../store/hooks';
import Api from '../../utilities/api';
import { QueryKeyTypes } from '../../utilities/types';
import handleResponse from '../../utilities/helpers/handleResponse';
import Pagination from '../../components/pagination';
import { MAX_RECORDS } from '../../utilities/constant';
import LINKS from '../../utilities/links';
import SuspensionTable from '../../components/table/suspension-table';

const Suspension = () => {
	const { token } = useAppSelector((store) => store.authState);
	const { enqueueSnackbar } = useSnackbar();

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

	const { isLoading, data } = useQuery(
		QueryKeyTypes.AllUsers,
		() =>
			Api.User.AllUsers({
				token: token as string,
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					suspended: true,
				},
			}),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
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
			navigate(`${LINKS.Users}?&page=${page}`);
		} else {
			navigate(LINKS.Users);
			setPage(page);
		}
	};

	return (
		<Layout>
			<SuspensionTable isLoading={isLoading} users={data && data.payload} />
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

export default Suspension;
