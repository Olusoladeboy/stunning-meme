import apiRequest from './apiRequest';
import { ENDPOINTS, DataResponse, Transaction } from '../utilities';
import { GenericAbortSignal } from 'axios';

export const eSimTransactions = async (
  params: {
    [key: string]: any;
  },
  signal?: GenericAbortSignal,
): Promise<DataResponse<Transaction[]>> =>
  apiRequest({
    url: ENDPOINTS.ESim,
    method: 'GET',
    params,
    signal,
  });

export const updateESimTransactions = async (payload: {
  data: { [key: string]: any };
  id: string;
}): Promise<DataResponse<any>> =>
  apiRequest({
    url: `${ENDPOINTS.ESim}/${payload.id}`,
    method: 'PUT',
    data: payload.data,
  });

export const sendESiNotifications = async (data: {
  reference: string;
}): Promise<DataResponse<any>> =>
  apiRequest({
    url: `${ENDPOINTS.ESim}/send-pin-notification`,
    method: 'POST',
    data,
  });
