import React, { CSSProperties, useState } from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { Avatar, Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import moment from 'moment';
import { SUCCESS_COLOR, BOX_SHADOW } from '../../utilities/constant';
import ModalWrapper from '../modal/Wrapper';
import FilterIcon from '../icons/filter';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Empty from '../empty';
import Pagination from '../pagination';
import Button from '../button';
import { ManagerTypes, ManagerDetailsData } from '../../utilities/types';
import ManagerAdminForm from '../forms/manager-admin-form';
import ManagerDetails from '../manager-details';
import TableLoader from '../loader/table-loader';
import ManagerTableHeader from '../header/manager-table-header';

interface AdminUserDetails extends ManagerDetailsData {
	avatar: string;
	createdAt: string;
	role: string;
}

type Props = {
	managers: AdminUserDetails[];
	isLoading: boolean;
};

const AdminUserTable = ({ managers, isLoading }: Props) => {
	const [managerType, setManagerType] = useState<ManagerTypes | null>(null);
	const [formActionType, setFormActionType] = useState<'edit' | 'add' | ''>('');
	const [selectedAdminUser, setSelectedAdminUser] =
		useState<AdminUserDetails | null>(null);
	const [isViewManager, setViewManager] = useState<boolean>(false);
	const [isEditManager, setEditManager] = useState<boolean>(false);

	const theme = useTheme();
	const styles = useStyles(theme);

	const handleViewAdminUser = (data: AdminUserDetails) => {
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
			setEditManager(true);
			setFormActionType('edit');
		} else {
			setEditManager(false);
			// setFormActionType('');
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
		setEditManager(false);
	};

	return (
		<>
			{formActionType && (
				<ModalWrapper
					close={() => {
						setFormActionType('');
						setSelectedAdminUser(null);
						setEditManager(false);
					}}
					title={
						<Typography variant={'h5'} sx={{ textTransform: 'uppercase' }}>
							{formActionType} {managerType}
						</Typography>
					}
				>
					<ManagerAdminForm
						onSuccess={() => onSuccess()}
						isEdit={isEditManager}
						type={ManagerTypes.Admin}
						managerDetails={selectedAdminUser}
					/>
				</ModalWrapper>
			)}
			{selectedAdminUser && isViewManager && (
				<ModalWrapper
					close={() => setSelectedAdminUser(null)}
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
							<TableCell />
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Name
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Role
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Email
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>

							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Phone no.
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Date
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
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
						) : managers && managers.length > 0 ? (
							managers.map((data, key) => (
								<TableRow onClick={() => handleViewAdminUser(data)} key={key}>
									<TableCell sx={{ maxWidth: '60px' }}>
										<Avatar src={data.avatar} />
									</TableCell>
									<TableCell
										style={styles.tableText}
									>{`${data.firstname} ${data.lastname}`}</TableCell>
									<TableCell style={styles.tableText}>{data.role}</TableCell>
									<TableCell style={styles.tableText}>{data.email}</TableCell>
									<TableCell style={styles.tableText}>{data.phone}</TableCell>
									<TableCell style={styles.tableText}>
										{moment.utc(data.createdAt).format('l')}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={6}>
									<Empty text={'No users'} />
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
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		color: theme.palette.secondary.main,
		textTransform: 'uppercase',
		// fontWeight: '600',
	},
});

export default AdminUserTable;
