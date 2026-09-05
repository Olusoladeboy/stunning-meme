import React, { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { BlacklistedNumbersTable, Layout, Pagination } from 'components';
import { useAppSelector } from 'store/hooks';
import { MAX_RECORDS, QueryKeys, LINKS, IBlacklistedNumber } from 'utilities';
import {
	useAlert,
	useHandleError,
	usePageTitle,
	useSearchBlacklistedNumber,
} from 'hooks';
import { users } from 'api';
import { queryBlacklistedNumbers } from 'api/blacklist';

const BlacklistedNumberPage = () => {
	usePageTitle('Blacklisted Numbers');
	const handleError = useHandleError();
	const token = useAppSelector((store) => store.authState.token);
	const setAlert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	const { isSearching, search, onSearch, clearSearch } =
		useSearchBlacklistedNumber();

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQuery(
		[QueryKeys.BlacklistedNumbers],
		() =>
			queryBlacklistedNumbers({
				sort: '-createdAt',
				limit: MAX_RECORDS,
				skip: (page - 1) * MAX_RECORDS,
			}),
		{
			enabled: !!token,
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });

					if (response?.message)
						setAlert({ message: response.message, type: 'error' });
				}
				if (data && data.success) {
					const total = data?.metadata?.total;
					if (total) {
						setTotal(total);
						const count = Math.ceil(total / MAX_RECORDS);
						setCount(count);
					}
				}
			},
		},
	);

	const blacklistedNumbers = useMemo(() => {
		if (search) return search;

		return data?.payload;
	}, [search, data]);

	const handlePageChange = (page: number) => {
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.Suspension}?&page=${page}`);
		} else {
			navigate(LINKS.Suspension);
			setPage(page);
		}
	};

	return (
		<Layout>
			<BlacklistedNumbersTable
				isLoading={isLoading || isSearching}
				data={blacklistedNumbers as IBlacklistedNumber[]}
				search={onSearch}
				clearSearch={clearSearch}
			/>
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

export default BlacklistedNumberPage;
