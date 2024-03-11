import apiRequest from "./apiRequest";
import { BillsAdmin, DataResponse, ENDPOINTS } from "../utilities";

export const internetAdmin = async (): Promise<DataResponse<BillsAdmin[]>> =>
  apiRequest({
    url: `${ENDPOINTS.BillsAdmin}?type=INTERNET`,
    method: "GET",
  });

// export const internetTransactions = async (params: {
//   provider?: string;
//   [key: string]: any;
// }): Promise<DataResponse<InternetProvider[]>> => {
//   if (params.provider) {
//     return apiRequest({
//       url: `${ENDPOINTS.InternetProviders}/packages`,
//       method: "GET",
//       params,
//     });
//   } else {
//     return internetProviders();
//   }
// };
