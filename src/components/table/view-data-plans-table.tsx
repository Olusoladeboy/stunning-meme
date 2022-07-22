import React, { CSSProperties, MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import {
	Box,
	IconButton,
	Typography,
	Popper,
	ClickAwayListener,
	List,
	ListItemButton,
	TableBody,
	TableCell,
	TableHead,
	useTheme,
	styled,
	TableRow,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { MoreHoriz } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { grey } from '@mui/material/colors';
import { useSnackbar } from 'notistack';
import {
	BOX_SHADOW,
	DANGER_COLOR,
	LIGHT_GRAY,
	SUCCESS_COLOR,
} from '../../utilities/constant';
import FilterIcon from '../icons/filter';
import TableHeader from '../header/table-header';
import DataPlanForm from '../forms/data-plan-form';
import ModalWrapper from '../modal/Wrapper';
import RegularAlert from '../modal/regular-modal';
import Api from '../../utilities/api';
import handleResponse from '../../utilities/helpers/handleResponse';
import { DataPlan, QueryKeyTypes } from '../../utilities/types';
import { useAppSelector } from '../../store/hooks';
import TableLoader from '../loader/table-loader';
import TableEmpty from '../empty/table-empty';
import Loader from '../loader';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// backgroundColor: LIGHT_GRAY,
		backgroundSize: 'cover',
		'& p': {
			fontWeight: '600',
		},

		backgroundPosition: 'top-left',
		fontSize: '14px',
		color: theme.palette.primary.main,
		fontWeight: '600',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: '14px',
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	color: theme.palette.primary.main,
	'&:nth-of-type(odd)': {
		backgroundColor: '#FDF8F1',
	},
	'&:nth-of-type(even)': {
		backgroundColor: grey[50],
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

interface ExtendedDataPlan extends DataPlan {
	shortcode: string;
	shortcode_sms: string;
	isActive: boolean;
	id: string;
}

const ViewDataPlansTable = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [plans, setPlans] = useState<null | ExtendedDataPlan[]>(null);
	const [selectedPlan, setSelectedPlan] = useState<null | ExtendedDataPlan>(
		null
	);

	const { token } = useAppSelector((store) => store.authState);
	const { enqueueSnackbar } = useSnackbar();
	const params = useParams();
	const queryClient = useQueryClient();

	const [alert, setAlert] = useState<{ [key: string]: any } | null>(null);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [isEditPlan, setEditPlan] = useState<boolean>(false);

	const handleClickAction = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(
			anchorEl && anchorEl === event.currentTarget ? null : event.currentTarget
		);
	};

	const { isLoading } = useQuery(
		[QueryKeyTypes.DataPlans, params.id],
		() =>
			Api.DataPlan.Plans({
				token: token || '',
				network: params ? params.id : '',
			}),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}

				if (data && data.success) {
					setPlans(data.payload);
				}
			},
		}
	);

	const { isLoading: isEnablingDisablingPlan, mutate } = useMutation(
		Api.DataPlan.UpdatePlan,
		{
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}

				if (data && data.success) {
					queryClient.invalidateQueries(QueryKeyTypes.DataPlans);
					enqueueSnackbar('Data plan updated successfully!', {
						variant: 'success',
					});
				}
			},
		}
	);

	const handleEnableDisablePlan = () => {
		if (selectedPlan) {
			mutate({
				token: token || '',
				data: {
					isActive: !selectedPlan.isActive,
				},
				id: selectedPlan.id,
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
				<ModalWrapper close={() => closePlanModal()} title={'EDIT DATA PLAN'}>
					<DataPlanForm
						handleOnSubmit={() => closePlanModal()}
						data={selectedPlan}
					/>
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
			<ClickAwayListener onClickAway={() => setAnchorEl(null)}>
				<Box
					style={styles.container as CSSProperties}
					sx={{ overflow: 'auto' }}
				>
					<TableHeader style={styles.tableHeader} />
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
								<StyledTableCell sx={{ paddingLeft: '40px' }}>
									<Box style={styles.filterWrapper}>
										<Typography>Plan name</Typography>
										<FilterIcon />
									</Box>
								</StyledTableCell>
								<StyledTableCell>
									<Box style={styles.filterWrapper}>
										<Typography>Amount</Typography>
										<FilterIcon />
									</Box>
								</StyledTableCell>
								<StyledTableCell>
									<Box style={styles.filterWrapper}>
										<Typography>Code</Typography>
										<FilterIcon />
									</Box>
								</StyledTableCell>
								<StyledTableCell>
									<Box style={styles.filterWrapper}>
										<Typography>Shortcode</Typography>
										<FilterIcon />
									</Box>
								</StyledTableCell>

								<StyledTableCell>
									<Box style={styles.filterWrapper}>
										<Typography>Shortcode sms</Typography>
										<FilterIcon />
									</Box>
								</StyledTableCell>
								<StyledTableCell sx={{ paddingRight: '40px' }}>
									Action
								</StyledTableCell>
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
								plans && (
									<>
										{plans.length > 0 ? (
											plans.map((plan, key) => (
												<StyledTableRow key={key}>
													<StyledTableCell
														sx={{ paddingLeft: '40px' }}
														style={styles.text}
													>
														{plan.name}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{typeof plan.amount !== 'string'
															? plan.amount.$numberDecimal
															: plan.amount}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{plan.code}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{plan.shortcode}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{plan.shortcode_sms}
													</StyledTableCell>

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
												</StyledTableRow>
											))
										) : (
											<TableEmpty text={'No records'} colSpan={6} />
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

export default ViewDataPlansTable;
