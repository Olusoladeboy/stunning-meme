import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Box, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import {
	Layout,
	TransactionsTable,
	Pagination,
	TableHeader,
	TransactionsTab,
} from 'components';
import {
	BOX_SHADOW,
	QueryKeys,
	MAX_RECORDS,
	LINKS,
	TRANSACTIONS_TAB,
} from 'utilities';
import { allTransactions } from 'api';
import { useHandleError, useAlert, useSearchTransaction } from 'hooks';

const AllTransactions = () => {
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const alert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);
	const { isSearching, searchTransaction, clearSearch, search } =
		useSearchTransaction();
	const [isLoad, setLoad] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState(TRANSACTIONS_TAB.ALL);
	const [transactionStatus, setTransactionStatus] = useState<{
		[key: string]: string;
	}>({} as { [key: string]: string });

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQuery(
		[QueryKeys.Transactions, query.page],
		() =>
			allTransactions({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					...transactionStatus,
				},
			}),
		{
			enabled: isLoad,
			onSettled: (data: any, error) => {
				setLoad(false);
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
		setLoad(true);
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.Transactions}?&page=${page}`);
		} else {
			navigate(LINKS.Transactions);
			setPage(page);
		}
	};

	const switchUserType = (type?: string) => {
		switch (type) {
			case TRANSACTIONS_TAB.ALL:
				setCurrentTab(TRANSACTIONS_TAB.ALL);
				setTransactionStatus({});
				break;

			case TRANSACTIONS_TAB.SUCCESSFUL:
				setCurrentTab(TRANSACTIONS_TAB.SUCCESSFUL);
				setTransactionStatus({ status: TRANSACTIONS_TAB.SUCCESSFUL });
				break;
			case TRANSACTIONS_TAB.PENDING:
				setCurrentTab(TRANSACTIONS_TAB.PENDING);
				setTransactionStatus({ status: TRANSACTIONS_TAB.PENDING });
				break;
			case TRANSACTIONS_TAB.FAILED:
				setCurrentTab(TRANSACTIONS_TAB.FAILED);
				setTransactionStatus({ status: TRANSACTIONS_TAB.FAILED });
				break;

			default:
				setCurrentTab(TRANSACTIONS_TAB.ALL);
				setTransactionStatus({});
				break;
		}
		setLoad(true);
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
						title={'All Transactions'}
						handleSearch={searchTransaction}
						clearSearch={clearSearch}
					/>
					<TransactionsTab
						currentTab={currentTab}
						changeCurrentTab={switchUserType}
					/>
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

export default AllTransactions;
