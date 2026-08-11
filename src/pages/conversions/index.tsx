import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Button,
  ModalWrapper,
} from 'components';
import {
  BOX_SHADOW,
  QueryKeys,
  MAX_RECORDS,
  LINKS,
  ErrorBoundary,
  DateRange,
  SECOUNDARY_COLOR,
} from 'utilities';
import { useAppSelector } from 'store/hooks';
import {
  useAlert,
  useHandleError,
  usePageTitle,
  useSearchConversion,
} from 'hooks';
import { convertAirtimes } from 'api';
import DatePicker from 'components/form-components/date-picker';
import moment from 'moment';

const Conversions = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  usePageTitle('Conversions');
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

  const [isDisplayPicker, setDisplayPicker] = useState<boolean>(false);

  const dateRange = useRef<DateRange>();

  const location = useLocation();
  const query = queryString.parse(location.search);
  const authState = useAppSelector((store) => store.authState);

  const token = authState.token;
  const canViewStatistics = authState.canViewStatistics;

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
    ...(dateRange.current ? dateRange.current : {}),
  };

  const { isLoading, data, refetch } = useQuery(
    [
      QueryKeys.ConvertAirtime,
      page,
      ...(dateRange.current ? Object.values(dateRange.current) : []),
    ],
    () => convertAirtimes(params),
    {
      enabled: !!(token || isReload),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
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
    },
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

  const handleSetDateRange = (date: any) => {
    const rangeStartDate = moment(date.startDate).format('YYYY-MM-DD');
    const rangeEndDate = moment(date.endDate).format('YYYY-MM-DD');

    if (rangeStartDate === rangeEndDate) {
      dateRange.current = { 'createdAt>': rangeStartDate };
    } else {
      dateRange.current = {
        'createdAt>': rangeStartDate,
        'createdAt<': rangeEndDate,
      };
    }
  };

  const onApplyDateFilter = useCallback(
    () => {
      setTimeout(() => {
        refetch();
      }, 500);
    },
    // eslint-disable-next-line
    [dateRange.current],
  );

  return (
    <Layout>
      {isDisplayPicker && (
        <ModalWrapper
          title={`Filter Transaction`}
          contentWidth='700px'
          closeModal={() => setDisplayPicker(false)}
        >
          <DatePicker
            cancelPicker={() => setDisplayPicker(false)}
            setDateRange={handleSetDateRange}
            customButton={
              <Button
                sx={{
                  backgroundColor: `${SECOUNDARY_COLOR} !important`,
                  color: 'white',
                  marginTop: '10px',
                  minWidth: ['120px'],
                }}
                onClick={() => {
                  setDisplayPicker(false);
                  onApplyDateFilter();
                }}
              >
                Apply
              </Button>
            }
          />
        </ModalWrapper>
      )}
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
            Conversions
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
                  // setReload(true);
                  setReloading(true);
                  refetch();
                  queryClient.invalidateQueries([QueryKeys.Statistics]);
                }}
                total={data && data.metadata.total}
                totalAmount={statistics?.total_airtime_converted || 0}
              />
              <AvailableNetwork />
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
            isDisplayApprovedDeclinedButton
            dateFilter={
              <Box sx={{ display: 'flex', gap: '15px' }}>
                <Button
                  size='large'
                  // style={styles.button as CSSProperties}
                  onClick={(e) => setDisplayPicker(true)}
                  variant={'outlined'}
                >
                  Filter by date range
                </Button>
              </Box>
            }
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

export default Conversions;
