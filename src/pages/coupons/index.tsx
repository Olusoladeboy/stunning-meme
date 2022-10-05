import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Layout from '../../components/layout';
import { useAppSelector } from '../../store/hooks';
import Api from '../../utilities/api';
import { QueryKey } from '../../utilities/types';
import Pagination from '../../components/pagination';
import { MAX_RECORDS } from '../../utilities/constant';
import LINKS from '../../utilities/links';
import { useQueryHook } from '../../utilities/api/hooks';
import CouponsTable from '../../components/table/coupons-table';

const Coupons = () => {
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
		queryKey: QueryKey.Coupon,
		queryFn: () =>
			Api.Coupon.RetrieveAll({
				token: token as string,
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
				<CouponsTable isLoading={isLoading} data={data && data.payload} />
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
			</Box>
		</Layout>
	);
};

export default Coupons;
