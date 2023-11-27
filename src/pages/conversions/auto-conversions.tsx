import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQuery, useQueryClient } from 'react-query';
import {
	Layout,
	ConversionsTable,
	ConversionTotal,
	AvailableNetwork,
	Pagination,
} from 'components';
import {
	BOX_SHADOW,
	QueryKeys,
	MAX_RECORDS,
	LINKS,
	ErrorBoundary,
} from 'utilities';
import { useAppSelector } from 'store/hooks';
import {
	useAlert,
	useHandleError,
	usePageTitle,
	useSearchConversion,
} from 'hooks';
import { autoConvertAirtimes } from 'api';

const AutoConversions = () => {
	usePageTitle('Auto Conversion');
	const queryClient = useQueryClient();
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const [isReload, setReload] = useState<boolean>(false);
	const [sort, setSort] = useState('-createdAt');
	const [isReloading, setReloading] = useState<boolean>(false);
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	const location = useLocation();
	const query = queryString.parse(location.search);
	const { token, canViewStatistics } = useAppSelector(
		(store) => store.authState
	);

	const statistics = useAppSelector((store) => store.appState.statistics);

	const { isSearching, search, clearSearch, searchConversion } =
		useSearchConversion();

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
		populate: 'network,user',
	};

	const { isLoading, data, refetch } = useQuery(
		[QueryKeys.AutoConvertAirtime, page],
		() =>
			autoConvertAirtimes({
				params,
			}),
		{
			enabled: !!(token || isReload),
			keepPreviousData: true,
			onSettled: (data, error) => {
				setReload(false);
				setReloading(false);
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
		setReload(true);
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.AutoConversions}?page=${page}`);
		} else {
			navigate(LINKS.AutoConversions);
			setPage(page);
		}
	};

	const handleSort = (sort: string) => {
		if (data) {
			setSort(sort);
			refetch();
		}
	};

	return (
		<Layout>
			<Box style={styles.container}>
				<Box
					sx={{
						padding: { xs: '0px 15px', md: '0px 2rem' },
						marginBottom: '2rem',
					}}
				>
					<Typography
						sx={{ marginBottom: theme.spacing(4), fontWeight: 'bold' }}
						variant={'h5'}
					>
						Auto Conversions
					</Typography>
					{canViewStatistics && (
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: {
									xs: '1fr',
									lg: 'repeat(2, 1fr)',
								},
								gap: {
									xs: theme.spacing(3),
									lg: theme.spacing(5),
								},
							}}
						>
							<ConversionTotal
								handleRefresh={() => {
									refetch();
									setReloading(true);
									queryClient.invalidateQueries([QueryKeys.Statistics]);
								}}
								total={data && data.metadata.total}
								totalAmount={statistics?.total_auto_airtime_converted || 0}
							/>
							<AvailableNetwork type={'auto'} />
						</Box>
					)}
				</Box>
				<ErrorBoundary>
					<ConversionsTable
						isDisplaySearchField
						isLoading={isLoading || isReloading || isSearching}
						conversions={search ? search : data && data.payload}
						handleSort={handleSort}
						handleSearch={searchConversion}
						clearSearch={clearSearch}
						conversionType={'auto'}
					/>

					{!search && total > MAX_RECORDS && !isReloading && (
						<Pagination
							sx={{ marginTop: '2rem', marginLeft: ['15px', '30px'] }}
							size={'large'}
							variant={'outlined'}
							shape={'rounded'}
							page={page}
							count={count}
							onChange={(e, number) => handlePageChange(number)}
						/>
					)}
				</ErrorBoundary>
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `0.5px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
});

export default AutoConversions;
