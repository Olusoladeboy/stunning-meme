import apiRequest from "./apiRequest";
import { BillsAdmin, DataResponse, ENDPOINTS } from "../utilities";

export const reversalAdmin = async (): Promise<DataResponse<BillsAdmin[]>> =>
  apiRequest({
    url: `${ENDPOINTS.BillsAdmin}?type=REVERSAL`,
    method: "GET",
  });
