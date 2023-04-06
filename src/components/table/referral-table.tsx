import React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SquareRounded } from '@mui/icons-material';
import { LIGHT_GRAY, SUCCESS_COLOR, PRIMARY_COLOR } from '../../utilities';
import { grey } from '@mui/material/colors';
import Pagination from '../pagination';
import Empty from '../empty';

type Props = {
	data: {
		[key: string]: any;
	}[];
	tableTitle?: string;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// backgroundImage: `url(${require('../../assets/images/bgImage.png')})`,
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

const ReferralTable = ({ data }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<Box sx={{ overflow: 'auto' }}>
			{data.length > 0 ? (
				<>
					<Box
						style={styles.dFlex}
						sx={{ justifyContent: 'flex-end', marginBottom: theme.spacing(3) }}
					>
						<Box style={styles.dFlex}>
							<Box style={styles.dFlex}>
								<SquareRounded sx={{ color: SUCCESS_COLOR }} />= Active
							</Box>
							<Box sx={{ fontSize: '24px' }}>/</Box>
							<Box style={styles.dFlex}>
								<SquareRounded sx={{ color: PRIMARY_COLOR }} />= Inactive
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
								<StyledTableCell>User name</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Status</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((data, key) => (
								<StyledTableRow key={key}>
									<StyledTableCell>{data.user_name}</StyledTableCell>
									<StyledTableCell>{data.email}</StyledTableCell>
									<StyledTableCell>
										{data.status ? (
											<SquareRounded sx={{ color: SUCCESS_COLOR }} />
										) : (
											<SquareRounded sx={{ color: PRIMARY_COLOR }} />
										)}
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
				</>
			) : (
				<Empty text={'No referral data'} />
			)}
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

export default ReferralTable;
