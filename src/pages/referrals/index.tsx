import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import { styled, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Pagination, ReferralTable, TableHeader } from 'components';
import { referrals } from 'api';
import {
	useHandleError,
	useAlert,
	useSearchReferral,
	usePageTitle,
} from 'hooks';
import { QueryKeys, MAX_RECORDS, LINKS, BOX_SHADOW } from 'utilities';
import { useAppSelector } from 'store/hooks';

const Referrals = () => {
	usePageTitle('Referrals');
	const handleError = useHandleError();
	const alert = useAlert();
	const { token } = useAppSelector((store) => store.authState);
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	const { isSearching, searchReferral, search, clearSearch } =
		useSearchReferral();

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQuery(
		[QueryKeys.Referrals],
		() =>
			referrals({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					populate: 'referredBy',
				},
			}),
		{
			enabled: !!token,
			onSettled: (data: any, error) => {
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
			navigate(`${LINKS.Transactions}?&page=${page}`);
		} else {
			navigate(LINKS.Transactions);
			setPage(page);
		}
	};
	return (
		<Layout>
			<Container>
				<TableHeader
					placeholder={'Search referral by email'}
					sx={{
						marginBottom: '1rem',
						padding: {
							xs: '0px 15px',
							md: '0px 30px',
						},
					}}
					title={'Referrals'}
					clearSearch={clearSearch}
					handleSearch={searchReferral}
				/>
				<ReferralTable
					isLoading={isLoading || isSearching}
					data={search ? search : data && data.payload}
				/>
				{!search && total > MAX_RECORDS && (
					<Pagination
						page={page}
						count={count}
						onChange={(e, number) => handlePageChange(number)}
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							marginTop: (theme) => theme.spacing(4),
							marginRight: '1rem',
						}}
						size={'large'}
						shape={'rounded'}
						variant={'outlined'}
					/>
				)}
			</Container>
		</Layout>
	);
};

const Container = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumn: '1fr',
	gap: theme.spacing(4),
	border: `0.5px solid ${theme.palette.secondary.main}`,
	padding: '1.5rem 0px',
	backgroundColor: grey[50],
	borderRadius: theme.spacing(2),
	boxShadow: BOX_SHADOW,
}));

export default Referrals;
