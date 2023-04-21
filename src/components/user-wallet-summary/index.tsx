import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import UserAvatarWithDetails from '../avatar-with-details';
import UserWallet from '../user-wallet';
import WalletSummaryTable from '../table/wallet-summary-table';
import {
	LINKS,
	MAX_RECORDS,
	QueryKeys,
	Transaction,
	UserDetails,
	UserNavList,
} from '../../utilities';
import { transactions } from '../../api';
import { useAppSelector } from '../../store/hooks';
import { useAlert, useHandleError } from '../../hooks';
import Pagination from '../pagination';
import TableHeader from '../header/table-header';

type Props = {
	user: UserDetails | null;
};

const UserWalletSummary = ({ user }: Props) => {
	const theme = useTheme();
	const alert = useAlert();
	const handleError = useHandleError();

	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	/*
	 *Search State
	 */
	const [isSearching, setSearching] = useState<boolean>(false);
	const [searchTransaction, setSearchTransaction] = useState<
		null | Transaction[]
	>(null);

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { token } = useAppSelector((store) => store.authState);

	const { isLoading, data } = useQuery(
		[QueryKeys.UserWalletTransaction, user?.id, page],
		() =>
			transactions({
				params: {
					user: user?.id,
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
				},
			}),
		{
			enabled: !!(token && user),
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
				`${LINKS.User}/${user?.id}?tab=${UserNavList.WalletSummary}&page=${page}`
			);
		} else {
			navigate(`${LINKS.User}/${user?.id}?tab=${UserNavList.WalletSummary}`);
			setPage(page);
		}
	};

	/*
	 *===Handle Search===
	 *===Update Searching state===
	 *===Update search transaction state===
	 *===Display error if any===
	 */

	const handleSearch = async (value: string) => {
		const reference = value.trim();
		setSearching(true);

		try {
			const data = await transactions({
				params: {
					user: user?.id,
					reference,
				},
			});

			if (data && data.success) {
				const transaction = data.payload;
				if (Array.isArray(transaction) && transaction.length > 0) {
					setSearchTransaction(transaction);
				} else {
					alert({
						message: `Transaction with reference ${reference} not found!`,
						type: 'info',
					});
				}
			}
			setSearching(false);
		} catch (error) {
			const response = handleError({ error });
			if (response?.message)
				alert({ message: response.message, type: 'error' });

			setSearching(false);
		}
	};

	const clearSearch = () => setSearchTransaction(null);
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
				<UserWallet user={user} />
			</Box>
			<Box sx={{ marginTop: theme.spacing(4) }}>
				<TableHeader
					sx={{
						marginBottom: '2rem',
						padding: {
							xs: '0px 15px',
							md: '0px 30px',
						},
					}}
					title={'User Wallet Summary'}
					clearSearch={clearSearch}
					handleSearch={handleSearch}
					placeholder={'Search transaction by  reference'}
				/>
				<WalletSummaryTable
					isLoading={isLoading || isSearching}
					transactions={
						searchTransaction ? searchTransaction : data && data.payload
					}
				/>
				{total > MAX_RECORDS && (
					<Box>
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
		</Box>
	);
};

export default UserWalletSummary;
