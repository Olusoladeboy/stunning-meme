import apiRequest from "./apiRequest";
import { EducationProvider, DataResponse, ENDPOINTS } from "../utilities";

export const educationProviders = async (): Promise<
  DataResponse<EducationProvider[]>
> =>
  apiRequest({
    url: ENDPOINTS.EducationProviders,
    method: "GET",
  });

export const educationTransactions = async (params: {
  provider?: string;
  [key: string]: any;
}): Promise<DataResponse<EducationProvider[]>> => {
  if (params.provider) {
    return apiRequest({
      url: `${ENDPOINTS.InternetProviders}/packages`,
      method: "GET",
      params,
    });
  } else {
    return educationProviders();
  }
};
