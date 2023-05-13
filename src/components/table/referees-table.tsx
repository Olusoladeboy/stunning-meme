import React, { useState, MouseEvent } from 'react';
import {
	Table,
	Box,
	useTheme,
	List,
	ListItemButton,
	IconButton,
	Popper,
	TableHead,
	TableBody,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { MoreHoriz } from '@mui/icons-material';
import {
	SUCCESS_COLOR,
	BOX_SHADOW,
	DANGER_COLOR,
	IReferral,
	User,
	LINKS,
} from 'utilities';
import CustomTableCell from './components/custom-table-cell';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Empty from '../empty';
import Pagination from '../pagination';
import TableLoader from '../loader/table-loader';

interface Props {
	data: IReferral[] | null;
	isLoading?: boolean;
}

const RefereesTable: React.FC<Props> = ({ data, isLoading }) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const handleClickAction = (event: MouseEvent<HTMLElement>, user: User) => {
		setAnchorEl(
			anchorEl && anchorEl === event.currentTarget ? null : event.currentTarget
		);
		setSelectedUser(user);
	};

	const closePopper = () => {
		setAnchorEl(null);
		setSelectedUser(null);
	};

	const viewUser = () => navigate(`${LINKS.Users}/${selectedUser?.id}`);

	return (
		<>
			<Box sx={{ overflow: 'auto' }}>
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
							<CustomTableCell label={'Referees name'} />
							<CustomTableCell label={'Email'} />
							<CustomTableCell label={'Verification status'} />
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
							<TableLoader colSpan={4} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((row: IReferral, key) => (
											<TableRow key={key}>
												<TableCell
													sx={{ paddingLeft: '30px !important' }}
													style={styles.tableText}
												>
													{row.user.firstname} {row.user.lastname}
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.user.email}
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.user.verified ? 'Verified' : 'Unverified'}
												</TableCell>
												<TableCell>
													<Box>
														<IconButton
															onClick={(event) =>
																handleClickAction(event, row.user)
															}
															size={'small'}
														>
															<MoreHoriz />
														</IconButton>
														<Popper
															open={Boolean(anchorEl)}
															anchorEl={anchorEl}
														>
															<List style={styles.editDeleteWrapper}>
																{!row.user.verified && (
																	<ListItemButton
																		onClick={closePopper}
																		style={styles.verifyBtn}
																	>
																		Verify
																	</ListItemButton>
																)}
																{/* <ListItemButton
																	onClick={closePopper}
																	style={styles.deleteBtn}
																>
																	Delete
																</ListItemButton> */}
																<ListItemButton
																	onClick={() => {
																		closePopper();
																		viewUser();
																	}}
																	style={styles.pustNotifyBtn}
																>
																	View User
																</ListItemButton>
															</List>
														</Popper>
													</Box>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={4}>
												<Empty text={'No referees'} />
											</TableCell>
										</TableRow>
									)}
								</>
							)
						)}
					</TableBody>
				</Table>
				<Pagination
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						marginTop: theme.spacing(4),
						marginRight: '1rem',
					}}
					size={'large'}
					shape={'rounded'}
					variant={'outlined'}
				/>
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'grid',
		gridTemplateColumn: '1fr',
		gap: theme.spacing(4),
		// border: `1px solid ${theme.palette.secondary.main}`,
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
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		color: theme.palette.secondary.main,
		textTransform: 'uppercase',
		// fontWeight: '600',
	},
	editDeleteWrapper: {
		backgroundColor: grey[50],
		boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.03)',
	},
	editBtn: {
		// minWidth: '120px',
		color: grey[600],
		paddingLeft: '30px',
		paddingRight: '30px',
	},
	deleteBtn: {
		// minWidth: '120px',
		color: DANGER_COLOR,
		paddingLeft: '30px',
		paddingRight: '30px',
	},
	pustNotifyBtn: {
		color: grey[900],
		paddingLeft: '30px',
		paddingRight: '30px',
	},
	verifyBtn: {
		color: SUCCESS_COLOR,
		paddingLeft: '30px',
		paddingRight: '30px',
	},
});

export default RefereesTable;
