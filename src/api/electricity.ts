import apiRequest from "./apiRequest";
import { BillsAdmin, DataResponse, ENDPOINTS } from "../utilities";

export const electricityAdmin = async (): Promise<DataResponse<BillsAdmin[]>> =>
  apiRequest({
    url: `${ENDPOINTS.BillsAdmin}?type=ELECTRICITY`,
    method: "GET",
  });
