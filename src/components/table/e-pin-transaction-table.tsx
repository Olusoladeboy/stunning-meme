import React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SquareRounded, ContentCopyRounded } from '@mui/icons-material';
import {
	LIGHT_GRAY,
	SUCCESS_COLOR,
	DANGER_COLOR,
} from '../../utilities/constant';
import { grey } from '@mui/material/colors';
import formatNumberToCurrency from '../../utilities/helpers/formatNumberToCurrency';
import { EPinsTypes } from '../../utilities/types';
import Pagination from '../pagination';

type Props = {
	data: {
		[key: string]: any;
	}[];
	tableTitle?: string;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundImage: `url(${require('../../assets/images/bgImage.png')})`,
		backgroundColor: LIGHT_GRAY,
		backgroundSize: 'cover',
		backgroundPosition: 'top-left',
		fontSize: '14px',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: '14px',
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(even)': {
		backgroundColor: LIGHT_GRAY,
	},
	'&:nth-of-type(old)': {
		backgroundColor: grey[50],
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const setColor = (status: boolean) => {
	if (status) {
		return SUCCESS_COLOR;
	} else {
		return DANGER_COLOR;
	}
};

const EPinTransactionTable = ({ data, tableTitle }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box sx={{ overflow: 'auto' }}>
			<Box
				style={styles.dFlex}
				sx={{ justifyContent: 'space-between', marginBottom: theme.spacing(3) }}
			>
				<Typography style={styles.title}>{tableTitle}</Typography>
				<Box style={styles.dFlex}>
					<Box style={styles.dFlex}>
						<SquareRounded sx={{ color: SUCCESS_COLOR }} />= Unused E-pin
					</Box>
					<Box sx={{ fontSize: '24px' }}>/</Box>
					<Box style={styles.dFlex}>
						<SquareRounded sx={{ color: DANGER_COLOR }} />= Used E-pin
					</Box>
				</Box>
			</Box>

			<Table sx={{ overflow: 'auto' }} stickyHeader>
				<TableHead
					sx={{
						'& tr': {
							backgroundColor: LIGHT_GRAY,
						},
					}}
				>
					<TableRow>
						<StyledTableCell>Transaction ID</StyledTableCell>
						<StyledTableCell>Network provider</StyledTableCell>
						<StyledTableCell>Pin value</StyledTableCell>
						<StyledTableCell>E-pin code</StyledTableCell>
						<StyledTableCell>Action</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((data, key) => (
						<StyledTableRow key={key}>
							<StyledTableCell>{data.transaction_id}</StyledTableCell>
							<StyledTableCell>{data.network_provider}</StyledTableCell>
							<StyledTableCell>
								{data.type === EPinsTypes.Airtime
									? formatNumberToCurrency(data.pin_value)
									: data.pin_value}
							</StyledTableCell>
							<StyledTableCell sx={{ color: setColor(data.used) }}>
								{data.epin_code}
							</StyledTableCell>
							<StyledTableCell>
								<Box sx={{ cursor: 'pointer' }} style={styles.dFlex}>
									<ContentCopyRounded fontSize={'small'} />
									<Typography variant={'body2'} sx={{ fontWeight: '600' }}>
										Copy
									</Typography>
								</Box>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
			<Pagination
				sx={{ marginTop: '15px' }}
				size={'large'}
				variant={'outlined'}
				shape={'rounded'}
			/>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	title: {
		fontWeight: '600',
	},
	dFlex: {
		display: 'flex',
		alignItems: 'center',
		gap: '5px',
	},
});

export default EPinTransactionTable;
