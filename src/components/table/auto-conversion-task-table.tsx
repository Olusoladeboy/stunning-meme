import React from 'react';
import Table from '@mui/material/Table';
import moment from 'moment';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import {
	LIGHT_GRAY,
	BOX_SHADOW,
	checkAmount,
	formatNumberToCurrency,
} from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import { grey } from '@mui/material/colors';

import Empty from '../empty/table-empty';
import { Transaction } from 'utilities';

interface ETransaction extends Transaction {
	networkResponse: string;
}

interface Props {
	transactions: ETransaction[];
}

const AutoConversionTaskTable: React.FC<Props> = ({ transactions }) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<>
			<Box sx={{ overflow: 'auto' }}>
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
							<TableCell>Reference</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Response</TableCell>

							{/* <TableCell sx={{ minWidth: '50px', maxWidth: '100px' }} /> */}
						</TableRow>
					</TableHead>
					<TableBody
						sx={{
							'& tr': {
								color: theme.palette.primary.main,
							},
						}}
					>
						{transactions.length > 0 ? (
							transactions.map((transaction: ETransaction) => {
								return (
									<TableRow key={transaction.id}>
										<TableCell style={styles.text}>
											{transaction.reference}
										</TableCell>
										<TableCell style={styles.text}>
											{formatNumberToCurrency(checkAmount(transaction.amount))}
										</TableCell>
										<TableCell style={styles.text}>
											{moment(transaction.createdAt).format('l')}
										</TableCell>
										<TableCell style={styles.text}>
											{transaction.status}
										</TableCell>
										<TableCell style={styles.text}>
											{transaction.networkResponse}
										</TableCell>
									</TableRow>
								);
							})
						) : (
							<Empty colSpan={5} text={'No Airtime Convert'} />
						)}
					</TableBody>
				</Table>
			</Box>
		</>
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
	editNetwork: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		cursor: 'pointer',
		userSelect: 'none',
	},
	statusBtnWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(4),
	},
	text: {
		color: theme.palette.primary.main,
	},
});

export default AutoConversionTaskTable;
