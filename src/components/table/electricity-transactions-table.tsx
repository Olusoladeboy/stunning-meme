import {
  TableBody,
  TableHead,
  Table,
  useTheme,
  Box,
  styled,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./components";
import { BillsAdmin } from "utilities";
import Empty from "../empty/table-empty";
import CustomTableCell from "./components/custom-table-cell";

type Props = {
  data: BillsAdmin[];
};

const ElectricityTransactionsTable = ({ data }: Props) => {
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
            <StyledTableRow>
              <CustomTableCell
                style={styles.headTableCell}
                label={"Reference ID"}
              />
              <CustomTableCell style={styles.headTableCell} label={"Name"} />
              <CustomTableCell style={styles.headTableCell} label={"Amount"} />
              <CustomTableCell style={styles.headTableCell} label={"Type"} />
              <CustomTableCell style={styles.headTableCell} label={"Service"} />
            </StyledTableRow>
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
                  data.map((datum) => (
                    <StyledTableRow key={datum.reference}>
                      <StyledTableCell style={styles.text}>
                        {datum.reference}
                      </StyledTableCell>
                      <StyledTableCell style={styles.text}>
                        {datum.name}
                      </StyledTableCell>
                      <StyledTableCell style={styles.text}>
                        {datum.amount}
                      </StyledTableCell>
                      <StyledTableCell style={styles.text}>
                        {datum.type}
                      </StyledTableCell>
                      <StyledTableCell style={styles.text}>
                        {datum.service}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <Empty colSpan={8} text={"No Electricity Information"} />
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

export default ElectricityTransactionsTable;
