import React, { CSSProperties, useState, MouseEvent } from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import {
	useTheme,
	List,
	ListItemButton,
	IconButton,
	Popper,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { grey } from '@mui/material/colors';
import { MoreHoriz } from '@mui/icons-material';
import {
	SUCCESS_COLOR,
	BOX_SHADOW,
	DANGER_COLOR,
} from '../../utilities/constant';
import ModalWrapper from '../modal/Wrapper';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import Pagination from '../pagination';
import Button from '../button';
import RegularAlert from '../modal/regular-modal';
import PushNotificationForm from '../forms/push-notification-form';

const DisputesTable = () => {
	const [data] = useState<{ [key: string]: any }[] | null>(null);
	const [isCreateReferral, setCreateReferral] = useState<boolean>(false);

	const theme = useTheme();
	const styles = useStyles(theme);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [currentRow, setCurrentRow] = useState<null | { [key: string]: any }>(
		null
	);
	const [alert, setAlert] = useState<{ [key: string]: any } | null>(null);

	const handleClickAction = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(
			anchorEl && anchorEl === event.currentTarget ? null : event.currentTarget
		);
	};

	const handleDelete = (data: { [key: string]: any }) => {
		setAlert({
			title: `Delete ${data.coupon_name}`,
			btnText: 'Decline',
			message: `Are you sure you want to delete ${data.coupon_name}`,
			alertType: 'failed',
		});
	};

	return (
		<>
			{isCreateReferral && (
				<ModalWrapper
					close={() => setCreateReferral(false)}
					title={'CREATE REFERRAL'}
				>
					<PushNotificationForm />
				</ModalWrapper>
			)}
			{alert && (
				<RegularAlert
					close={() => setAlert(null)}
					width={'480px'}
					title={alert.title}
					btnText={alert.btnText}
					message={alert.message}
					alertType={alert.alertType}
				/>
			)}
			{currentRow && (
				<ModalWrapper
					close={() => setCurrentRow(null)}
					title={'EDIT Notification'}
				>
					<PushNotificationForm isEdit data={currentRow} />
				</ModalWrapper>
			)}

			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<TableHeader backButtonText={'Disputes'} isDisplayBackButton />
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
							<TableCell sx={{ paddingLeft: '30px' }}>Reference</TableCell>
							<TableCell sx={{ paddingLeft: '30px' }}>Dispute</TableCell>
							<TableCell>Dispute</TableCell>
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
						{data && data.length > 0 ? (
							data.map((row, key) => (
								<TableRow key={key}>
									<TableCell style={styles.tableText}>
										{row.coupon_name}
									</TableCell>
									<TableCell style={styles.tableText}>
										{row.coupon_name}
									</TableCell>
									<TableCell style={styles.tableText}>{row.status}</TableCell>
									<TableCell>
										<Box>
											<IconButton
												onClick={(event) => handleClickAction(event)}
												size={'small'}
											>
												<MoreHoriz />
											</IconButton>
											<Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
												<List style={styles.editDeleteWrapper}>
													<ListItemButton
														onClick={() => {
															setAnchorEl(null);
															setCurrentRow(row);
														}}
														style={styles.editBtn}
													>
														Edit
													</ListItemButton>
													<ListItemButton
														onClick={() => {
															setAnchorEl(null);
															handleDelete(row);
														}}
														style={styles.deleteBtn}
													>
														delete
													</ListItemButton>
												</List>
											</Popper>
										</Box>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={6}>
									<Empty text={'No Dispute'} />
								</TableCell>
							</TableRow>
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
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		color: theme.palette.secondary.main,
		textTransform: 'uppercase',
		alignSelf: 'flex-end',
		// fontWeight: '600',
	},
	editDeleteWrapper: {
		backgroundColor: grey[50],
		boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.03)',
	},
	editBtn: {
		color: SUCCESS_COLOR,
		paddingLeft: '30px',
		paddingRight: '30px',
	},
	deleteBtn: {
		color: DANGER_COLOR,
		paddingLeft: '30px',
		paddingRight: '30px',
	},
});

export default DisputesTable;
