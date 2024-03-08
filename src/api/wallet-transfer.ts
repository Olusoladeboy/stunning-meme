import apiRequest from "./apiRequest";
import { BillsAdmin, DataResponse, ENDPOINTS } from "../utilities";

export const walletTransferAdmin = async (): Promise<
  DataResponse<BillsAdmin[]>
> =>
  apiRequest({
    url: `${ENDPOINTS.BillsAdmin}?type=WALLET_TRANSFER`,
    method: "GET",
  });
