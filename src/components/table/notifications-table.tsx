import moment from 'moment';
import React, { CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, Table, TableBody, TableHead, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	SUCCESS_COLOR,
	BOX_SHADOW,
	DANGER_COLOR,
	LINKS,
	Notification,
} from 'utilities';
import ModalWrapper from '../modal/Wrapper';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Empty from '../empty';
import Button from '../button';
import RegularAlert from '../modal/regular-modal';
import PushNotificationForm from '../forms/notification-form';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from '../loader/table-loader';
import { useAppSelector } from 'store/hooks';

interface Props {
	notifications: Notification[] | null;
	isLoading?: boolean;
}

const NotificationsTable: React.FC<Props> = ({ notifications, isLoading }) => {
	const navigate = useNavigate();
	const [isCreateReferral, setCreateReferral] = useState<boolean>(false);
	const { canCreateOrUpdateRecord } = useAppSelector(
		(store) => store.authState
	);

	const theme = useTheme();
	const styles = useStyles(theme);

	const [currentRow, setCurrentRow] = useState<null | { [key: string]: any }>(
		null
	);
	const [alert, setAlert] = useState<{ [key: string]: any } | null>(null);

	return (
		<>
			{isCreateReferral && (
				<ModalWrapper
					closeModal={() => setCreateReferral(false)}
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
					closeModal={() => setCurrentRow(null)}
					title={'EDIT Notification'}
				>
					<PushNotificationForm notification={currentRow} />
				</ModalWrapper>
			)}

			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				{canCreateOrUpdateRecord && (
					<Box
						sx={{
							justifyContent: 'flex-end',
							display: 'flex',
							width: '100%',
							paddingRight: ['15px', '30px'],
						}}
					>
						<Button
							onClick={() => navigate(LINKS.CreateNotification)}
							style={styles.btnOutline as CSSProperties}
						>
							Create notification
						</Button>
					</Box>
				)}

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
							<CustomTableCell label={'Message'} />
							<CustomTableCell label={'Body'} />
							<CustomTableCell label={'Type'} />
							<CustomTableCell label={'Create At'} />
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
							notifications && (
								<>
									{notifications.length > 0 ? (
										notifications.map((notification: Notification) => (
											<TableRow key={notification.id}>
												<TableCell style={styles.tableText}>
													{notification.subject}
												</TableCell>
												<TableCell style={styles.tableText}>
													{notification.message}
												</TableCell>

												<TableCell style={styles.tableText}>
													{notification.type}
												</TableCell>
												<TableCell style={styles.tableText}>
													{moment.utc(notification.createdAt).format('l')}
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={4}>
												<Empty text={'No Manager(s)'} />
											</TableCell>
										</TableRow>
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
		border: `0.5px solid ${theme.palette.secondary.main}`,
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

export default NotificationsTable;
