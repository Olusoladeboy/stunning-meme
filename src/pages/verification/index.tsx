import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { Layout, Pagination, VerificationTable } from '../../components';
import { MAX_RECORDS, QueryKeys, LINKS } from '../../utilities';
import { useAppSelector } from '../../store/hooks';
import { useAlert } from '../../utilities/hooks';
import { users } from '../../api';
import { useSearchUser } from '../../hooks';

const Verification = () => {
	const { token } = useAppSelector((store) => store.authState);
	const setAlert = useAlert();
	const theme = useTheme();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	const { search, isSearching, searchUser, clearSearch } = useSearchUser();

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQuery(
		QueryKeys.AllUsers,
		() =>
			users({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					populate: 'manager',
				},
			}),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					setAlert({ data: error, type: 'error' });
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
			<Box>
				<VerificationTable
					clearSearch={clearSearch}
					searchUser={searchUser}
					isLoading={isLoading || isSearching}
					users={search ? search : data && data.payload}
				/>
			</Box>
			{!search && total > MAX_RECORDS && (
				<Pagination
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						marginTop: theme.spacing(4),
						marginRight: '1rem',
					}}
					size={'large'}
					variant={'outlined'}
					shape={'rounded'}
					page={page}
					count={count}
					onChange={(e, number) => handlePageChange(number)}
				/>
			)}
		</Layout>
	);
};

export default Verification;
