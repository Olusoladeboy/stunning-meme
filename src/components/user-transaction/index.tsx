import React, { useState, useEffect, MouseEvent, useMemo } from 'react';
import {
	Box,
	ClickAwayListener,
	List,
	ListItemButton,
	Popper,
	useTheme,
} from '@mui/material';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import UserAvatarWithDetails from '../avatar-with-details';
import TransactionHistoryTable from '../table/user-transaction-table';
import {
	User,
	QueryKeys,
	MAX_RECORDS,
	LINKS,
	UserNavList,
	SERVICES,
	capitalize,
	removeSpecialChar,
} from 'utilities';
import { allTransactions } from 'api';
import { useHandleError, useAlert, useSearchTransaction } from 'hooks';
import { useAppSelector } from 'store/hooks';
import Pagination from '../pagination';
import TableHeader from 'components/header/table-header';
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

const UserTransaction = ({ user }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	const [selectedService, setSelectedService] = useState<string>(ALL_SERVICES);
	const [serviceAnchorEl, setServiceAnchorEl] = useState<null | HTMLElement>(
		null
	);

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

	const styles = useStyles(theme);

	const location = useLocation();
	const query = queryString.parse(location.search);

	const { isSearching, search, clearSearch, searchTransaction } =
		useSearchTransaction();

	const isEnabledRequest = Boolean(
		query && UserNavList.Transaction === query?.tab
	);
	// const isEnabledRequest = false;

	const handleServiceClick = (e: MouseEvent<HTMLElement>) => {
		setServiceAnchorEl(serviceAnchorEl ? null : e.currentTarget);
	};

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const token = useAppSelector((store) => store.authState.token);

	const { isLoading, data, refetch } = useQuery(
		[QueryKeys.UserTransactions, user?.id, page, selectedService],
		async () =>
			await allTransactions({
				params: params,
			}),
		{
			enabled: !!(token && user && isEnabledRequest),
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						setAlert({ message: response.message, type: 'error' });
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
				`${LINKS.Users}/${user?.id}?tab=${UserNavList.Transaction}&page=${page}`
			);
		} else {
			navigate(`${LINKS.Users}/${user?.id}?tab=${UserNavList.Transaction}`);
			setPage(page);
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
			<Box sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' } }}>
				<UserAvatarWithDetails user={user} />
			</Box>
			<Box sx={{ marginTop: theme.spacing(4) }}>
				<Box
					sx={{
						padding: { xs: '0px 1rem', md: '0px 2rem' },
						width: '100%',
						marginBottom: ['10px', '30px'],
					}}
				>
					<TableHeader
						searchInputSize='small'
						title={'User Transaction Summary'}
						searchPlaceholder={'Search transaction by reference...'}
						clearSearch={clearSearch}
						handleSearch={searchTransaction}
						statusFilter={
							<Box sx={{ display: 'flex', gap: '15px' }}>{servicesFilter}</Box>
						}
					/>
				</Box>
				<TransactionHistoryTable
					isLoading={isLoading || isSearching}
					searchTransaction={searchTransaction}
					data={search ? search : data && data.payload}
					clearSearch={clearSearch}
				/>
				{!search && total > MAX_RECORDS && (
					<Pagination
						sx={{ marginLeft: '20px', marginTop: '2rem' }}
						size={'large'}
						variant={'outlined'}
						shape={'rounded'}
						page={page}
						count={count}
						onChange={(e, number) =>
							typeof handlePageChange !== 'undefined' &&
							handlePageChange(number)
						}
					/>
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

export default UserTransaction;
