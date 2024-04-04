import React, { useState } from "react";
import { Table, TableBody, TableHead, useTheme } from "@mui/material";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { AuditFilter, AuditLog } from "utilities";
import {
  StyledTableCell as TableCell,
  StyledTableRow as TableRow,
} from "./components";
import Empty from "../empty";
import CustomTableCell from "./components/custom-table-cell";
import TableLoader from "../loader/table-loader";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  data: AuditLog[] | undefined | null;
  isLoading: boolean;
  auditFilter?: AuditFilter;
}

type ModalContent = {
  username: string;
  email: string | undefined;
  role: string | undefined;
  IP: string | undefined;
};

const AuditLogsTable: React.FC<Props> = ({ data, isLoading, auditFilter }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    username: "",
    email: "",
    role: "",
    IP: "",
  });

  const handleOpenModal = (row: AuditLog) => {
    if (typeof row.staff === "object") {
      setModalContent({
        username: `${row.staff.firstname} ${row.staff.lastname}`,
        email: row.staff.email,
        role: row.staff.role,
        IP: row.staff.currentIp,
      });
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const applyAuditFilter = (data: AuditLog[]) => {
    if (auditFilter) {
      return data.filter(
        (datum) =>
          datum.staff &&
          typeof datum.staff === "object" &&
          `${datum.staff.firstname} ${datum.staff.lastname}`.includes(
            auditFilter.user
          ) &&
          datum.details.includes(auditFilter.action) &&
          moment.utc(datum.createdAt).format("l").includes(auditFilter.date)
      );
    } else {
      return data;
    }
  };

  return (
    <>
      <Table sx={{ overflow: "auto" }}>
        <TableHead
          sx={{
            "& tr": {
              backgroundColor: `${grey[50]} !important`,
              color: theme.palette.primary.main,
            },
          }}
        >
          <TableRow>
            <CustomTableCell label={"Name"} />
            <CustomTableCell label={"Email"} />
            <CustomTableCell label={"Module"} />
            <CustomTableCell label={"Action"} />
            <CustomTableCell label={"Details"} />
            <CustomTableCell label={"Date"} />
            <CustomTableCell label={"Time"} />
            <CustomTableCell label={""} />
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            overflow: "auto",
            "& tr": {
              color: theme.palette.primary.main,
            },
          }}
        >
          {isLoading ? (
            <TableLoader colSpan={7} />
          ) : (
            data && (
              <>
                {data.length > 0 ? (
                  applyAuditFilter(data).map((row: AuditLog) => (
                    <TableRow key={row.id} onClick={() => handleOpenModal(row)}>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.staff &&
                          typeof row.staff === "object" &&
                          `${row.staff.firstname} ${row.staff.lastname}`}
                      </TableCell>
                      <TableCell>
                        {row.staff &&
                          typeof row.staff === "object" &&
                          row.staff.email}
                      </TableCell>
                      <TableCell>{row.module}</TableCell>
                      <TableCell>{row.action}</TableCell>
                      <TableCell>{row.details}</TableCell>
                      <TableCell>
                        {moment.utc(row.createdAt).format("l")}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {moment.utc(row.createdAt).format("LT")}
                      </TableCell>
                      <TableCell>
                        <ChevronRightIcon
                          sx={{
                            marginTop: "0.2em",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Empty text={"No audit log(s)"} />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )
          )}
        </TableBody>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "bold",
                marginBottom: "1.5em",
              }}
            >
              Activity Details
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.5em",
                marginBottom: "2.5em",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "0.3em !important",
                  }}
                >
                  User
                </Typography>
                <Typography>{modalContent.username}</Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "0.3em !important",
                  }}
                >
                  Email address
                </Typography>
                <Typography>{modalContent.email}</Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "0.3em !important",
                  }}
                >
                  Role
                </Typography>
                <Typography>{modalContent.role}</Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "0.3em !important",
                  }}
                >
                  IP address
                </Typography>
                <Typography>{modalContent.IP}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "2em",
              }}
            >
              <Button
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.background.paper,
                  "&:hover": {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                View action
              </Button>
              <Button
                sx={{
                  border: "1px solid",
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    color: theme.palette.background.paper,
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </Table>
    </>
  );
};

// const useStyles = (theme: any) => ({
// 	container: {
// 		display: 'grid',
// 		gridTemplateColumn: '1fr',
// 		gap: theme.spacing(4),
// 		border: `1px solid ${theme.palette.secondary.main}`,
// 		padding: '1.5rem 0px',
// 		backgroundColor: grey[50],
// 		borderRadius: theme.spacing(2),
// 		boxShadow: BOX_SHADOW,
// 	},
// 	filterWrapper: {
// 		display: 'flex',
// 		gap: '10px',
// 		alignItems: 'center',
// 	},
// 	tableHeader: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 		gap: theme.spacing(3),
// 	},
// 	suspendBtn: {
// 		paddingLeft: theme.spacing(3),
// 		paddingRight: theme.spacing(3),
// 		textTransform: 'uppercase',
// 		border: `1px solid ${SUCCESS_COLOR}`,
// 		color: SUCCESS_COLOR,
// 		// fontWeight: '600',
// 	},
// });

export default AuditLogsTable;
