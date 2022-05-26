import { tableCellClasses } from '@mui/material/TableCell';
import { styled, TableRow, TableCell } from '@mui/material';
import { grey } from '@mui/material/colors';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.MuiTableCell-head`]: {
		fontSize: '14px',
		color: theme.palette.primary.main,
		fontWeight: '600',
	},
	[`&.MuiTableCell-head:nth-type-of(1)`]: {
		paddingLeft: '30px',
	},
	[`&.MuiTableCell-head:last-child`]: {
		paddingRight: '30px',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: '14px',
		padding: '10px',
	},
	[`&.MuiTableCell-body:last-child`]: {
		paddingRight: '30px',
	},
	[`&.MuiTableCell-body:nth-of-type(1)`]: {
		paddingRight: '30px',
	},
}));

export const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		fontSize: '14px',
		color: theme.palette.primary.main,
		fontWeight: '600',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: '14px',
	},
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	color: theme.palette.primary.main,
	'&:nth-of-type(odd)': {
		backgroundColor: '#FDF8F1',
	},
	'&:nth-of-type(even)': {
		backgroundColor: grey[50],
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

export const StyledTableHeaderRow = styled(TableRow)(({ theme }) => ({
	backgroundColor: grey[50],
}));
