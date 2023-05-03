import React, { CSSProperties } from 'react';
import {
	Avatar,
	useTheme,
	TableBody,
	Box,
	TableHead,
	Table,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { SUCCESS_COLOR, BOX_SHADOW } from 'utilities/constant';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import { User } from 'utilities/types';
import Loader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import UnsuspendUser from '../unsuspend-user';
import CustomTableCell from './components/custom-table-cell';

type Props = {
	users: User[] | null;
	isLoading: boolean;
};

const SuspensionTable = ({ users, isLoading }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<>
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<TableHeader title={'Suspension'} />
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
							<CustomTableCell label={'Name'} />
							<CustomTableCell label={'Suspension/Deletion Note'} />
							<CustomTableCell label={'Status'} />
							<CustomTableCell label={'Action'} />
							<TableCell>Action</TableCell>
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
							<Loader colSpan={5} />
						) : (
							users && (
								<>
									{users && users.length > 0 ? (
										users.map((row, key) => (
											<TableRow key={key}>
												<TableCell>
													<Box
														sx={{
															display: 'flex',
															alignItems: 'center',
															gap: '10px',
														}}
													>
														<Avatar src={row.avatar} />
														<span>
															{row.firstname} {row.lastname}
														</span>
													</Box>
												</TableCell>
												<TableCell>{row.suspensionReason}</TableCell>
												<TableCell>
													{row.suspended
														? 'Suspended'
														: row.deleted
														? 'Deleted'
														: ''}
												</TableCell>
												<TableCell>
													<UnsuspendUser
														user={row}
														text={'unsuspend'}
														buttonProps={{
															size: 'small',
															style: styles.suspendBtn as CSSProperties,
														}}
													/>
												</TableCell>
											</TableRow>
										))
									) : (
										<Empty colSpan={5} text={'No suspension records'} />
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

export default SuspensionTable;
