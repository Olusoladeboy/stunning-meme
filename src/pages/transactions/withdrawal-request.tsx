import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  CSSProperties,
} from 'react';
import queryString from 'query-string';
import { Box, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import {
  Button,
  Layout,
  ModalWrapper,
  TableHeader,
  TablePagination,
  WithdrawalTransactionsTable,
} from 'components';
import {
  BOX_SHADOW,
  MAX_RECORDS,
  LINKS,
  RouteGuard,
  ADMIN_ROLE,
  SECOUNDARY_COLOR,
} from 'utilities';
import { walletWithdrawal } from 'api';
import {
  useHandleError,
  useAlert,
  useSearchTransaction,
  usePageTitle,
} from 'hooks';
import DatePicker from 'components/form-components/date-picker';
import moment from 'moment';

const WithdrawalRequestTransactions = () => {
  usePageTitle('Withdrawal Request');
  const theme = useTheme();
  const handleError = useHandleError();
  const styles = useStyles(theme);
  const [isDisplayPicker, setDisplayPicker] = useState<boolean>(false);
  const alert = useAlert();
  const navigate = useNavigate();
  // const [count, setCount] = useState<number>(1);
  const location = useLocation();
  const query = queryString.parse(location.search);
  const [page, setPage] = useState<number>(Number(query?.page) || 1);
  const [total, setTotal] = useState<number>(0);
  const maxRecordRef = useRef<number>(MAX_RECORDS);
  const [dateRange, setDateRange] = useState<{ [key: string]: string }>({});

  const startDate = useRef<string>('');
  const endDate = useRef<string>('');

  const { isSearching, searchTransaction, clearSearch, search } =
    useSearchTransaction();

  useEffect(
    () => {
      if (query && query.page) {
        setPage(parseInt(query.page as string));
      }
    },
    // eslint-disable-next-line
    [query],
  );

  const { isLoading, data, refetch } = useQuery(
    ['Withdrawal', query.page, dateRange],
    () =>
      walletWithdrawal({
        sort: '-createdAt',
        limit: maxRecordRef.current,
        skip: (page - 1) * maxRecordRef.current,
        populate: 'user',
        status: 'PENDING',
        canRequery: false,
        ...(Object.values(dateRange).length > 0 && dateRange),
      }),
    {
      retry: 2,
      refetchOnWindowFocus: false,
      onSettled: (data: any, error) => {
        if (error) {
          const response = handleError({ error });
          if (response?.message) {
            alert({ message: response.message, type: 'error' });
          }
        }
        if (data && data.success) {
          const total = data.metadata.total;
          setTotal(total);
          // const count = Math.ceil(total / maxRecordRef.current);
          // setCount(count);
        }
      },
    },
  );

  const handlePageChange = (page: number) => {
    if (page !== 1) {
      setPage(page);
      navigate(`${LINKS.WithdrawalRequestTransactions}?page=${page}`);
    } else {
      navigate(LINKS.WithdrawalRequestTransactions);
      setPage(page);
    }
    refetch();
  };

  const handleChangeRowsPerPage = (value: number) => {
    maxRecordRef.current = value;
    refetch();
  };

  const handleSetDateRange = (dateRange: any) => {
    // Clear state
    startDate.current = '';
    endDate.current = '';

    const rangeStartDate = moment(dateRange.startDate).format('YYYY-MM-DD');
    const rangeEndDate = moment(dateRange.endDate).format('YYYY-MM-DD');

    if (rangeStartDate === rangeEndDate) {
      startDate.current = rangeStartDate;
    } else {
      startDate.current = rangeStartDate;
      endDate.current = rangeEndDate;
    }
  };

  const onApplyDateFilter = useCallback(
    () => {
      let dateRange = '';

      if (startDate.current) {
        dateRange += `createdAt>=${startDate.current}`;
      }
      if (endDate.current) {
        dateRange += `&createdAt<=${endDate.current}`;
      }

      const searchParams = new URLSearchParams(dateRange);
      setDateRange(Object.fromEntries(searchParams));
      setTimeout(() => {
        refetch();
      }, 500);
    },
    // eslint-disable-next-line
    [startDate.current, endDate.current],
  );

  return (
    <Layout>
      {isDisplayPicker && (
        <ModalWrapper
          title={`Filter  Transaction`}
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
      <RouteGuard roles={[ADMIN_ROLE.SUPER_ADMIN]}>
        <Box style={styles.container}>
          <Box
            sx={{
              padding: { xs: '0px 15px', md: '0px 2rem' },
              display: 'grid',
              gap: '2rem',
            }}
          >
            <TableHeader
              searchPlaceholder={'Search transaction by reference'}
              title={'Withdrawal  Request'}
              handleSearch={(value) => searchTransaction({ value })}
              clearSearch={clearSearch}
              statusFilter={
                <Box sx={{ display: 'flex', gap: '15px' }}>
                  <Button
                    size='large'
                    style={styles.button as CSSProperties}
                    onClick={(e) => setDisplayPicker(true)}
                    variant={'outlined'}
                  >
                    Filter by date range
                  </Button>
                  {data?.payload?.length > 0 && (
                    <Button
                      size='large'
                      style={styles.button as CSSProperties}
                      onClick={(e) => setDisplayPicker(true)}
                      variant={'outlined'}
                    >
                      Filter by date range
                    </Button>
                  )}
                </Box>
              }
            />
          </Box>

          <WithdrawalTransactionsTable
            isWithdrawalRequest
            hasActionButton
            isLoading={isLoading || isSearching}
            data={search && search.length > 0 ? search : data && data.payload}
          />

          {!Boolean(search && search.length > 0) &&
            !isSearching &&
            !isLoading &&
            total > maxRecordRef.current && (
              <Box style={styles.paginationWrapper}>
                <TablePagination
                  page={page - 1}
                  count={Number(total)}
                  onPageChange={(value) => handlePageChange(value + 1)}
                  rowsPerPage={maxRecordRef.current}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Box>
            )}
        </Box>
      </RouteGuard>
    </Layout>
  );
};

const useStyles = (theme: any) => ({
  container: {
    display: 'grid',
    gridTemplateColumn: '1fr',
    gap: theme.spacing(4),
    border: `0.5px solid ${theme.palette.secondary.main}`,
    padding: '1.5rem 0px',
    backgroundColor: grey[50],
    borderRadius: theme.spacing(2),
    boxShadow: BOX_SHADOW,
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
  button: {
    whiteSpace: 'nowrap',
  },
  list: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
  },
});

export default WithdrawalRequestTransactions;
