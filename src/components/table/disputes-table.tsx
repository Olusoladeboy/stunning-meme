import React, { CSSProperties } from 'react';
import Table from '@mui/material/Table';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import {
	SUCCESS_COLOR,
	BOX_SHADOW,
	DANGER_COLOR,
} from '../../utilities/constant';
import FilterIcon from '../icons/filter';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import Button from '../button';
import { Ticket, TicketStatus } from '../../utilities/types';
import TableLoader from '../loader/table-loader';
import ErrorBoundary from '../../utilities/helpers/error-boundary';
import LINKS from '../../utilities/links';
import CustomTableCell from './components/custom-table-cell';

interface Props {
	data: Ticket[] | null;
	isLoading?: boolean;
	clearSearch?: () => void;
	searchTicket?(value: string): void;
}

const DisputeTable = ({
	data,
	isLoading,
	clearSearch,
	searchTicket,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const navigate = useNavigate();

	return (
		<ErrorBoundary>
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<TableHeader
						title={'Dispute'}
						placeholder={'Search Ticket by code...'}
						clearSearch={clearSearch}
						handleSearch={searchTicket}
					/>
				</Box>

				<Table sx={{ overflow: 'auto' }}>
					<TableHead
						sx={{
							'& tr': {
								backgroundColor: `${grey[50]} !important`,
								color: theme.palette.primary.main,
							},
						}}
					>
						<TableRow>
							<CustomTableCell label={'Code'} />
							<CustomTableCell label={'Subject'} />
							<CustomTableCell label={'Status'} />
							<CustomTableCell label={'Created At'} />
							<CustomTableCell label={'Action'} />
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
							<TableLoader colSpan={8} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((row) => (
											<TableRow key={row.id}>
												<TableCell
													sx={{ paddingLeft: '30px !important' }}
													style={styles.tableText}
												>
													{row.code}
												</TableCell>

												<TableCell style={styles.tableText}>
													{row.subject}
												</TableCell>
												<TableCell style={styles.tableText}>
													<Box
														sx={{
															backgroundColor:
																row.status === TicketStatus.OPENED
																	? SUCCESS_COLOR
																	: DANGER_COLOR,
															display: 'inline-block',
															alignItems: 'center',
															gap: '3px',
															padding: '6px 12px',
															borderRadius: '15px',
														}}
													>
														<Typography
															sx={{
																color: grey['50'],
																fontSize: '10px',
																fontWeight: '600',
															}}
															variant={'body2'}
														>
															{row.status}
														</Typography>
													</Box>
												</TableCell>

												<TableCell style={styles.tableText}>
													{moment.utc(row.createdAt).format('l')}
												</TableCell>

												<TableCell>
													<Button
														onClick={() =>
															navigate(`${LINKS.Message}/${row.id}`)
														}
														style={styles.viewDisputeBtn}
													>
														View dispute
													</Button>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={8}>
												<Empty text={'No users'} />
											</TableCell>
										</TableRow>
									)}
								</>
							)
						)}
					</TableBody>
				</Table>
			</Box>
		</ErrorBoundary>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'grid',
		gridTemplateColumn: '1fr',
		gap: theme.spacing(4),
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	tableHeader: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(3),
	},
	tableHeaderText: {
		fontWeight: '600',
	},
	tableText: {
		color: theme.palette.primary.main,
	},
	transactionItemText: {
		color: SUCCESS_COLOR,
	},
	btnOutline: {
		border: `1px solid ${theme.palette.secondary.main}`,
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		color: theme.palette.secondary.main,
		textTransform: 'uppercase',
		// fontWeight: '600',
	},
	editDeleteWrapper: {
		backgroundColor: grey[50],
		boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.03)',
	},
	viewDisputeBtn: {
		// minWidth: '120px',
		color: theme.palette.secondary.main,
	},
});

export default DisputeTable;
