import React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { Typography, useTheme, Avatar } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Check, Close, AccessTime } from '@mui/icons-material';
import moment from 'moment';
import {
	LIGHT_GRAY,
	SUCCESS_COLOR,
	PENDING_COLOR,
	DANGER_COLOR,
} from '../../utilities/constant';
import { TransactionStatusTypes } from '../../utilities/types';
import FilterIcon from '../icons/filter';
import { StyledTableCell, StyledTableRow } from './components';
import Empty from '../empty/table-empty';
import Loader from '../loader/table-loader';
import formatNumberToCurrency from '../../utilities/helpers/formatNumberToCurrency';

type Props = {
	data:
		| {
				[key: string]: any;
		  }[]
		| null;
	isLoading?: boolean;
};

const setColor = (status: string) => {
	if (status === TransactionStatusTypes.SUCCESSFUL) {
		return SUCCESS_COLOR;
	} else if (status === TransactionStatusTypes.PENDING) {
		return PENDING_COLOR;
	} else {
		return DANGER_COLOR;
	}
};

const TransactionsTable = ({ data, isLoading }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
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
					<TableRow>
						<StyledTableCell>
							<Box style={styles.filterWrapper}>
								<Typography>User</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
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
					{isLoading ? (
						<Loader colSpan={7} />
					) : (
						data && (
							<>
								{data.length > 0 ? (
									data.map((data, key) => (
										<StyledTableRow key={key}>
											<StyledTableCell style={styles.text}>
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center',
														gap: theme.spacing(2),
													}}
												>
													<Avatar style={styles.avatar} src={data.avatar} />
													<Typography>
														{data.user?.firstname} {data.user?.lastname}
													</Typography>
												</Box>
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{data.transaction
													? data.transaction.service
													: data.service}
											</StyledTableCell>

											<StyledTableCell style={styles.text}>
												{data.reference}
											</StyledTableCell>

											<StyledTableCell style={styles.text}>
												{moment.utc(data.createdAt).format('ll')}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{moment.utc(data.createdAt).format('LT')}
											</StyledTableCell>
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
														{data.status ===
														TransactionStatusTypes.SUCCESSFUL ? (
															<Check />
														) : data.status ===
														  TransactionStatusTypes.PENDING ? (
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
											<StyledTableCell style={styles.text}>
												{formatNumberToCurrency(data.amount.$numberDecimal)}
											</StyledTableCell>
										</StyledTableRow>
									))
								) : (
									<Empty colSpan={7} text={'No Transactions'} />
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

export default TransactionsTable;
