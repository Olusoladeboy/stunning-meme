import apiRequest from "./apiRequest";
import {
  AuditLog,
  BillsAdmin,
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

export const cableAdmin = async (): Promise<DataResponse<BillsAdmin[]>> =>
  apiRequest({
    url: `${ENDPOINTS.BillsAdmin}?type=CABLE`,
    method: "GET",
  });

// export const cableTransactions = async (params: {
//   provider?: string;
//   [key: string]: any;
// }): Promise<DataResponse<BillsAdmin[]>> => {
//   if (params.provider) {
//     return apiRequest({
//       url: `${ENDPOINTS.BillsAdmin}/packages`,
//       method: "GET",
//       params,
//     });
//   } else {
//     return cableProviders();
//   }
// };
