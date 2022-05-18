import React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LIGHT_GRAY, BOX_SHADOW } from '../../utilities/constant';
import { TransactionStatusTypes } from '../../utilities/types';
import { grey } from '@mui/material/colors';
import Link from '../link';
import Empty from '../empty';

type Props = {
	data: {
		[key: string]: any;
	}[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// backgroundColor: LIGHT_GRAY,
		backgroundSize: 'cover',

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

const RecentTransactionsTable = ({ data }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container} sx={{ overflow: 'auto' }}>
			<Box style={styles.header}>
				<Typography variant={'h5'} style={styles.headerText}>
					Recent Conversation
				</Typography>
				<Link style={styles.link} to={'/'}>
					view more
				</Link>
			</Box>
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
						<StyledTableCell>Full Name</StyledTableCell>
						<StyledTableCell>Network name</StyledTableCell>
						<StyledTableCell>Phone No.</StyledTableCell>
						<StyledTableCell>Amount</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody
					sx={{
						'& tr': {
							color: theme.palette.primary.main,
						},
					}}
				>
					{data && data.length > 0 ? (
						data.map((data, key) => (
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
						))
					) : (
						<StyledTableRow>
							<StyledTableCell colSpan={4}>
								<Empty text={'No recent transaction'} />
							</StyledTableCell>
						</StyledTableRow>
					)}
				</TableBody>
			</Table>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0px 16px',
	},
	headerText: {
		fontWeight: '600',
	},
	text: {
		color: theme.palette.primary.main,
	},
	link: {
		color: theme.palette.secondary.main,
	},
});

export default RecentTransactionsTable;
