import React, { ReactNode } from "react";
import { Box, Typography, BoxProps, Button, useTheme } from "@mui/material";
import BackButton from "../back-button";
import SearchInput from "../form-components/search-input";
import Popper from "@mui/material/Popper";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AuditFilter, AuditLog } from "utilities";
import moment from "moment";

interface Props extends BoxProps {
  title?: any;
  hideTitle?: boolean;
  isDisplayBackButton?: boolean;
  backButtonText?: string;
  isDisplayFilter?: boolean;
  searchPlaceholder?: string;
  handleSearch?: (value: string) => void;
  clearSearch?: () => void;
  statusFilter?: ReactNode;
  deletedCheckbox?: ReactNode;
  canFilter?: boolean;
  auditData?: AuditLog[] | undefined | null;
  handleAuditFilter?: (criteria: AuditFilter) => void;
}

const TableHeader = ({
  title,
  sx,
  isDisplayBackButton,
  searchPlaceholder = "Search...",
  backButtonText,
  handleSearch,
  clearSearch,
  statusFilter,
  style,
  deletedCheckbox,
  canFilter,
  auditData,
  handleAuditFilter,
  ...rest
}: Props) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userFilter, setUserFilter] = React.useState("");
  const [actionFilter, setActionFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");

  const handleUserFilter = (event: SelectChangeEvent) => {
    setUserFilter(event.target.value as string);
  };

  const handleActionFilter = (event: SelectChangeEvent) => {
    setActionFilter(event.target.value as string);
  };

  const handleDateFilter = (event: SelectChangeEvent) => {
    setDateFilter(event.target.value as string);
  };

  const handleReset = () => {
    setUserFilter("");
    setActionFilter("");
    setDateFilter("");
    if (handleAuditFilter) {
      handleAuditFilter({
        user: "",
        action: "",
        date: "",
      });
    }
  };

  const handleApplyFilter = () => {
    if (handleAuditFilter) {
      handleAuditFilter({
        user: userFilter,
        action: actionFilter,
        date: dateFilter,
      });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      style={style}
      sx={{
        display: "flex",
        alignItems: { sm: "center" },
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        gap: "20px",
        justifyContent:
          title || isDisplayBackButton ? "space-between" : "flex-end",
        // padding: '10px 0px',
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
        {isDisplayBackButton && <BackButton text={backButtonText} />}
        {title && typeof title === "string" ? (
          <Typography sx={{ fontWeight: "600" }} variant={"h5"}>
            {title}
          </Typography>
        ) : (
          title
        )}
      </Box>

      {canFilter && (
        <div>
          <Button
            onClick={handleClick}
            sx={{
              color: theme.palette.text.primary,
              border: "1px solid currentColor",
              borderRadius: "0.5em",
              padding: "1em",
              display: "flex",
              alignItems: "center",
              gap: "2em",
            }}
          >
            <FilterAltIcon
              sx={{
                color: theme.palette.secondary.main,
              }}
            />
            <Typography>Filter by</Typography>
            <ExpandMoreIcon />
          </Button>
          <Popper open={open} anchorEl={anchorEl}>
            <Box
              sx={{
                borderRadius: "0.5em",
                p: 4,
                bgcolor: "background.paper",
                boxShadow: "0px 0px 2px #444",
                width: 300,
                marginTop: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.8em !important",
                }}
              >
                User
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  marginBottom: 3,
                }}
              >
                <InputLabel
                  id="userFilter"
                  sx={{
                    color: "inherit",
                  }}
                >
                  Choose
                </InputLabel>
                <Select
                  value={userFilter}
                  labelId="userFilter"
                  label="Choose"
                  onChange={handleUserFilter}
                >
                  {auditData &&
                    auditData.length > 0 &&
                    Array.from(
                      new Set(
                        auditData.map((datum) => {
                          if (datum.staff && typeof datum.staff === "object") {
                            return `${datum.staff.firstname} ${datum.staff.lastname}`;
                          }
                          return "";
                        })
                      )
                    ).map((datum) => (
                      <MenuItem key={datum} value={datum}>
                        {datum}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.8em !important",
                }}
              >
                Action
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  marginBottom: 3,
                }}
              >
                <InputLabel
                  id="actionFilter"
                  sx={{
                    color: "inherit",
                  }}
                >
                  Choose
                </InputLabel>
                <Select
                  value={actionFilter}
                  labelId="actionFilter"
                  label="Choose"
                  onChange={handleActionFilter}
                >
                  {auditData &&
                    auditData.length > 0 &&
                    Array.from(
                      new Set(auditData.map((datum) => datum.details))
                    ).map((datum) => (
                      <MenuItem key={datum} value={datum}>
                        {datum}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.8em !important",
                }}
              >
                Date of Action
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  marginBottom: "1.8em",
                }}
              >
                <InputLabel
                  id="dateFilter"
                  sx={{
                    color: "inherit",
                  }}
                >
                  Choose
                </InputLabel>
                <Select
                  value={dateFilter}
                  labelId="dateFilter"
                  label="Choose"
                  onChange={handleDateFilter}
                >
                  {auditData &&
                    auditData.length > 0 &&
                    Array.from(
                      new Set(
                        auditData.map((datum) =>
                          moment.utc(datum.createdAt).format("l")
                        )
                      )
                    ).map((datum) => (
                      <MenuItem key={datum} value={datum}>
                        {datum}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2em",
                }}
              >
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
                  onClick={handleReset}
                >
                  RESET
                </Button>
                <Button
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.background.paper,
                    "&:hover": {
                      color: theme.palette.text.primary,
                    },
                  }}
                  onClick={handleApplyFilter}
                >
                  SEARCH
                </Button>
              </Box>
            </Box>
          </Popper>
        </div>
      )}

      <Box
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        {statusFilter}
        {deletedCheckbox}
        <SearchInput
          fullWidth
          sx={{ maxWidth: ["100%", "320px"], minWidth: ["100%", "300px"] }}
          placeholder={rest.placeholder || searchPlaceholder}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />
      </Box>
    </Box>
  );
};

export default TableHeader;
