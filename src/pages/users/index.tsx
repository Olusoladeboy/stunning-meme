import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Layout, UsersTable, Pagination } from '../../components';
import {
	MAX_RECORDS,
	LINKS,
	QueryKeys,
	USERS_TAB,
	EMAIL_REX,
	PHONE_REX,
	User,
} from '../../utilities';
import { users } from '../../api';
import { useAlert, useHandleError } from '../../hooks';

interface SearchPayload {
	email?: string;
	phone?: string;
}

const Users = () => {
	const navigate = useNavigate();
	const alert = useAlert();
	const handleError = useHandleError();
	const [isLoad, setLoad] = useState<boolean>(false);
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);
	const [usersStatus, setUsersStatus] = useState<{ [key: string]: boolean }>(
		{} as { [key: string]: boolean }
	);
	const [currentTab, setCurrentTab] = useState(USERS_TAB.All);
	const [search, setSearch] = useState<null | User>(null);
	const [isSearching, setSearching] = useState<boolean>(false);

	useEffect(() => {
		setLoad(true);
	}, []);

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQuery(
		[QueryKeys.AllUsers],
		() =>
			users({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					populate: 'manager',
					...usersStatus,
				},
			}),
		{
			enabled: isLoad,
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
			navigate(`${LINKS.Users}?&page=${page}`);
		} else {
			navigate(LINKS.Users);
			setPage(page);
		}
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
			case USERS_TAB.Deleted:
				setUsersStatus({ deleted: true });
				break;

			default:
				setCurrentTab(USERS_TAB.All);
				setUsersStatus({});
				break;
		}
		setLoad(true);
	};

	/* 
		@Search User
	*/
	const searchUser = async (value: string) => {
		let params = {} as SearchPayload;
		if (EMAIL_REX.test(value)) params.email = value;

		if (PHONE_REX.test(value)) params.phone = value;

		if (Object.keys(params).length === 0) {
			return alert({
				message: 'Search user with email or phone',
				type: 'info',
			});
		}
		setSearching(true);

		try {
			const data = await users({ params });
			setSearching(false);
			if (data && Array.isArray(data.payload)) {
				if (data.payload.length === 0) {
					return alert({ message: 'User not found', type: 'success' });
				}

				setSearch(data.payload);
			}
		} catch (error) {
			setSearching(false);

			const response = handleError({ error });
			if (response?.message)
				alert({ message: response.message, type: 'error' });
		}
	};

	return (
		<Layout>
			<UsersTable
				changeUserType={switchUserType}
				isLoading={isLoading || isSearching}
				users={search ? search : data && data.payload}
				currentTab={currentTab}
				searchUser={searchUser}
				clearSearch={() => setSearch(null)}
				isDisplayTab={!search}
			/>
			{total > MAX_RECORDS && (
				<Box sx={{}}>
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
