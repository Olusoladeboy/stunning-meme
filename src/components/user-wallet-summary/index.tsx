import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import UserAvatarWithDetails from '../avatar-with-details';
import WalletSummaryTable from '../table/wallet-summary-table';
import { LINKS, MAX_RECORDS, QueryKeys, User, UserNavList } from 'utilities';
import { allTransactions } from 'api';
import { useAppSelector } from 'store/hooks';
import { useAlert, useHandleError, useSearchTransaction } from 'hooks';
import Pagination from '../pagination';
import TableHeader from '../header/table-header';
import UserTransactionStat from 'components/user-wallet/transaction-statistics';

type Props = {
	user: User | null;
};

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

	const isEnabledRequest = Boolean(
		query && UserNavList.WalletSummary === query?.tab
	);

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { token } = useAppSelector((store) => store.authState);

	const { isLoading, data } = useQuery(
		[QueryKeys.UserWalletTransaction, user?.id, page],
		() =>
			allTransactions({
				params: {
					user: user?.id,
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					// service: SERVICES.WALLET_TRANSFER,
				},
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
					sx={{
						marginBottom: '2rem',
						padding: ['0px 15px', '0px 30px'],
					}}
					title={'User Wallet Summary'}
					clearSearch={clearSearch}
					handleSearch={searchTransaction}
					placeholder={'Search transaction by  reference'}
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

export default UserWalletSummary;
