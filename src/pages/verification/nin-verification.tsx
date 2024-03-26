import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { Layout, Pagination, NinVerificationTable } from 'components';
import { MAX_RECORDS, QueryKeys, LINKS, VERIFICATION_STATUS } from 'utilities';
import { useAppSelector } from 'store/hooks';
import { verifications } from 'api';
import { useSearchUser, useAlert, useHandleError, usePageTitle } from 'hooks';

const Verification = () => {
	usePageTitle('Verifications');
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

	const { search, isSearching, searchUser, clearSearch } = useSearchUser();

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQuery(
		[QueryKeys.NiNVerification, page],
		() =>
			verifications({
				sort: '-createdAt',
				limit: MAX_RECORDS,
				skip: (page - 1) * MAX_RECORDS,
				populate: 'user',
				type: 'NIN',
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

	const handlePageChange = (page: number) => {
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.NinVerification}?&page=${page}`);
		} else {
			navigate(LINKS.NinVerification);
			setPage(page);
		}
	};
	return (
		<Layout>
			<Box>
				<NinVerificationTable
					clearSearch={clearSearch}
					searchUser={searchUser}
					isLoading={isLoading || isSearching}
					verifications={(data && data.payload) || []}
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
		</Layout>
	);
};

export default Verification;
