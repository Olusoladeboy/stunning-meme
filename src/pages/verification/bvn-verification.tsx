import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import JsonFormatter from 'react-json-formatter';
import {
	Layout,
	Pagination,
	BvnVerificationTable,
	Loader,
	ModalWrapper,
} from 'components';
import {
	MAX_RECORDS,
	QueryKeys,
	LINKS,
	VERIFICATION_STATUS,
	ADMIN_ROLE,
	RouteGuard,
	EMAIL_REX,
	PHONE_REX,
} from 'utilities';
import { useAppSelector } from 'store/hooks';
import { verifications } from 'api';
import {
	useSearchUser,
	useAlert,
	useHandleError,
	usePageTitle,
	useSearchBvn,
} from 'hooks';

const BvnVerification = () => {
	usePageTitle('BVN Verifications');
	const { token } = useAppSelector((store) => store.authState);
	const handleError = useHandleError();
	const setAlert = useAlert();
	const theme = useTheme();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	const jsonStyle = {
		propertyStyle: { color: 'red' },
		stringStyle: { color: 'green' },
		numberStyle: { color: 'darkorange' },
	};

	const [jsonData, setJsonData] = useState<string>('');

	const { search, isSearching, searchUser, clearSearch } = useSearchUser();

	const { isSearchingBvn, searchBvn } = useSearchBvn((data) => {
		if (data) {
			setJsonData(JSON.stringify(data));
		}
	});

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQuery(
		[QueryKeys.BvnVerification, page],
		() =>
			verifications({
				sort: '-createdAt',
				limit: MAX_RECORDS,
				skip: (page - 1) * MAX_RECORDS,
				populate: 'user',
				type: 'BVN',
				status: VERIFICATION_STATUS.PENDING,
			}),
		{
			enabled: !!token,
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						setAlert({ message: response.message, type: 'error' });
				}
				if (data && data.success) {
					const total = data.metadata ? data.metadata.total : 0;
					setTotal(total);
					const count = Math.ceil(total / MAX_RECORDS);
					setCount(count);
				}
			},
		}
	);

	const handleSearch = (value: string) => {
		if (EMAIL_REX.test(value) || PHONE_REX.test(value)) {
			searchUser(value);
		} else if (/[0-9]{11}/.test(value)) {
			searchBvn(value);
		} else {
			return setAlert({
				message: 'Search User with email or phone or BVN',
				type: 'info',
			});
		}
	};

	const handlePageChange = (page: number) => {
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.BvnVerification}?&page=${page}`);
		} else {
			navigate(LINKS.BvnVerification);
			setPage(page);
		}
	};
	return (
		<Layout>
			{isSearchingBvn && <Loader />}
			{jsonData && (
				<ModalWrapper
					title={'View Action'}
					containerStyle={{
						zIndex: theme.zIndex.modal + 10,
					}}
					hasCloseButton={true}
					closeModal={() => setJsonData('')}
				>
					<Box
						sx={{
							overflow: 'auto',
							maxWidth: '540px',
							width: '100%',
							alignSelf: 'flex-start',
						}}
					>
						<JsonFormatter json={jsonData} tabWith={4} jsonStyle={jsonStyle} />
					</Box>
				</ModalWrapper>
			)}
			<RouteGuard roles={[ADMIN_ROLE.SUPER_ADMIN, ADMIN_ROLE.OPERATIONS]}>
				<Box>
					<BvnVerificationTable
						clearSearch={clearSearch}
						searchUser={handleSearch}
						isLoading={isLoading || isSearching}
						data={data && data.payload}
					/>
				</Box>
				{!search && total > MAX_RECORDS && (
					<Pagination
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							marginTop: theme.spacing(4),
							marginRight: '1rem',
						}}
						size={'large'}
						variant={'outlined'}
						shape={'rounded'}
						page={page}
						count={count}
						onChange={(e, number) => handlePageChange(number)}
					/>
				)}
			</RouteGuard>
		</Layout>
	);
};

export default BvnVerification;
