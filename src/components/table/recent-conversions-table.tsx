import React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
	LIGHT_GRAY,
	BOX_SHADOW,
	LINKS,
	QueryKeys,
	extractUserName,
	User,
} from 'utilities';
import { grey } from '@mui/material/colors';
import Link from '../link';
import Loader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import { useQueryHook } from 'hooks';
import { convertAirtimes } from 'api';

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

const RecentConversionsTable = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const { isLoading, data } = useQueryHook({
		queryKey: [QueryKeys.RecentConvertAirtime, 'recent-airtime-convert'],
		queryFn: () =>
			convertAirtimes({
				limit: 4,
				sort: '-createdAt',
				populate: 'network,user',
			}),
	});

	return (
		<Box style={styles.container} sx={{ overflow: 'auto' }}>
			<Box style={styles.header}>
				<Typography variant={'h5'} style={styles.headerText}>
					Recent Conversation
				</Typography>
				<Link style={styles.link} to={LINKS.Conversions}>
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
					{isLoading ? (
						<Loader colSpan={4} />
					) : (
						data && (
							<>
								{data.payload.length > 0 ? (
									data.payload.map((row: any) => (
										<StyledTableRow key={row.id}>
											<StyledTableCell>
												{extractUserName(row.user as User)}
											</StyledTableCell>
											<StyledTableCell>
												{row.network && row.network?.name}
											</StyledTableCell>
											<StyledTableCell>{row.phone_number}</StyledTableCell>
											<StyledTableCell>{row.network?.name}</StyledTableCell>
										</StyledTableRow>
									))
								) : (
									<Empty colSpan={4} text={'No recent conversion'} />
								)}
							</>
						)
					)}
				</TableBody>
			</Table>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `0.5px solid ${theme.palette.secondary.main}`,
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

export default RecentConversionsTable;
