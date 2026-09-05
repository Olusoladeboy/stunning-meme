import apiRequest from './apiRequest';
import { ENDPOINTS, DataResponse, Transaction } from '../utilities';
import { GenericAbortSignal } from 'axios';

export const giftCardTransactions = async (
  params: {
    [key: string]: any;
  },
  signal?: GenericAbortSignal,
): Promise<DataResponse<Transaction[]>> =>
  apiRequest({
    url: ENDPOINTS.GiftCard,
    method: 'GET',
    params,
    signal,
  });

export const updateGiftCardTransactions = async (payload: {
  data: { [key: string]: any };
  id: string;
}): Promise<DataResponse<Transaction[]>> =>
  apiRequest({
    url: `${ENDPOINTS.GiftCard}/${payload.id}`,
    method: 'PUT',
    data: payload.data,
  });

export const updateGiftCardTransactionStatus = async (payload: {
  data: {
    operation: 'SUCCESSFUL' | 'FAILED';
  };
  id: string;
}): Promise<DataResponse<Transaction[]>> =>
  apiRequest({
    url: `${ENDPOINTS.GiftCard}/operations/${payload.id}`,
    method: 'PUT',
    data: payload.data,
  });
