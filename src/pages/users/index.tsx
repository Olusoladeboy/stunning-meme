import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Layout, UsersTable, Pagination } from 'components';
import { MAX_RECORDS, LINKS, QueryKeys, USERS_TAB } from 'utilities';
import { users } from 'api';
import { useAlert, useHandleError, usePageTitle, useSearchUser } from 'hooks';

const Users = () => {
	usePageTitle('Users');
	const navigate = useNavigate();
	const alert = useAlert();
	const handleError = useHandleError();
	const [isLoad, setLoad] = useState<boolean>(false);
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const searchDeletedUser = React.useRef<boolean>(false);
	const location = useLocation();
	const query = queryString.parse(location.search);
	const [usersStatus, setUsersStatus] = useState<{ [key: string]: boolean }>(
		{} as { [key: string]: boolean }
	);
	const [currentTab, setCurrentTab] = useState(USERS_TAB.All);
	const { isSearching, search, clearSearch, searchUser } = useSearchUser();

	useEffect(() => {
		setLoad(true);
	}, []);

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data, refetch } = useQuery(
		[QueryKeys.Users, page, currentTab],
		() =>
			users({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					// limit: 10,
					skip: (page - 1) * MAX_RECORDS,
					populate: 'manager',
					...usersStatus,
				},
			}),
		{
			// enabled: isLoad,
			onSettled: (data, error) => {
				setLoad(false);
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
			navigate(`${LINKS.Users}?page=${page}`);
		} else {
			navigate(LINKS.Users);
			setPage(page);
		}
		refetch();
	};

	const switchUserType = (type?: string) => {
		switch (type) {
			case USERS_TAB.Verified:
				setCurrentTab(USERS_TAB.Verified);
				setUsersStatus({ verified: true });
				break;

			case USERS_TAB.Unverified:
				setCurrentTab(USERS_TAB.Unverified);
				setUsersStatus({ verified: false });
				break;
			case USERS_TAB.Suspended:
				setCurrentTab(USERS_TAB.Suspended);
				setUsersStatus({ suspended: true });
				break;
			case USERS_TAB.Deactivated:
				setCurrentTab(USERS_TAB.Deactivated);
				setUsersStatus({ isActive: false });
				break;
			case USERS_TAB.Deleted:
				setUsersStatus({ deleted: true });
				setCurrentTab(USERS_TAB.Deleted);

				break;

			default:
				setCurrentTab(USERS_TAB.All);
				setUsersStatus({});
				break;
		}
		setLoad(true);
	};

	const handleChangeSearchDeletedUser = (state: boolean) =>
		(searchDeletedUser.current = state);

	const handleSearch = (value: string) => {
		searchUser(value, searchDeletedUser.current);
	};

	return (
		<Layout>
			<UsersTable
				changeUserType={switchUserType}
				isLoading={isLoading || isSearching}
				users={search ? search : data && data.payload}
				currentTab={currentTab}
				searchUser={handleSearch}
				clearSearch={clearSearch}
				isDisplayTab={!search}
				changeSearchDeletedUser={handleChangeSearchDeletedUser}
			/>
			{!search && total > MAX_RECORDS && (
				<Box
					sx={{
						marginTop: '20px',
					}}
				>
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
		</Layout>
	);
};

export default Users;
