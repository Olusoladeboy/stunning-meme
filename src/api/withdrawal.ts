import apiRequest from "./apiRequest";
import { BillsAdmin, DataResponse, ENDPOINTS } from "../utilities";

export const withdrawalAdmin = async (): Promise<DataResponse<BillsAdmin[]>> =>
  apiRequest({
    url: `${ENDPOINTS.BillsAdmin}?type=WITHDRAWAL`,
    method: "GET",
  });
