import React, { useState, useEffect, CSSProperties, MouseEvent } from 'react';
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
import { useHandleError, useAlert, useSearchTransaction } from 'hooks';
import { ArrowDropDown } from '@mui/icons-material';

const AllTransactions = () => {
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const alert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	const [serviceAnchorEl, setServiceAnchorEl] = useState<null | HTMLElement>(
		null
	);
	const [transactionService, setTransactionService] = useState<string>('');
	const { isSearching, searchTransaction, clearSearch, search } =
		useSearchTransaction();
	const [isLoad, setLoad] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState(TRANSACTIONS_TAB.ALL);
	const [transactionStatus, setTransactionStatus] = useState<string>('');

	const location = useLocation();
	const query = queryString.parse(location.search);

	const handleServiceClick = (e: MouseEvent<HTMLElement>) => {
		setServiceAnchorEl(serviceAnchorEl ? null : e.currentTarget);
	};

	useEffect(
		() => {
			setLoad(true);
			// if (query && query.page) {
			// 	setPage(parseInt(query.page as string));
			// }
		},
		// eslint-disable-next-line
		[]
	);

	useEffect(
		() => {
			if (query && query.page) {
				setPage(parseInt(query.page as string));
			}
		},
		// eslint-disable-next-line
		[query]
	);

	const { isLoading, data } = useQuery(
		[QueryKeys.Transactions, query.page, transactionService, transactionStatus],
		() =>
			allTransactions({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					service: transactionService,
					status: transactionStatus,
				},
			}),
		{
			retry: 2,
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
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.Transactions}?page=${page}`);
		} else {
			navigate(LINKS.Transactions);
			setPage(page);
		}
		setLoad(true);
	};

	const switchUserType = (type?: string) => {
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
		setLoad(true);
	};

	const handleFilter = (transactionService: string) => {
		setServiceAnchorEl(null);
		if (transactionService === 'ALL SERVICES') {
			setTransactionService('');
		} else {
			setTransactionService(transactionService);
		}

		setLoad(true);
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
						statusFilter={statusFilter}
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
