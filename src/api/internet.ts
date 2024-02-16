import apiRequest from "./apiRequest";
import { InternetProvider, DataResponse, ENDPOINTS } from "../utilities";

export const internetProviders = async (): Promise<
  DataResponse<InternetProvider[]>
> =>
  apiRequest({
    url: ENDPOINTS.InternetProviders,
    method: "GET",
  });

export const internetTransactions = async (params: {
  provider?: string;
  [key: string]: any;
}): Promise<DataResponse<InternetProvider[]>> => {
  if (params.provider) {
    return apiRequest({
      url: `${ENDPOINTS.InternetProviders}/packages`,
      method: "GET",
      params,
    });
  } else {
    return internetProviders();
  }
};
