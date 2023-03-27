import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import {
	Layout,
	TransactionsTable,
	TransactionMainBalance,
	Pagination,
} from '../../components';
import { BOX_SHADOW } from '../../utilities/constant';
import { useQueryHook } from '../../utilities/api/hooks';
import { useAppSelector } from '../../store/hooks';
import Api from '../../utilities/api';
import { QueryKey } from '../../utilities/types';
import { MAX_RECORDS } from '../../utilities/constant';
import LINKS from '../../utilities/links';

const Transactions = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
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
		keepPreviousData: true,
		queryKey: [QueryKey.AllTransactions, page],
		queryFn: () =>
			Api.Transactions.All({
				token: token as string,
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
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
			navigate(`${LINKS.Transactions}?&page=${page}`);
		} else {
			navigate(LINKS.Transactions);
			setPage(page);
		}
	};

	return (
		<Layout>
			<Box style={styles.container}>
				<Box sx={{ padding: '0px 2rem' }}>
					<Typography sx={{ marginBottom: theme.spacing(2) }} variant={'h5'}>
						Transactions
					</Typography>
					<TransactionMainBalance />
				</Box>
				<TransactionsTable isLoading={isLoading} data={data && data.payload} />
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
