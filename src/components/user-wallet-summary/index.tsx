import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import {
	Box,
	ClickAwayListener,
	List,
	ListItemButton,
	Popper,
	useTheme,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import UserAvatarWithDetails from '../avatar-with-details';
import WalletSummaryTable from '../table/wallet-summary-table';
import {
	capitalize,
	LINKS,
	MAX_RECORDS,
	QueryKeys,
	removeSpecialChar,
	SERVICES,
	User,
	UserNavList,
} from 'utilities';
import { allTransactions } from 'api';
import { useAppSelector } from 'store/hooks';
import { useAlert, useHandleError, useSearchTransaction } from 'hooks';
import Pagination from '../pagination';
import TableHeader from '../header/table-header';
import UserTransactionStat from 'components/user-wallet/transaction-statistics';
import Button from 'components/button';
import { ArrowDropDown } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

interface IParamsRef {
	user: string;
	sort: string;
	limit: number;
	skip: number;
	service?: string;
}

type Props = {
	user: User | null;
};

const ALL_SERVICES = 'ALL SERVICES';

const UserWalletSummary = ({ user }: Props) => {
	const theme = useTheme();
	const alert = useAlert();
	const handleError = useHandleError();
	const { isSearching, search, clearSearch, searchTransaction } =
		useSearchTransaction();

	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	const [selectedService, setSelectedService] = useState<string>(ALL_SERVICES);
	const [serviceAnchorEl, setServiceAnchorEl] = useState<null | HTMLElement>(
		null
	);

	const styles = useStyles(theme);

	const handleServiceClick = (e: MouseEvent<HTMLElement>) => {
		setServiceAnchorEl(serviceAnchorEl ? null : e.currentTarget);
	};

	const params = useMemo(() => {
		const data: IParamsRef = {
			user: user?.id || '',
			sort: '-createdAt',
			limit: MAX_RECORDS,
			skip: (page - 1) * MAX_RECORDS,
		};
		const regExp = new RegExp(selectedService, 'ig').test(ALL_SERVICES);
		if (selectedService && !regExp) {
			data.service = selectedService;
		}
		return data;
	}, [page, selectedService]);

	const isEnabledRequest = Boolean(
		query && UserNavList.WalletSummary === query?.tab
	);

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { token } = useAppSelector((store) => store.authState);

	const { isLoading, data, refetch } = useQuery(
		[QueryKeys.UserWalletTransaction, user?.id, page, selectedService],
		() =>
			allTransactions({
				params,
			}),
		{
			enabled: !!(token && user && isEnabledRequest),
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
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
			navigate(
				`${LINKS.Users}/${user?.id}?tab=${UserNavList.WalletSummary}&page=${page}`
			);
		} else {
			navigate(`${LINKS.Users}/${user?.id}?tab=${UserNavList.WalletSummary}`);
			setPage(1);
		}
	};

	// Select filter handler
	const handleSelectFilter = (service: string) => {
		setServiceAnchorEl(null);
		setSelectedService(service);

		refetch(); // Refetch Data
	};

	// Transaction filter
	const servicesFilter = (
		<ClickAwayListener onClickAway={() => setServiceAnchorEl(null)}>
			<Box>
				<Button
					size='small'
					sx={{
						whiteSpace: 'nowrap',
						minWidth: '160px',
						padding: '6.5px 8px',
						borderWidth: '1px',
					}}
					onClick={(e) => handleServiceClick(e)}
					variant={'outlined'}
					endIcon={<ArrowDropDown />}
				>
					{selectedService ? (
						<>
							{selectedService === SERVICES.CARD_FUNDING
								? 'Card/Bank funding'
								: `${capitalize(removeSpecialChar(selectedService))}`}
						</>
					) : (
						'Filter by Service'
					)}
				</Button>
				<Popper
					// sx={{ zIndex: theme.zIndex.tooltip }}
					open={Boolean(serviceAnchorEl)}
					anchorEl={serviceAnchorEl}
					sx={{
						zIndex: theme.zIndex.appBar - 10,
					}}
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
							maxHeight: '360px',
							height: '100%',
							overflow: 'auto',
						}}
						style={styles.list}
					>
						{Object.values({ ALL_SERVICES, ...SERVICES }).map((value) => (
							<ListItemButton
								onClick={() => handleSelectFilter(value)}
								key={value}
							>
								{value === SERVICES.CARD_FUNDING
									? 'Card/Bank Funding'
									: capitalize(removeSpecialChar(value))}
							</ListItemButton>
						))}
					</List>
				</Popper>
			</Box>
		</ClickAwayListener>
	);

	return (
		<Box>
			<Box
				sx={{
					padding: { xs: '0px 1rem', md: '0px 2rem' },
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: 'repeat(2, 1fr)',
					},
				}}
			>
				<UserAvatarWithDetails user={user} />
				<UserTransactionStat user={user} />
			</Box>
			<Box sx={{ marginTop: theme.spacing(4) }}>
				<TableHeader
					searchInputSize='small'
					sx={{
						marginBottom: '2rem',
						padding: ['0px 15px', '0px 30px'],
					}}
					title={'User Wallet Summary'}
					clearSearch={clearSearch}
					handleSearch={searchTransaction}
					placeholder={'Search transaction by reference'}
					statusFilter={servicesFilter}
				/>
				<WalletSummaryTable
					isLoading={isLoading || isSearching}
					transactions={search || (data && data.payload)}
				/>
				{!search && total > MAX_RECORDS && (
					<Box>
						<Pagination
							sx={{
								marginTop: '2rem',
								marginLeft: ['15px', '30px'],
							}}
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
		</Box>
	);
};

const useStyles = (theme: any) => ({
	button: {
		whiteSpace: 'nowrap',
		minWidth: '160px',
	},
	list: {
		border: `1px solid ${theme.palette.primary.main}`,
		borderRadius: theme.spacing(1),
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(2),
	},
});

export default UserWalletSummary;
