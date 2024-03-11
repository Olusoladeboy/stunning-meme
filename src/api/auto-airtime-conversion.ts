import apiRequest from "./apiRequest";
import { BillsAdmin, DataResponse, ENDPOINTS } from "../utilities";

export const autoAirtimeConversionAdmin = async (): Promise<
  DataResponse<BillsAdmin[]>
> =>
  apiRequest({
    url: `${ENDPOINTS.BillsAdmin}?type=AIRTIME_AUTO_CONVERSION`,
    method: "GET",
  });
