import React, { CSSProperties, useState } from 'react';
import {
	Avatar,
	Typography,
	useTheme,
	Box,
	Table,
	TableHead,
	TableBody,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import moment from 'moment';
import { SUCCESS_COLOR, BOX_SHADOW, ManagerTypes, User } from 'utilities';
import ModalWrapper from '../modal/Wrapper';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Empty from '../empty';
import Pagination from '../pagination';
import Button from '../button';
import ManagerAdminForm from '../forms/manager-admin-form';
import ManagerDetails from '../manager-details';
import TableLoader from '../loader/table-loader';
import ManagerTableHeader from '../header/manager-table-header';
import CustomTableCell from './components/custom-table-cell';

type Props = {
	managers: User[] | null | undefined;
	isLoading: boolean;
};

const AdminUserTable = ({ managers, isLoading }: Props) => {
	const [managerType, setManagerType] = useState<ManagerTypes | null>(null);
	const [formActionType, setFormActionType] = useState<'edit' | 'add' | ''>('');
	const [selectedAdminUser, setSelectedAdminUser] = useState<User | null>(null);
	const [isViewManager, setViewManager] = useState<boolean>(false);

	const theme = useTheme();
	const styles = useStyles(theme);

	const handleViewAdminUser = (data: User) => {
		setSelectedAdminUser(data);
		setViewManager(true);
	};

	const handleAddEditManager = ({
		isEdit,
		isAdd,
		type,
	}: {
		isEdit?: boolean;
		type?: ManagerTypes;
		isAdd?: boolean;
	}) => {
		if (isEdit) {
			setViewManager(false);
			setFormActionType('edit');
		}
		if (isAdd) {
			setViewManager(false);
			setFormActionType('add');
		} else {
			// setFormActionType('');
		}

		type ? setManagerType(type) : setManagerType(null);
	};

	const onSuccess = () => {
		setFormActionType('');
		setSelectedAdminUser(null);
	};

	return (
		<>
			{formActionType && (
				<ModalWrapper
					hasCloseButton
					closeModal={() => {
						setFormActionType('');
						setSelectedAdminUser(null);
					}}
					title={
						<Typography variant={'h5'} sx={{ textTransform: 'uppercase' }}>
							{formActionType} {managerType}
						</Typography>
					}
				>
					<ManagerAdminForm
						callback={() => onSuccess()}
						type={ManagerTypes.Admin}
						managerDetails={selectedAdminUser}
					/>
				</ModalWrapper>
			)}
			{selectedAdminUser && isViewManager && (
				<ModalWrapper
					hasCloseButton
					closeModal={() => setSelectedAdminUser(null)}
					title={'View Admin User'}
				>
					<ManagerDetails
						handleEdit={() => handleAddEditManager({ isEdit: true })}
						managerDetail={selectedAdminUser}
						type={ManagerTypes.Admin}
					/>
				</ModalWrapper>
			)}
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<ManagerTableHeader title={'Admin'} />
					<Box
						sx={{
							alignSelf: 'flex-end',
							display: 'flex',
							alignItems: 'center',
							gap: theme.spacing(3),
						}}
					>
						<Button
							onClick={() =>
								handleAddEditManager({ type: ManagerTypes.Admin, isAdd: true })
							}
							startIcon={<AddCircle />}
							style={styles.btnOutline as CSSProperties}
						>
							Add admin
						</Button>
					</Box>
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
							<CustomTableCell label={'Role'} />
							<CustomTableCell label={'Email'} />
							<CustomTableCell label={'Created At'} />
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
							<TableLoader colSpan={5} />
						) : (
							managers && (
								<>
									{managers.length > 0 ? (
										managers.map((data: User) => (
											<TableRow
												onClick={() => handleViewAdminUser(data)}
												key={data.id}
											>
												<TableCell style={styles.tableText}>
													<Box
														sx={{
															display: 'flex',
															alignItems: 'center',
															gap: '10px',
														}}
													>
														<Avatar src={data.avatar} />
														<span>{`${data.firstname} ${data.lastname}`}</span>
													</Box>
												</TableCell>
												<TableCell style={styles.tableText}>
													{data.role}
												</TableCell>
												<TableCell style={styles.tableText}>
													{data.email}
												</TableCell>
												<TableCell style={styles.tableText}>
													{moment.utc(data.createdAt).format('l')}
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={5}>
												<Empty text={'No users'} />
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
});

export default AdminUserTable;
