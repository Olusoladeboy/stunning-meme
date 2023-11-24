import React, { CSSProperties, useState } from 'react';
import {
	Table,
	Box,
	TableBody,
	TableHead,
	Avatar,
	useTheme,
} from '@mui/material';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import { SUCCESS_COLOR, BOX_SHADOW, AuditLog, IApiLog } from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import Pagination from '../pagination';
import Button from '../button';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from '../loader/table-loader';

interface Props {
	data: IApiLog[] | null;
	isLoading: boolean;
}

const ApiLogsTable: React.FC<Props> = ({ data, isLoading }) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<>
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
						<CustomTableCell label={'Reference'} />
						{/* <CustomTableCell label={'Remark'} />
						<CustomTableCell label={'Amount Paid'} />
						<CustomTableCell label={'Total Payable'} />
						<CustomTableCell label={'Settlement Amount'} />
						<CustomTableCell label={'Payment Status'} />
						<CustomTableCell label={'Payment Description'} /> */}
						<CustomTableCell label={'Date'} />
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
						<TableLoader colSpan={2} />
					) : (
						data && (
							<>
								{data.length > 0 ? (
									data.map((row: IApiLog) => (
										<TableRow key={row.id}>
											<TableCell>{row.reference}</TableCell>
											{/* <TableCell>{row.api_log.paymentRemark}</TableCell>
											<TableCell>{row.api_log.gateway.amountPaid}</TableCell>
											<TableCell>{row.api_log.gateway.totalPayable}</TableCell>
											<TableCell>
												{row.api_log.gateway.settlementAmount}
											</TableCell>
											<TableCell>{row.api_log.gateway.paymentStatus}</TableCell>
											<TableCell>
												{row.api_log.gateway.paymentDescription}
											</TableCell> */}
											<TableCell>
												{moment.utc(row.createdAt).format('l')}
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={2}>
											<Empty text={'No api log(s)'} />
										</TableCell>
									</TableRow>
								)}
							</>
						)
					)}
				</TableBody>
			</Table>
		</>
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
	suspendBtn: {
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		textTransform: 'uppercase',
		border: `1px solid ${SUCCESS_COLOR}`,
		color: SUCCESS_COLOR,
		// fontWeight: '600',
	},
});

export default ApiLogsTable;
