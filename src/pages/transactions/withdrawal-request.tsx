import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import { Box, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import {
	Layout,
	TableHeader,
	TablePagination,
	WithdrawalTransactionsTable,
} from 'components';
import { BOX_SHADOW, MAX_RECORDS, LINKS } from 'utilities';
import { walletWithdrawal } from 'api';
import {
	useHandleError,
	useAlert,
	useSearchTransaction,
	usePageTitle,
} from 'hooks';
import { useAppSelector } from 'store/hooks';

const WithdrawalRequestTransactions = () => {
	usePageTitle('Withdrawal Request');
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const alert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const location = useLocation();
	const query = queryString.parse(location.search);
	const [page, setPage] = useState<number>(Number(query?.page) || 1);
	const [total, setTotal] = useState<number>(0);
	const maxRecordRef = useRef<number>(MAX_RECORDS);

	const { canViewStatistics } = useAppSelector((store) => store.authState);

	const { isSearching, searchTransaction, clearSearch, search } =
		useSearchTransaction();

	useEffect(
		() => {
			if (query && query.page) {
				setPage(parseInt(query.page as string));
			}
		},
		// eslint-disable-next-line
		[query]
	);

	const { isLoading, data, refetch } = useQuery(
		['Withdrawal', query.page],
		() =>
			walletWithdrawal({
				sort: '-createdAt',
				limit: maxRecordRef.current,
				skip: (page - 1) * maxRecordRef.current,
				populate: 'user',
				status: 'PENDING',
			}),
		{
			retry: 2,
			refetchOnWindowFocus: false,
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
					const count = Math.ceil(total / maxRecordRef.current);
					setCount(count);
				}
			},
		}
	);

	const handlePageChange = (page: number) => {
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.WithdrawalRequestTransactions}?page=${page}`);
		} else {
			navigate(LINKS.WithdrawalRequestTransactions);
			setPage(page);
		}
		refetch();
	};

	const handleChangeRowsPerPage = (value: number) => {
		maxRecordRef.current = value;
		refetch();
	};

	return (
		<Layout>
			<Box style={styles.container}>
				<Box
					sx={{
						padding: { xs: '0px 15px', md: '0px 2rem' },
						display: 'grid',
						gap: '2rem',
					}}
				>
					<TableHeader
						searchPlaceholder={'Search transaction by reference'}
						title={'Withdrawal  Request'}
						handleSearch={searchTransaction}
						clearSearch={clearSearch}
					/>
				</Box>

				<WithdrawalTransactionsTable
					hasActionButton
					isLoading={isLoading || isSearching}
					data={search && search.length > 0 ? search : data && data.payload}
				/>

				{!Boolean(search && search.length > 0) &&
					!isSearching &&
					!isLoading &&
					total > maxRecordRef.current && (
						<Box style={styles.paginationWrapper}>
							<TablePagination
								page={page - 1}
								count={Number(total)}
								onPageChange={(value) => handlePageChange(value + 1)}
								rowsPerPage={maxRecordRef.current}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
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
		border: `0.5px solid ${theme.palette.secondary.main}`,
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
	button: {
		whiteSpace: 'nowrap',
	},
	list: {
		border: `1px solid ${theme.palette.primary.main}`,
		borderRadius: theme.spacing(1),
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(2),
	},
});

export default WithdrawalRequestTransactions;
