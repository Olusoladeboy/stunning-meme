import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Box, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQuery } from 'react-query';
import {
	Layout,
	ConversionsTable,
	ConversionsTab,
	Pagination,
	TableHeader,
} from 'components';
import {
	BOX_SHADOW,
	QueryKeys,
	MAX_RECORDS,
	LINKS,
	ErrorBoundary,
	CONVERSIONS_TAB,
} from 'utilities';
import { useAlert, useHandleError, useSearchConversion } from 'hooks';
import { convertAirtimes } from 'api';

const AllConversions = () => {
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const [sort, setSort] = useState('-createdAt');
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	const location = useLocation();
	const query = queryString.parse(location.search);

	const [isLoad, setLoad] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState(CONVERSIONS_TAB.ALL);
	const [conversionStatus, setConversionStatus] = useState<{
		[key: string]: string;
	}>({} as { [key: string]: string });

	const { isSearching, search, clearSearch, searchConversion } =
		useSearchConversion();

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	useEffect(() => {
		setLoad(true);
	}, []);

	const { isLoading, data } = useQuery(
		[QueryKeys.ConvertAirtime, page],
		() =>
			convertAirtimes({
				params: {
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
					sort,
					...conversionStatus,
				},
			}),
		{
			enabled: isLoad,
			keepPreviousData: true,
			onSettled: (data, error) => {
				setLoad(false);

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
		setLoad(true);
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
			setLoad(true);
		}
	};

	const switchUserType = (type?: string) => {
		switch (type) {
			case CONVERSIONS_TAB.ALL:
				setCurrentTab(CONVERSIONS_TAB.ALL);
				setConversionStatus({});
				break;

			case CONVERSIONS_TAB.APPROVED:
				setCurrentTab(CONVERSIONS_TAB.APPROVED);
				setConversionStatus({ status: CONVERSIONS_TAB.APPROVED });
				break;
			case CONVERSIONS_TAB.PENDING:
				setCurrentTab(CONVERSIONS_TAB.PENDING);
				setConversionStatus({ status: CONVERSIONS_TAB.PENDING });
				break;
			case CONVERSIONS_TAB.DECLINED:
				setCurrentTab(CONVERSIONS_TAB.DECLINED);
				setConversionStatus({ status: CONVERSIONS_TAB.DECLINED });
				break;

			default:
				setCurrentTab(CONVERSIONS_TAB.ALL);
				setConversionStatus({});
				break;
		}
		setLoad(true);
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
					<TableHeader
						sx={{ marginBottom: '2rem' }}
						title={'All Conversions'}
						searchPlaceholder={'Search Conversions by phone'}
						handleSearch={searchConversion}
						clearSearch={clearSearch}
					/>
					<ConversionsTab
						currentTab={currentTab}
						changeCurrentTab={switchUserType}
					/>
				</Box>
				<ErrorBoundary>
					<ConversionsTable
						isLoading={isLoading || isSearching}
						conversions={search ? search : data && data.payload}
						handleSort={handleSort}
						handleSearch={searchConversion}
						clearSearch={clearSearch}
					/>

					{!search && total > MAX_RECORDS && (
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
				</ErrorBoundary>
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
});

export default AllConversions;
