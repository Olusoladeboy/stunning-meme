import React, { CSSProperties, MouseEvent, useState } from 'react';
import Table from '@mui/material/Table';
import {
	Box,
	IconButton,
	Popper,
	ClickAwayListener,
	List,
	ListItemButton,
	TableBody,
	TableHead,
	useTheme,
	TableRow,
} from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useMutation, useQueryClient } from 'react-query';
import { green, grey, red } from '@mui/material/colors';
import {
	BOX_SHADOW,
	DANGER_COLOR,
	LIGHT_GRAY,
	SUCCESS_COLOR,
	DataPlan,
	QueryKeys,
} from 'utilities';
import DataPlanForm from '../forms/data-plan-form';
import ModalWrapper from '../modal/Wrapper';
import RegularAlert from '../modal/regular-modal';
import TableLoader from '../loader/table-loader';
import TableEmpty from '../empty/table-empty';
import Loader from '../loader';
import { useAlert, useHandleError } from 'hooks';
import { updateDataPlan } from 'api';
import { StyledTableCell, StyledTableRow } from './components';
import CustomTableCell from './components/custom-table-cell';
import { useAppSelector } from 'store/hooks';

interface Props {
	data: DataPlan[] | undefined | null;
	isLoading?: boolean;
}

const DataPlansTable: React.FC<Props> = ({ data, isLoading }) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const { canCreateOrUpdateRecord } = useAppSelector(
		(store) => store.authState
	);

	const [selectedPlan, setSelectedPlan] = useState<null | DataPlan>(null);

	const queryClient = useQueryClient();

	const [modalAlert, setModalAlert] = useState<{ [key: string]: any } | null>(
		null
	);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [isEditPlan, setEditPlan] = useState<boolean>(false);

	const handleClickAction = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(
			anchorEl && anchorEl === event.currentTarget ? null : event.currentTarget
		);
	};

	const { isLoading: isEnablingDisablingPlan, mutate } = useMutation(
		updateDataPlan,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					queryClient.invalidateQueries(QueryKeys.DataPlans);
					setAlert({
						message: 'Data plan updated successfully!',
						type: 'success',
					});
				}
			},
		}
	);

	const handleEnableDisablePlan = () => {
		if (selectedPlan) {
			mutate({
				data: {
					isActive: !selectedPlan.isActive,
				},
				id: selectedPlan?.id as string,
			});
		}
	};

	const closePlanModal = () => {
		setEditPlan(false);
		setSelectedPlan(null);
	};

	return (
		<>
			{isEnablingDisablingPlan && <Loader />}
			{isEditPlan && selectedPlan && (
				<ModalWrapper
					closeModal={() => closePlanModal()}
					title={'EDIT DATA PLAN'}
				>
					<DataPlanForm
						callback={() => closePlanModal()}
						dataPayload={selectedPlan}
					/>
				</ModalWrapper>
			)}
			{modalAlert && (
				<RegularAlert
					close={() => setModalAlert(null)}
					width={'480px'}
					title={modalAlert.title}
					btnText={modalAlert.btnText}
					message={modalAlert.message}
					alertType={modalAlert.alertType}
				/>
			)}
			<ClickAwayListener onClickAway={() => setAnchorEl(null)}>
				<Box
					style={styles.container as CSSProperties}
					sx={{ overflow: 'auto' }}
				>
					<Table sx={{ overflow: 'auto' }} stickyHeader>
						<TableHead
							sx={{
								'& tr': {
									backgroundColor: LIGHT_GRAY,
									color: theme.palette.primary.main,
								},
							}}
						>
							<TableRow>
								<CustomTableCell label={'Plan Name'} />
								<CustomTableCell label={'Amount'} />
								<CustomTableCell label={'Code'} />
								<CustomTableCell label={'Data Unit'} />
								<CustomTableCell label={'Data Source'} />
								<CustomTableCell label={'Status'} />
								{canCreateOrUpdateRecord && (
									<CustomTableCell label={'Action'} />
								)}
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
											data.map((plan: DataPlan, key: number) => (
												<StyledTableRow key={key}>
													<StyledTableCell sx={{ paddingLeft: '40px' }}>
														{plan.name}
													</StyledTableCell>
													<StyledTableCell>
														{typeof plan.amount === 'object'
															? plan.amount.$numberDecimal
															: plan.amount}
													</StyledTableCell>
													<StyledTableCell>{plan.code}</StyledTableCell>
													<StyledTableCell>{plan.data_unit}</StyledTableCell>
													<StyledTableCell>{plan.data_source}</StyledTableCell>
													<StyledTableCell
														sx={{
															color: plan.isActive ? green['600'] : red['600'],
														}}
													>
														{plan.isActive ? 'Active' : 'Deativated'}
													</StyledTableCell>

													{canCreateOrUpdateRecord && (
														<StyledTableCell sx={{ paddingRight: '40px' }}>
															<Box>
																<IconButton
																	onClick={(event) => {
																		handleClickAction(event);
																		setSelectedPlan(plan);
																	}}
																	size={'small'}
																>
																	<MoreHoriz />
																</IconButton>
																<Popper
																	open={Boolean(anchorEl)}
																	anchorEl={anchorEl}
																>
																	<List style={styles.editDeleteWrapper}>
																		<ListItemButton
																			onClick={() => {
																				setAnchorEl(null);
																				setEditPlan(true);
																			}}
																			style={styles.editBtn}
																		>
																			Edit
																		</ListItemButton>

																		<ListItemButton
																			onClick={() => {
																				setAnchorEl(null);
																				handleEnableDisablePlan();
																			}}
																			style={{
																				...styles.enableDisableBtn,
																				color: plan.isActive
																					? DANGER_COLOR
																					: theme.palette.primary.main,
																			}}
																		>
																			{plan.isActive ? 'Disable' : 'Enable'}
																		</ListItemButton>
																	</List>
																</Popper>
															</Box>
														</StyledTableCell>
													)}
												</StyledTableRow>
											))
										) : (
											<TableEmpty text={'No records'} colSpan={8} />
										)}
									</>
								)
							)}
						</TableBody>
					</Table>
				</Box>
			</ClickAwayListener>
		</>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	tableHeader: {
		padding: '0px 32px',
		marginBottom: theme.spacing(3),
	},
	headerText: {
		fontWeight: '600',
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.primary.main,
	},
	editDeleteWrapper: {
		backgroundColor: grey[50],
		boxShadow: BOX_SHADOW,
	},
	editBtn: {
		// minWidth: '120px',
		color: SUCCESS_COLOR,
		paddingLeft: '40px',
		paddingRight: '40px',
	},
	enableDisableBtn: {
		// minWidth: '120px',
		color: DANGER_COLOR,
		paddingLeft: '40px',
		paddingRight: '40px',
	},
});

export default DataPlansTable;
