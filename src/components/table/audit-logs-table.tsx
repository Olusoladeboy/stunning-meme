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
import { SUCCESS_COLOR, BOX_SHADOW, AuditLog } from '../../utilities';
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
	data: AuditLog[] | undefined | null;
	isLoading: boolean;
}

const AuditLogsTable: React.FC<Props> = ({ data, isLoading }) => {
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
						<CustomTableCell label={'Name'} />
						<CustomTableCell label={'Email'} />
						<CustomTableCell label={'Action'} />
						<CustomTableCell label={'Details'} />
						<CustomTableCell label={'Date'} />
						<CustomTableCell label={'Time'} />
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
						<TableLoader colSpan={6} />
					) : (
						data && (
							<>
								{data.length > 0 ? (
									data.map((row: AuditLog) => (
										<TableRow key={row.id}>
											<TableCell>
												{row.user &&
													typeof row.user === 'object' &&
													`${row.user.firstname} ${row.user.lastname}`}
											</TableCell>
											<TableCell>
												{row.user &&
													typeof row.user === 'object' &&
													row.user.email}
											</TableCell>
											<TableCell>{row.action}</TableCell>
											<TableCell>{row.details}</TableCell>
											<TableCell>
												{moment.utc(row.createdAt).format('l')}
											</TableCell>
											<TableCell>
												{moment.utc(row.createdAt).format('LT')}
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={6}>
											<Empty text={'No audit log(s)'} />
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

export default AuditLogsTable;
