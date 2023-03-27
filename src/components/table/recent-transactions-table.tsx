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
import { grey } from '@mui/material/colors';
import Link from '../link';
import Empty from '../empty/table-empty';
import Loader from '../loader/table-loader';
import LINKS from '../../utilities/links';
import { useQueryHook } from '../../utilities/api/hooks';
import { QueryKey } from '../../utilities/types';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';
import formatNumberToCurrency from '../../utilities/helpers/formatNumberToCurrency';

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

const RecentTransactionsTable = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { token } = useAppSelector((store) => store.authState);

	const { isLoading, data } = useQueryHook({
		queryKey: QueryKey.RecentTransactions,
		queryFn: () =>
			Api.Transactions.All({
				token: token as string,
				params: { sort: '-createdAt', limit: 4, populate: 'user' },
			}),
	});

	return (
		<Box style={styles.container} sx={{ overflow: 'auto' }}>
			<Box style={styles.header}>
				<Typography variant={'h5'} style={styles.headerText}>
					Recent Transactions
				</Typography>
				<Link style={styles.link} to={LINKS.Transactions}>
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
									data.payload.map((row: any, key: number) => (
										<StyledTableRow key={key}>
											<StyledTableCell>
												{row.user.firstname} {row.user.lastname}
											</StyledTableCell>
											<StyledTableCell>{row.service}</StyledTableCell>
											<StyledTableCell>{row.user.phone}</StyledTableCell>
											<StyledTableCell>
												{formatNumberToCurrency(row.amount.$numberDecimal)}
											</StyledTableCell>
										</StyledTableRow>
									))
								) : (
									<Empty colSpan={4} />
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
