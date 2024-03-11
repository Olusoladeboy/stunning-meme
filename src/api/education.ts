import apiRequest from "./apiRequest";
import { BillsAdmin, DataResponse, ENDPOINTS } from "../utilities";

export const educationAdmin = async (): Promise<DataResponse<BillsAdmin[]>> =>
  apiRequest({
    url: `${ENDPOINTS.BillsAdmin}?type=EDUCATION`,
    method: "GET",
  });
// export const educationTransactions = async (params: {
//   provider?: string;
//   [key: string]: any;
// }): Promise<DataResponse<EducationProvider[]>> => {
//   if (params.provider) {
//     return apiRequest({
//       url: `${ENDPOINTS.InternetProviders}/packages`,
//       method: "GET",
//       params,
//     });
//   } else {
//     return educationProviders();
//   }
// };
