import apiRequest from "./apiRequest";
import {
  AuditLog,
  CableProvider,
  DataResponse,
  ENDPOINTS,
  Provider,
} from "../utilities";

export const cables = async (params?: {
  [key: string]: any;
}): Promise<DataResponse<Provider[]>> =>
  apiRequest({
    method: "GET",
    url: ENDPOINTS.AuditLogs,
    params,
  });

export const cableProviders = async (): Promise<
  DataResponse<CableProvider[]>
> =>
  apiRequest({
    url: ENDPOINTS.CableProviders,
    method: "GET",
  });

export const cableTransactions = async (params: {
  provider?: string;
  [key: string]: any;
}): Promise<DataResponse<CableProvider[]>> => {
  if (params.provider) {
    return apiRequest({
      url: `${ENDPOINTS.CableProviders}/packages`,
      method: "GET",
      params,
    });
  } else {
    return cableProviders();
  }
};
