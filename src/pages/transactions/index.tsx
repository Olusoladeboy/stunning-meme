import React, {
	useState,
	useEffect,
	CSSProperties,
	MouseEvent,
	useRef,
} from 'react';
import queryString from 'query-string';
import {
	Box,
	Button,
	ClickAwayListener,
	List,
	ListItemButton,
	Popper,
	useTheme,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import {
	Layout,
	TransactionsTable,
	Pagination,
	TableHeader,
	TransactionsTab,
	TransactionMainBalance,
	TablePagination,
} from 'components';
import {
	BOX_SHADOW,
	QueryKeys,
	MAX_RECORDS,
	LINKS,
	TRANSACTIONS_TAB,
	TRANSACTION_SERVICE,
} from 'utilities';
import { allTransactions } from 'api';
import {
	useHandleError,
	useAlert,
	useSearchTransaction,
	usePageTitle,
} from 'hooks';
import { ArrowDropDown } from '@mui/icons-material';
import { useAppSelector } from 'store/hooks';

const AllTransactions = () => {
	usePageTitle('All Transactions');
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

	const [serviceAnchorEl, setServiceAnchorEl] = useState<null | HTMLElement>(
		null
	);
	const [transactionService, setTransactionService] = useState<string>('');
	const { isSearching, searchTransaction, clearSearch, search } =
		useSearchTransaction();
	const [isEnableQuery, setEnableQuery] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState(TRANSACTIONS_TAB.ALL);
	const [transactionStatus, setTransactionStatus] = useState<string>('');

	const handleServiceClick = (e: MouseEvent<HTMLElement>) => {
		setServiceAnchorEl(serviceAnchorEl ? null : e.currentTarget);
	};

	// useEffect(
	// 	() => {
	// 		setEnableQuery(true);
	// 		// if (query && query.page) {
	// 		// 	setPage(parseInt(query.page as string));
	// 		// }
	// 	},
	// 	// eslint-disable-next-line
	// 	[]
	// );

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
		[QueryKeys.Transactions, query.page, transactionService, transactionStatus],
		() =>
			allTransactions({
				params: {
					sort: '-createdAt',
					limit: maxRecordRef.current,
					skip: (page - 1) * maxRecordRef.current,
					service: transactionService,
					status: transactionStatus,
					populate: 'network,plan,dataType',
				},
			}),
		{
			retry: 2,
			enabled: isEnableQuery,
			refetchOnWindowFocus: false,
			onSettled: (data: any, error) => {
				setEnableQuery(false);
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
			navigate(`${LINKS.Transactions}?page=${page}`);
		} else {
			navigate(LINKS.Transactions);
			setPage(page);
		}
		setEnableQuery(true);
	};

	const switchUserType = (type?: string) => {
		setTransactionService('');
		switch (type) {
			case TRANSACTIONS_TAB.ALL:
				setCurrentTab(TRANSACTIONS_TAB.ALL);
				setTransactionStatus('');
				setTransactionService('');
				break;

			case TRANSACTIONS_TAB.SUCCESSFUL:
				setCurrentTab(TRANSACTIONS_TAB.SUCCESSFUL);
				setTransactionStatus(TRANSACTIONS_TAB.SUCCESSFUL);
				break;
			case TRANSACTIONS_TAB.PENDING:
				setCurrentTab(TRANSACTIONS_TAB.PENDING);
				setTransactionStatus(TRANSACTIONS_TAB.PENDING);
				break;
			case TRANSACTIONS_TAB.FAILED:
				setCurrentTab(TRANSACTIONS_TAB.FAILED);
				setTransactionStatus(TRANSACTIONS_TAB.FAILED);
				break;

			default:
				setCurrentTab(TRANSACTIONS_TAB.ALL);
				setTransactionStatus('');
				break;
		}
		setEnableQuery(true);
	};

	const handleFilter = (transactionService: string) => {
		setServiceAnchorEl(null);
		if (transactionService === 'ALL SERVICES') {
			setTransactionService('');
		} else {
			setTransactionService(transactionService);
		}

		setEnableQuery(true);
	};

	const statusFilter = (
		<ClickAwayListener onClickAway={() => setServiceAnchorEl(null)}>
			<Box>
				<Button
					style={styles.button as CSSProperties}
					onClick={(e) => handleServiceClick(e)}
					variant={'outlined'}
					endIcon={<ArrowDropDown />}
				>
					Filter by Service
				</Button>
				<Popper
					sx={{ zIndex: theme.zIndex.modal }}
					open={Boolean(serviceAnchorEl)}
					anchorEl={serviceAnchorEl}
				>
					<List
						sx={{
							'& .MuiListItemButton-root': {
								textTransform: 'capitalize',
							},
							'& .MuiListItemButton-root:hover': {
								backgroundColor: theme.palette.primary.main,
								color: grey[50],
							},
						}}
						style={styles.list}
					>
						{Object.values({
							ALL_SERVICES: 'ALL SERVICES',
							...TRANSACTION_SERVICE,
						}).map((value) => (
							<ListItemButton
								sx={{
									textTransform: 'capitalize',
								}}
								onClick={() => handleFilter(value)}
								key={value}
							>
								{value}
							</ListItemButton>
						))}
					</List>
				</Popper>
			</Box>
		</ClickAwayListener>
	);

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
						title={'Transactions'}
						handleSearch={searchTransaction}
						clearSearch={clearSearch}
						statusFilter={statusFilter}
					/>
					{canViewStatistics && <TransactionMainBalance />}
					<TransactionsTab
						currentTab={currentTab}
						changeCurrentTab={switchUserType}
					/>
				</Box>

				<TransactionsTable
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
							{/* <Pagination
								sx={{}}
								size={'large'}
								variant={'outlined'}
								shape={'rounded'}
								page={page}
								count={count}
								onChange={(e, number) => handlePageChange(number)}
							/> */}
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

export default AllTransactions;
