import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import Layout from '../../components/layout';
import { BOX_SHADOW } from '../../utilities/constant';
import ConversionsTable from '../../components/table/conversions-table';
import ConversionTotal from '../../components/conversion-total';
import AvailableNetwork from '../../components/available-network';
import Api from '../../utilities/api';
import handleResponse from '../../utilities/helpers/handleResponse';
import { QueryKeyTypes } from '../../utilities/types';
import { useAppSelector } from '../../store/hooks';
import { MAX_RECORDS } from '../../utilities/constant';
import Pagination from '../../components/pagination';
import LINKS from '../../utilities/links';

const Conversions = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { enqueueSnackbar } = useSnackbar();
	const [isReload, setReload] = useState<boolean>(false);
	const [sort, setSort] = useState('-createdAt');
	const [isReloading, setReloading] = useState<boolean>(false);
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const [search, setSearch] = useState('');
	const location = useLocation();
	const query = queryString.parse(location.search);
	const { token } = useAppSelector((store) => store.authState);

	useEffect(() => {
		if (search.length === 0) {
		}
	});

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	useEffect(() => {
		setReload(true);
	}, []);

	const params = {
		limit: MAX_RECORDS,
		skip: (page - 1) * MAX_RECORDS,
		sort,
	};

	const { isLoading, data } = useQuery(
		[QueryKeyTypes.ConvertAirtime, page],
		() =>
			Api.ConvertAirtime.Records({
				token: token as string,
				params: search ? { ...params, q: search } : params,
			}),
		{
			enabled: !!(token && isReload),
			keepPreviousData: true,
			onSettled: (data, error) => {
				setReload(false);
				setReloading(false);
				if (error) {
					const res = handleResponse({ error });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
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
		setReload(true);
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.Conversions}?page=${page}`);
		} else {
			navigate(LINKS.Conversions);
			setPage(page);
		}
	};

	const handleSort = (sort: string) => {
		if (data) {
			setSort(sort);
			setReload(true);
		}
	};

	const handleSearch = (search: string) => {
		setSearch(search);
		setReload(true);
	};

	return (
		<Layout>
			<Box style={styles.container}>
				<Box sx={{ padding: '0px 2rem' }}>
					<Typography sx={{ marginBottom: theme.spacing(2) }} variant={'h5'}>
						Conversions
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								md: 'repeat(2, 1fr)',
							},
							gap: theme.spacing(5),
						}}
					>
						<ConversionTotal
							handleRefresh={() => {
								setSearch('');
								setReload(true);
								setReloading(true);
							}}
							total={data && data.metadata.total}
						/>
						<AvailableNetwork />
					</Box>
				</Box>
				<ConversionsTable
					isLoading={isLoading || isReloading}
					conversions={data && data.payload}
					handleSort={handleSort}
					handleSearch={handleSearch}
				/>

				{total > MAX_RECORDS && !isReloading && (
					<Pagination
						sx={{ marginLeft: '20px' }}
						size={'large'}
						variant={'outlined'}
						shape={'rounded'}
						page={page}
						count={count}
						onChange={(e, number) => handlePageChange(number)}
					/>
				)}
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'grid',
		gridTemplateColumn: '1fr',
		gap: theme.spacing(4),
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
});

export default Conversions;
