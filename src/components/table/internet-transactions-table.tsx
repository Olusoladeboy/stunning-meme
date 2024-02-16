import {
  TableBody,
  TableHead,
  Table,
  useTheme,
  Box,
  styled,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./components";
import { InternetPackage, InternetProvider } from "utilities";
import Empty from "../empty/table-empty";
import CustomTableCell from "./components/custom-table-cell";

type Props = {
  data: InternetProvider[] | InternetPackage[];
};

const InternetTransactionsTable = ({ data }: Props) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Container>
      <Box sx={{ overflow: "auto" }}>
        <Table sx={{ overflow: "auto" }}>
          <TableHead
            sx={{
              "& tr": {
                color: theme.palette.primary.main,
              },
            }}
          >
            {"billerid" in data[0] ? (
              <>
                <StyledTableRow>
                  <CustomTableCell
                    style={styles.headTableCell}
                    label={"Biller Id"}
                  />
                  <CustomTableCell
                    style={styles.headTableCell}
                    label={"Provider Name"}
                  />
                  <CustomTableCell
                    style={styles.headTableCell}
                    label={"Service Type"}
                  />
                  <CustomTableCell
                    style={styles.headTableCell}
                    label={"Shortname"}
                  />
                  <CustomTableCell
                    style={styles.headTableCell}
                    label={"Product Id"}
                  />
                </StyledTableRow>
              </>
            ) : (
              <>
                <StyledTableRow>
                  <CustomTableCell
                    style={styles.headTableCell}
                    label={"Amount"}
                  />
                  <CustomTableCell
                    style={styles.headTableCell}
                    label={"Quantity Available"}
                  />
                  <CustomTableCell
                    style={styles.headTableCell}
                    label={"Description"}
                  />
                </StyledTableRow>
              </>
            )}
          </TableHead>
          <TableBody
            sx={{
              "& tr": {
                color: theme.palette.primary.main,
              },
            }}
          >
            {data && (
              <>
                {data.length > 0 ? (
                  data.map((datum) => {
                    if ("billerid" in datum) {
                      return (
                        <StyledTableRow key={datum.billerid}>
                          <StyledTableCell style={styles.text}>
                            {datum.billerid}
                          </StyledTableCell>
                          <StyledTableCell style={styles.text}>
                            {datum.name}
                          </StyledTableCell>
                          <StyledTableCell style={styles.text}>
                            {datum.service_type}
                          </StyledTableCell>
                          <StyledTableCell style={styles.text}>
                            {datum.shortname}
                          </StyledTableCell>
                          <StyledTableCell style={styles.text}>
                            {datum.productid}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    } else {
                      return (
                        <StyledTableRow key={datum.description}>
                          <StyledTableCell style={styles.text}>
                            {datum.amount}
                          </StyledTableCell>
                          <StyledTableCell style={styles.text}>
                            {datum.available}
                          </StyledTableCell>
                          <StyledTableCell style={styles.text}>
                            {datum.description}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                  })
                ) : (
                  <Empty colSpan={8} text={"No Internet Information"} />
                )}
              </>
            )}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const useStyles = (theme: any) => ({
  headTableCell: {
    cursor: "pointer",
  },
  headerText: {
    fontWeight: "600",
  },
  searchInput: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0px 15px",
    marginBottom: "2rem",
  },
  filterWrapper: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  text: {
    color: theme.palette.primary.main,
  },
  link: {
    color: theme.palette.secondary.main,
  },
});

export default InternetTransactionsTable;
