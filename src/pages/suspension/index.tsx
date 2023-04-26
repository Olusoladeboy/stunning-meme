import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { Layout, Pagination, SuspensionTable } from '../../components';
import { useAppSelector } from '../../store/hooks';
import { MAX_RECORDS, QueryKeys, LINKS } from '../../utilities';
import { useAlert, useHandleError } from '../../hooks';
import { users } from '../../api';

const Suspension = () => {
	const handleError = useHandleError();
	const { token } = useAppSelector((store) => store.authState);
	const setAlert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { isLoading, data } = useQuery(
		[QueryKeys.SuspendUser, 'suspension'],
		() =>
			users({
				params: {
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					suspended: true,
				},
			}),
		{
			enabled: !!token,
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
			navigate(`${LINKS.Suspension}?&page=${page}`);
		} else {
			navigate(LINKS.Suspension);
			setPage(page);
		}
	};

	return (
		<Layout>
			<SuspensionTable isLoading={isLoading} users={data && data.payload} />
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

export default Suspension;
