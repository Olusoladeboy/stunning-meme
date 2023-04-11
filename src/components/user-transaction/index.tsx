import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import UserAvatarWithDetails from '../avatar-with-details';
import TransactionHistoryTable from '../table/user-transaction-table';
import {
	UserDetails,
	QueryKeys,
	MAX_RECORDS,
	LINKS,
	UserNavList,
} from '../../utilities';
import { transactions } from '../../api';
import { useHandleError, useAlert, useSearchTransaction } from '../../hooks';
import { useAppSelector } from '../../store/hooks';
import Pagination from '../pagination';

type Props = {
	user: UserDetails | null;
};

const UserTransaction = ({ user }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	const { isSearching, search, clearSearch, searchTransaction } =
		useSearchTransaction();

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { token } = useAppSelector((store) => store.authState);

	const { isLoading, data } = useQuery(
		[QueryKeys.UserTransactions, user?.id, page],
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
				`${LINKS.User}/${user?.id}?tab=${UserNavList.Transaction}&page=${page}`
			);
		} else {
			navigate(`${LINKS.User}/${user?.id}?tab=${UserNavList.Transaction}`);
			setPage(page);
		}
	};
	return (
		<Box>
			<Box sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' } }}>
				<UserAvatarWithDetails user={user} />
			</Box>
			<Box sx={{ marginTop: theme.spacing(4) }}>
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

export default UserTransaction;
