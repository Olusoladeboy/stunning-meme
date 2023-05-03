import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Layout, Pagination, CouponsTable } from 'components';
import { MAX_RECORDS, LINKS, QueryKeys } from 'utilities';
import { useSearchCoupon, useQueryHook } from 'hooks';
import { coupons } from 'api';

const Coupons = () => {
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	const { isSearching, searchCoupon, search, clearSearch } = useSearchCoupon();

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQueryHook({
		queryKey: QueryKeys.Coupon,
		queryFn: () =>
			coupons({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					populate: 'createdBy',
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
			navigate(`${LINKS.Coupons}?&page=${page}`);
		} else {
			navigate(LINKS.Coupons);
			setPage(page);
		}
	};

	return (
		<Layout>
			<Box>
				<CouponsTable
					isLoading={isLoading || isSearching}
					data={search ? search : data && data.payload}
					clearSearch={clearSearch}
					searchCoupon={searchCoupon}
				/>
				{!search && total > MAX_RECORDS && (
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
			</Box>
		</Layout>
	);
};

export default Coupons;
