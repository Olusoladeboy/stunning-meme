import React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Check, Close, AccessTime } from '@mui/icons-material';
import {
	LIGHT_GRAY,
	SUCCESS_COLOR,
	PENDING_COLOR,
	DANGER_COLOR,
	TransactionStatus,
} from 'utilities';
import { grey } from '@mui/material/colors';
import FilterIcon from '../icons/filter';
import SearchInput from '../form-components/search-input';
import FilterBy from '../form-components/filter-by';

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
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: '14px',
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	color: theme.palette.primary.main,
	'&:nth-of-type(even)': {
		backgroundColor: LIGHT_GRAY,
	},
	'&:nth-of-type(odd)': {
		backgroundColor: grey[50],
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const setColor = (status: string) => {
	if (status === TransactionStatus.SUCCESSFUL) {
		return SUCCESS_COLOR;
	} else if (status === TransactionStatus.PENDING) {
		return PENDING_COLOR;
	} else {
		return DANGER_COLOR;
	}
};

const WalletHistoryTable = ({ data }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box sx={{ overflow: 'auto' }}>
			<Box style={styles.tableHeader}>
				<Typography variant={'h5'}>Wallet Transaction History</Typography>
				<Box
					sx={{
						display: 'flex',
						maxWidth: '480px',
						width: '100%',
						gap: theme.spacing(3),
					}}
				>
					<FilterBy
						placeholder={'Filter by'}
						sx={{ maxWidth: '200px' }}
						title={'Filter by'}
					/>
					<SearchInput fullWidth placeholder={'Search...'} />
				</Box>
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
						<StyledTableCell>Transaction</StyledTableCell>
						<StyledTableCell>Reference</StyledTableCell>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>Date</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>Time</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>Status</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>Amount</Typography>
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
								{data.transaction_id}
							</StyledTableCell>
							<StyledTableCell style={styles.text}>
								{data.transaction_type}
							</StyledTableCell>
							<StyledTableCell style={styles.text}>
								{data.amount}
							</StyledTableCell>
							<StyledTableCell style={styles.text}>{data.date}</StyledTableCell>
							<StyledTableCell style={styles.text}>{data.time}</StyledTableCell>
							<StyledTableCell>
								<Box
									sx={{
										display: 'flex',
										color: setColor(data.status),
										alignItems: 'center',
										gap: theme.spacing(2),
									}}
								>
									<Box
										sx={{
											padding: '5px',
											position: 'relative',
											height: '20px',
											width: '20px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											svg: {
												fontSize: '14px',
											},
										}}
									>
										{data.status === TransactionStatus.SUCCESSFUL ? (
											<Check />
										) : data.status === TransactionStatus.PENDING ? (
											<AccessTime />
										) : (
											<Close />
										)}
										<Box
											sx={{
												backgroundColor: setColor(data.status),
												height: '100%',
												width: '100%',
												position: 'absolute',
												zIndex: '0',
												opacity: '0.15',
												borderRadius: '50%',
											}}
										/>
									</Box>
									{data.status}
								</Box>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	tableHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(3),
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.primary.main,
	},
});

export default WalletHistoryTable;
