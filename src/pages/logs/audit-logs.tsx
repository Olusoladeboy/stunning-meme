import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { Box } from "@mui/material";
import queryString from "query-string";
import { Layout, AuditLogsTable, TableHeader, Pagination } from "components";
import { useAlert, useHandleError, usePageTitle } from "hooks";
import {
  ADMIN_ROLE,
  AuditFilter,
  LINKS,
  MAX_RECORDS,
  QueryKeys,
  RouteGuard,
} from "utilities";
import { auditLogs } from "api";

const AuditLogs = () => {
  usePageTitle("Audit logs");
  const handleError = useHandleError();
  const [isEnableQuery, setEnableQuery] = useState<boolean>(false);
  const alert = useAlert();
  const navigate = useNavigate();

  const { search } = useLocation();
  const parseQuery = queryString.parseUrl(search).query;

  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const [auditFilter, setAuditFilter] = useState<AuditFilter>({
    user: "",
    action: "",
    date: "",
  });

  useEffect(() => {
    const page = Number(parseQuery?.page || 1);
    setPage(page);
  }, [parseQuery, parseQuery?.page]);

  useEffect(() => {
    setEnableQuery(true);

    // if (query && query.page) {
    // 	setPage(parseInt(query.page as string));
    // }
  }, []);

  // Audit logs
  const { isLoading, data } = useQuery(
    [QueryKeys.AuditLogs, page],
    () =>
      auditLogs({
        sort: "-createdAt",
        limit: MAX_RECORDS,
        skip: (page - 1) * MAX_RECORDS,
        populate: "staff",
      }),
    {
      enabled: isEnableQuery,
      refetchOnWindowFocus: false,
      onSettled: (data: any, error) => {
        setEnableQuery(false);
        if (error) {
          const response = handleError({ error });
          if (response?.message) {
            alert({ message: response.message, type: "error" });
          }
        }
        if (data && data.success) {
          const total = data.metadata.total;
          setTotal(data.metadata.total);
          const count = Math.ceil(total / MAX_RECORDS);
          setCount(count);
        }
      },
    }
  );

  const handlePageChange = (page: number) => {
    if (page !== 1) {
      setPage(page);
      navigate(`${LINKS.AuditLogs}?page=${page}`);
    } else {
      navigate(`${LINKS.AuditLogs}`);
    }
    setPage(page);
    setEnableQuery(true);
  };

  const handleAuditFilter = (criteria: AuditFilter) => {
    setAuditFilter(criteria);
  };

  return (
    <Layout>
      <RouteGuard roles={[ADMIN_ROLE.SUPER_ADMIN]}>
        <TableHeader
          sx={{ marginBottom: "2rem", marginTop: "20px" }}
          title={"Audit Logs"}
          canFilter
          auditData={data && data.payload}
          handleAuditFilter={handleAuditFilter}
        />

        <AuditLogsTable isLoading={isLoading} data={data && data.payload} auditFilter={auditFilter} />

        {total > MAX_RECORDS && (
          <Box
            sx={{
              marginLeft: ["15px", "30px"],
              marginTop: ["30px"],
            }}
          >
            <Pagination
              sx={{}}
              size={"large"}
              variant={"outlined"}
              shape={"rounded"}
              page={page}
              count={count}
              onChange={(e, number) => handlePageChange(number)}
            />
          </Box>
        )}
      </RouteGuard>
    </Layout>
  );
};

export default AuditLogs;
