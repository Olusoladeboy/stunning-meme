import React, { CSSProperties } from 'react';
import Table from '@mui/material/Table';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LIGHT_GRAY } from '../../utilities/constant';
import { grey } from '@mui/material/colors';
import FilterIcon from '../icons/filter';
import TableHeader from '../header/table-header';

type Props = {
	data: {
		[key: string]: any;
	}[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// backgroundColor: LIGHT_GRAY,
		backgroundSize: 'cover',
		'& p': {
			fontWeight: '600',
		},

		backgroundPosition: 'top-left',
		fontSize: '14px',
		color: theme.palette.primary.main,
		fontWeight: '600',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: '14px',
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

const ConversionsTable = ({ data }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container as CSSProperties} sx={{ overflow: 'auto' }}>
			<TableHeader style={styles.tableHeader} />
			<Table sx={{ overflow: 'auto' }} stickyHeader>
				<TableHead
					sx={{
						'& tr': {
							backgroundColor: LIGHT_GRAY,
							color: theme.palette.primary.main,
						},
					}}
				>
					<TableRow>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>User</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>Order ID</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>Network</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>Number</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>

						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>Income</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>Return</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>Status</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody
					sx={{
						'& tr': {
							color: theme.palette.primary.main,
						},
					}}
				>
					{data.map((data, key) => (
						<StyledTableRow key={key}>
							<StyledTableCell style={styles.text}>
								{data.full_name}
							</StyledTableCell>
							<StyledTableCell style={styles.text}>
								{data.network_name}
							</StyledTableCell>
							<StyledTableCell style={styles.text}>
								{data.phone_number}
							</StyledTableCell>
							<StyledTableCell style={styles.text}>
								{data.amount}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	tableHeader: {
		padding: '0px 32px',
		marginBottom: theme.spacing(3),
	},
	headerText: {
		fontWeight: '600',
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.primary.main,
	},
	link: {
		color: theme.palette.secondary.main,
	},
});

export default ConversionsTable;
