import React, { CSSProperties, useState } from 'react';
import {
	Table,
	TableHead,
	TableBody,
	Avatar,
	Typography,
	useTheme,
	Box,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import moment from 'moment';
import { SUCCESS_COLOR, BOX_SHADOW, ManagerTypes, User } from '../../utilities';
import ModalWrapper from '../modal/Wrapper';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Empty from '../empty';
import Pagination from '../pagination';
import Button from '../button';
import ManagerForm from '../forms/manager-admin-form';
import ManagerDetails from '../manager-details';
import TableLoader from '../loader/table-loader';
import ManagerTableHeader from '../header/manager-table-header';
import CustomTableCell from './components/custom-table-cell';

type Props = {
	managers: User[] | null | undefined;
	isLoading: boolean;
	searchManager?: (value: string) => void;
	clearSearch?: () => void;
};

const ManagersTable = ({
	managers,
	isLoading,
	clearSearch,
	searchManager,
}: Props) => {
	const [managerType, setManagerType] = useState<ManagerTypes | null>(null);
	const [formActionType, setFormActionType] = useState<'edit' | 'add' | ''>('');
	const [selectedManager, setSelectedManager] = useState<User | null>(null);
	const [isViewManager, setViewManager] = useState<boolean>(false);

	const theme = useTheme();
	const styles = useStyles(theme);

	const handleViewManager = (data: User) => {
		setSelectedManager(data);
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

	const closeModal = () => {
		setFormActionType('');
		setSelectedManager(null);
	};

	return (
		<>
			{formActionType && (
				<ModalWrapper
					hasCloseButton
					closeModal={closeModal}
					title={
						<Typography variant={'h5'} sx={{ textTransform: 'uppercase' }}>
							{formActionType} {managerType}
						</Typography>
					}
				>
					<ManagerForm
						callback={closeModal}
						type={ManagerTypes.Manager}
						managerDetails={selectedManager}
					/>
				</ModalWrapper>
			)}
			{selectedManager && isViewManager && (
				<ModalWrapper
					hasCloseButton
					closeModal={closeModal}
					title={'View manager'}
				>
					<ManagerDetails
						handleEdit={() =>
							handleAddEditManager({ isEdit: true, type: ManagerTypes.Manager })
						}
						managerDetail={selectedManager}
						callback={closeModal}
					/>
				</ModalWrapper>
			)}
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<ManagerTableHeader
						handleSearch={searchManager}
						clearSearch={clearSearch}
						title={'Managers'}
					/>
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
								handleAddEditManager({
									type: ManagerTypes.Manager,
									isAdd: true,
								})
							}
							startIcon={<AddCircle />}
							style={styles.btnOutline as CSSProperties}
						>
							Add manager
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
							<CustomTableCell label={'Name'} isSortable />
							<CustomTableCell label={'Email'} isSortable />
							<CustomTableCell label={'Date'} isSortable />
							<CustomTableCell label={'User'} />
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
							managers && (
								<>
									{managers.length > 0 ? (
										managers.map((data: User) => (
											<TableRow
												onClick={() => handleViewManager(data)}
												key={data.id}
											>
												<TableCell style={styles.tableText}>
													<Box
														sx={{
															display: 'flex',
															gap: '15px',
															alignItems: 'center',
														}}
													>
														<Avatar src={data.avatar} />
														<span>{`${data.firstname} ${data.lastname}`}</span>
													</Box>
												</TableCell>
												<TableCell style={styles.tableText}>
													{data.email}
												</TableCell>

												<TableCell style={styles.tableText}>
													{moment.utc(data.createdAt).format('l')}
												</TableCell>

												<TableCell style={styles.tableText}>{0}</TableCell>
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

export default ManagersTable;
