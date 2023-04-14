import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Box, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import {
	Layout,
	TransactionsTable,
	TransactionMainBalance,
	Pagination,
	TableHeader,
} from '../../components';
import { BOX_SHADOW, QueryKeys, MAX_RECORDS, LINKS } from '../../utilities';
import { useAppSelector } from '../../store/hooks';
import { transactions } from '../../api';
import { useHandleError, useAlert, useSearchTransaction } from '../../hooks';

const Transactions = () => {
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const alert = useAlert();
	const { token } = useAppSelector((store) => store.authState);
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);
	const { isSearching, searchTransaction, clearSearch, search } =
		useSearchTransaction();

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQuery(
		[QueryKeys.AllTransactions],
		() =>
			transactions({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
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
			<Box style={styles.container}>
				<Box sx={{ padding: '0px 2rem', display: 'grid', gap: '10px' }}>
					<TableHeader
						searchPlaceholder={'Search transaction by reference'}
						title={'Transactions'}
						handleSearch={searchTransaction}
						clearSearch={clearSearch}
					/>
					<TransactionMainBalance />
				</Box>
				<TransactionsTable
					isLoading={isLoading || isSearching}
					data={search ? search : data && data.payload}
				/>
				{total > MAX_RECORDS && (
					<Box style={styles.paginationWrapper}>
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

const useStyles = (theme: any) => ({
	container: {
		display: 'grid',
		gridTemplateColumn: '1fr',
		gap: theme.spacing(4),
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	paginationWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		paddingRight: '20px',
	},
});

export default Transactions;
