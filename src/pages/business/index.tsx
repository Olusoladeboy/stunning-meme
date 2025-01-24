import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Layout, Pagination, BusinessTable } from 'components';
import { MAX_RECORDS, LINKS, QueryKeys, IBusiness } from 'utilities';
import { businesses } from 'api';
import { useAlert, useHandleError, usePageTitle, useSearchUser } from 'hooks';

const Businesses = () => {
	usePageTitle('Business');
	const navigate = useNavigate();
	const alert = useAlert();
	const handleError = useHandleError();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const searchDeletedUser = React.useRef<boolean>(false);
	const location = useLocation();
	const query = queryString.parse(location.search);
	const { isSearching, search, clearSearch, searchUser } = useSearchUser();

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data, refetch } = useQuery(
		[QueryKeys.Business, page],
		() =>
			businesses({
				sort: '-createdAt',
				limit: MAX_RECORDS,
				skip: (page - 1) * MAX_RECORDS,
				populate: 'businessOwner',
			}),
		{
			// enabled: isLoad,
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}
				if (data && data.success) {
					const total = Number(data?.metadata?.total);
					setTotal(data?.metadata?.total as number);
					const count = Math.ceil(total / MAX_RECORDS);
					setCount(count);
				}
			},
		}
	);

	const handlePageChange = (page: number) => {
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.Business}?page=${page}`);
		} else {
			navigate(LINKS.Business);
			setPage(page);
		}
		refetch();
	};

	const handleChangeSearchDeletedUser = (state: boolean) =>
		(searchDeletedUser.current = state);

	const handleSearch = (value: string) => {
		searchUser(value, searchDeletedUser.current);
	};

	return (
		<Layout>
			<BusinessTable
				isLoading={isLoading || isSearching}
				businesses={data?.payload as IBusiness[] | null}
				searchUser={handleSearch}
				clearSearch={clearSearch}
				isDisplayTab={!search}
				changeSearchDeletedUser={handleChangeSearchDeletedUser}
			/>
			{!search && total > MAX_RECORDS && (
				<Box
					sx={{
						marginTop: '20px',
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

export default Businesses;
