import { ArrowDropDown } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  List,
  ListItemButton,
  Popper,
  Typography,
  useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { autoAirtimeConvertStatistics } from 'api';
import Button from 'components/button';
import DatePicker from 'components/form-components/date-picker';
import ModalWrapper from 'components/modal/Wrapper';
import { endOfDay, format, startOfDay, isSameDay } from 'date-fns';
import moment from 'moment';
import { FC, MouseEvent, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import {
  BOX_SHADOW,
  formatNumberToCurrency,
  SECOUNDARY_COLOR,
} from 'utilities';

export interface DateRange {
  end_date?: string;
  start_date?: string;
}

const NETWORKS = ['MTN', 'AIRTEL'];

const AutoConversionStatistics = () => {
  const [isDisplayPicker, setDisplayPicker] = useState<boolean>(false);

  const [selectedNetwork, setSelectedNetwork] = useState<string>(NETWORKS[0]);

  const [networkAnchorEl, setNetworkAnchorEl] = useState<null | HTMLElement>(
    null,
  );

  const theme = useTheme();
  const styles = useStyles(theme);

  const dateRange = useRef<DateRange>({
    start_date: format(startOfDay(new Date()), 'yyyy-MM-dd'),
    end_date: format(endOfDay(new Date()), 'yyyy-MM-dd'),
  });

  const renderDate = useMemo(
    () => {
      const isToday = isSameDay(
        new Date(),
        new Date(dateRange.current.start_date ?? new Date()),
      );

      if (isToday) return 'Today date';

      return `Date range: ${format(new Date(dateRange.current.start_date as any), 'd/M/yyyy')} - ${format(new Date(dateRange.current.end_date as any), 'd/M/yyyy')}`;
    },
    // eslint-disable-next-line
    [dateRange.current.start_date, dateRange.current.end_date],
  );

  const { data, refetch } = useQuery({
    queryKey: ['auto-conversion-statistic-key', dateRange.current],
    queryFn: () => autoAirtimeConvertStatistics(dateRange.current),
  });

  const networkData = useMemo(() => {
    if (data && data.payload) {
      return data.payload.find(
        (val) =>
          val.networkName.toLowerCase() === selectedNetwork.toLowerCase(),
      );
    }

    return null;
  }, [data, selectedNetwork]);

  const handleSetDateRange = (date: any) => {
    const rangeStartDate = format(date.startDate, 'yyyy-MM-dd');
    const rangeEndDate = format(date.endDate, 'yyyy-MM-dd');

    dateRange.current = {
      start_date: rangeStartDate,
      end_date: rangeEndDate,
    };

    setDisplayPicker(false);

    setTimeout(() => {
      refetch();
    }, 400);
  };

  const handleNetworkClick = (e: MouseEvent<HTMLElement>) => {
    setNetworkAnchorEl(networkAnchorEl ? null : e.currentTarget);
  };

  const handleSelectNetwork = (network: string) => {
    setNetworkAnchorEl(null);
    setSelectedNetwork(network);
  };

  const networkFilter = (
    <ClickAwayListener onClickAway={() => setNetworkAnchorEl(null)}>
      <Box>
        <Button
          size='large'
          onClick={(e) => handleNetworkClick(e)}
          variant={'outlined'}
          endIcon={<ArrowDropDown />}
        >
          {selectedNetwork ?? 'Filter by Service'}
        </Button>
        <Popper
          open={Boolean(networkAnchorEl)}
          anchorEl={networkAnchorEl}
          sx={{
            zIndex: theme.zIndex.appBar - 10,
          }}
        >
          <List
            sx={{
              '& .MuiListItemButton-root': {
                textTransform: 'capitalize',
              },
              '& .MuiListItemButton-root:hover': {
                backgroundColor: theme.palette.primary.main,
                color: grey[50],
              },
              maxHeight: '360px',
              minWidth: '200px',
              height: '100%',
              overflow: 'auto',
            }}
            style={styles.list}
          >
            {NETWORKS.map((value) => (
              <ListItemButton
                onClick={() => handleSelectNetwork(value)}
                key={value}
              >
                {value}
              </ListItemButton>
            ))}
          </List>
        </Popper>
      </Box>
    </ClickAwayListener>
  );

  return (
    <>
      {isDisplayPicker && (
        <ModalWrapper
          title={`Date Range`}
          contentWidth='700px'
          closeModal={() => setDisplayPicker(false)}
        >
          <DatePicker
            cancelPicker={() => setDisplayPicker(false)}
            onApplyChange={handleSetDateRange}
            // customButton={
            //   <Button
            //     sx={{
            //       backgroundColor: `${SECOUNDARY_COLOR} !important`,
            //       color: 'white',
            //       marginTop: '10px',
            //       minWidth: ['120px'],
            //     }}
            //     onClick={() => {
            //       setDisplayPicker(false);
            //     }}
            //   >
            //     Apply
            //   </Button>
            // }
          />
        </ModalWrapper>
      )}
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}
      >
        <Box>
          <Typography sx={{ fontWeight: '700' }}>{selectedNetwork}</Typography>
          <Typography>{renderDate}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button
            onClick={(e) => setDisplayPicker(true)}
            size='large'
            variant={'outlined'}
          >
            Filter by date range
          </Button>
          {networkFilter}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        <ListItem
          value={
            formatNumberToCurrency(networkData?.totalAmountReceived ?? 0) ?? 0
          }
          label='Total Conversions'
        />
        <ListItem
          value={networkData?.totalSuccessA2CashCount ?? 0}
          label='Successful'
        />
        <ListItem
          value={networkData?.totalFailedA2CashCount ?? 0}
          label='Failed'
        />
        <ListItem
          value={networkData?.totalPendingA2CashCount ?? 0}
          label='Pending'
        />
      </Box>
    </>
  );

  // if (data && data.payload) {
  //   return (
  //     <Box
  //       sx={{
  //         display: 'grid',
  //         gap: ['15px', '15px'],
  //         gridTemplateColumns: ['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)'],
  //       }}
  //     >
  //       {(Object.keys(data.payload) as Array<keyof typeof data.payload>).map(
  //         (dataKey) => {
  //           const value = dataKey.toLowerCase().includes('amount')
  //             ? formatNumberToCurrency(data.payload[dataKey])
  //             : data.payload[dataKey];

  //           return (
  //             <Box
  //               sx={{
  //                 border: `1px solid ${grey['300']}`,
  //                 padding: ['10px', '15px 25px'],
  //                 borderRadius: '8px',
  //               }}
  //               key={String(dataKey)}
  //             >
  //               <Typography
  //                 sx={{
  //                   textTransform: 'capitalize',
  //                 }}
  //               >
  //                 {String(dataKey).replace(/([a-z])([A-Z0-9])/g, '$1 $2')}
  //               </Typography>
  //               <Typography variant='h4'>{value}</Typography>
  //             </Box>
  //           );
  //         },
  //       )}
  //     </Box>
  //   );
};

export default AutoConversionStatistics;

interface ListItemProps {
  label: string;
  value: string | number;
}

const ListItem: FC<ListItemProps> = ({ value, label }) => {
  return (
    <Box
      sx={{
        border: `1px solid ${grey[400]}`,
        padding: '20px 15px',
        borderRadius: '8px',
      }}
    >
      <Typography>{label}</Typography>
      <Typography
        sx={{ fontWeight: '700', fontSize: '28px', color: SECOUNDARY_COLOR }}
      >
        {value}
      </Typography>
    </Box>
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
    minWidth: '160px',
  },
  list: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
  },
});
