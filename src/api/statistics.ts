import apiRequest from './apiRequest';
import {
  DataResponse,
  ENDPOINTS,
  IAutoConvertAirtimeStatistics,
  IDataSubscriptionStatistic,
} from '../utilities';

export const statistic = async (): Promise<any> =>
  apiRequest({
    method: 'GET',
    url: `${ENDPOINTS.Staff}/dashboard`,
  });

export const autoAirtimeConvertStatistics = async (params?: {
  [key: string]: any;
}): Promise<DataResponse<IAutoConvertAirtimeStatistics[]>> =>
  apiRequest({
    method: 'GET',
    url: `${ENDPOINTS.AutoConvertAirtime}/stats`,
    params,
  });

export const dataSubscriptionsStatistics = async (params?: {
  [key: string]: any;
}): Promise<
  DataResponse<IDataSubscriptionStatistic | IDataSubscriptionStatistic[]>
> =>
  apiRequest({
    method: 'GET',
    url: ENDPOINTS.DataSubscriptionStat,
    params,
  });
