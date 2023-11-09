import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Layout, Pagination, DisputesTable } from 'components';
import { QueryKeys, MAX_RECORDS, LINKS, TicketType } from 'utilities';
import { usePageTitle, useQueryHook, useSearchTicket } from 'hooks';
import { tickets } from 'api';

const Disputes = () => {
	usePageTitle('Disputes');
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);
	const { search, isSearching, clearSearch, searchTicket } = useSearchTicket();

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQueryHook({
		queryKey: [QueryKeys.Tickets, page],
		queryFn: () =>
			tickets({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					populate: 'user',
					type: TicketType.DISPUTE,
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
			navigate(`${LINKS.Dispute}?&page=${page}`);
		} else {
			navigate(LINKS.Dispute);
			setPage(page);
		}
	};

	return (
		<Layout>
			<Box>
				<DisputesTable
					isLoading={isLoading || isSearching}
					data={search ? search : data && data.payload}
					clearSearch={clearSearch}
					searchTicket={searchTicket}
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

export default Disputes;
