import React, { useState } from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { useTheme, TableBody, TableHead } from '@mui/material';
import moment from 'moment';
import {
	LIGHT_GRAY,
	SUCCESS_COLOR,
	PENDING_COLOR,
	DANGER_COLOR,
	Transaction,
	TransactionStatus,
} from 'utilities';
import { StyledTableCell, StyledTableRow } from './components';
import Empty from '../empty/table-empty';
import Loader from '../loader/table-loader';
import TransactionDetailsModal from '../modal/transaction-details-modal';
import CustomTableCell from './components/custom-table-cell';

type Props = {
	data: { total: number; email: string }[] | null;
	isLoading?: boolean;
};

const TransactionMostUserTable = ({ data, isLoading }: Props) => {
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
								fontWeight: '600',
							},
						}}
					>
						<StyledTableRow>
							<CustomTableCell label={'Email'} />
							<CustomTableCell label={'Transactions'} />
						</StyledTableRow>
					</TableHead>
					<TableBody
						sx={{
							'& tr': {
								color: theme.palette.primary.main,
							},
						}}
					>
						{isLoading ? (
							<Loader colSpan={2} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((data, key: number) => (
											<StyledTableRow
												// onClick={() => setSelectedTransaction(data)}
												key={key}
											>
												<StyledTableCell style={styles.text}>
													{data.email}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{data.total}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={2} text={'No record found'} />
									)}
								</>
							)
						)}
					</TableBody>
				</Table>
			</Box>
		</>
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
	avatar: {
		height: '30px',
		width: '30px',
	},
});

export default TransactionMostUserTable;
