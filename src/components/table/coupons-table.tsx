import React, { CSSProperties, useState, MouseEvent } from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import {
	Typography,
	useTheme,
	List,
	ListItemButton,
	IconButton,
	Popper,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import { useMutation, useQueryClient } from 'react-query';
import TableHead from '@mui/material/TableHead';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import { AddCircle, MoreHoriz } from '@mui/icons-material';
import {
	SUCCESS_COLOR,
	BOX_SHADOW,
	DANGER_COLOR,
} from '../../utilities/constant';
import ModalWrapper from '../modal/Wrapper';
import FilterIcon from '../icons/filter';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import Button from '../button';
import CouponForm from '../forms/coupon-form';
import Modal from '../modal';
import {
	Coupon,
	QueryKey,
	CouponStatus,
	ModalDetails,
} from '../../utilities/types';
import TableLoader from '../loader/table-loader';
import Api from '../../utilities/api';
import { useAlert } from '../../utilities/hooks';
import { useAppSelector } from '../../store/hooks';
import Loader from '../loader';

interface Props {
	data: Coupon[] | null;
	isLoading?: boolean;
}

const CouponsTable = ({ data, isLoading }: Props) => {
	const [isCreateCoupon, setCreateCoupon] = useState<boolean>(false);
	const setAlert = useAlert();
	const { token } = useAppSelector((store) => store.authState);
	const theme = useTheme();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [selectedCoupon, setSelectedCoupon] = useState<null | Coupon>(null);
	const [isEdit, setEdit] = useState<boolean>(false);
	const [modalAlert, setModalAlert] = useState<ModalDetails | null>(null);

	const { isLoading: isUpdatingCoupon, mutate: updateCoupon } = useMutation(
		Api.Coupon.UpdateStatus,
		{
			onSettled: (data, error) => {
				if (error) {
					setAlert({
						data: error,
						type: 'error',
					});
				}

				if (data && data.success) {
					setAlert({ data: 'Coupon updated successfully!!', type: 'success' });
					queryClient.invalidateQueries(QueryKey.Coupon);
				}
			},
		}
	);

	const handleClickAction = (
		event: MouseEvent<HTMLElement>,
		coupon: Coupon
	) => {
		setSelectedCoupon(coupon);
		setAnchorEl(
			anchorEl && anchorEl === event.currentTarget ? null : event.currentTarget
		);
	};

	const handleDelete = (data: { [key: string]: any }) => {
		setModalAlert({
			title: `Delete ${data.coupon_name}`,
			buttonText: 'Delete plan',
			message: `Are you sure you want to delete ${data.coupon_name}`,
			type: 'failed',
		});
	};

	const handleVerifyCoupon = (
		status:
			| CouponStatus.VERIFIED
			| CouponStatus.UNVERIFIED
			| CouponStatus.EXPIRED
			| CouponStatus.CANCELLED
	) => {
		updateCoupon({
			token: token as string,
			data: { status },
			id: selectedCoupon?.id as string,
		});
	};

	const handleCloseEditModal = () => {
		setEdit(false);
		setSelectedCoupon(null);
	};

	return (
		<>
			{isUpdatingCoupon && <Loader />}
			{isCreateCoupon && (
				<ModalWrapper
					hasCloseButton
					closeModal={() => setCreateCoupon(false)}
					title={'CREATE COUPON'}
				>
					<CouponForm onSuccess={() => setCreateCoupon(false)} />
				</ModalWrapper>
			)}
			{modalAlert && <Modal {...modalAlert} />}
			{isEdit && selectedCoupon && (
				<ModalWrapper
					hasCloseButton
					closeModal={() => handleCloseEditModal()}
					title={'EDIT COUPON'}
				>
					<CouponForm
						isEdit
						data={selectedCoupon}
						onSuccess={() => handleCloseEditModal()}
					/>
				</ModalWrapper>
			)}

			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<TableHeader title={'Coupons'} />
					<Box
						sx={{
							alignSelf: 'flex-end',
							display: 'flex',
							alignItems: 'center',
							gap: theme.spacing(3),
						}}
					>
						<Button
							onClick={() => setCreateCoupon(true)}
							startIcon={<AddCircle />}
							style={styles.btnOutline as CSSProperties}
						>
							create coupon
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
							<TableCell sx={{ paddingLeft: '30px' }}>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Coupon Name
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Type
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Gift
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Created by
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
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Expiration
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Status
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
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
							<TableLoader colSpan={8} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((row, key) => (
											<TableRow key={row.id}>
												<TableCell
													sx={{ paddingLeft: '30px !important' }}
													style={styles.tableText}
												>
													{row.code || row?.name}
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.type}
												</TableCell>
												<TableCell style={styles.tableText}>
													{typeof row.gift === 'string'
														? row.gift
														: row.gift?.$numberDecimal}
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.createdBy
														? `${row.createdBy.firstname} ${row.createdBy.lastname}`
														: 'No Specified user'}
												</TableCell>

												<TableCell style={styles.tableText}>
													{moment.utc(row.createdAt).format('l')}
												</TableCell>
												<TableCell style={styles.tableText}>
													{moment.utc(row.expiresIn).format('l')}
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.status}
												</TableCell>
												<TableCell>
													<Box>
														<IconButton
															onClick={(event) => handleClickAction(event, row)}
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
																		setEdit(true);
																	}}
																	style={styles.editBtn}
																>
																	Edit
																</ListItemButton>
																<ListItemButton
																	onClick={() => {
																		setAnchorEl(null);
																		handleVerifyCoupon(CouponStatus.VERIFIED);
																	}}
																	style={styles.verifyBtn}
																>
																	Verify
																</ListItemButton>
																<ListItemButton
																	onClick={() => {
																		setAnchorEl(null);
																		handleVerifyCoupon(CouponStatus.UNVERIFIED);
																	}}
																	style={styles.unverifyBtn}
																>
																	Unverify
																</ListItemButton>
																<ListItemButton
																	onClick={() => {
																		setAnchorEl(null);
																		handleDelete(row);
																	}}
																	style={styles.deleteBtn}
																>
																	Delete
																</ListItemButton>
															</List>
														</Popper>
													</Box>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={8}>
												<Empty text={'No users'} />
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
	editDeleteWrapper: {
		backgroundColor: grey[50],
		boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.03)',
	},
	editBtn: {
		// minWidth: '120px',
		color: grey[600],
		paddingLeft: '40px',
		paddingRight: '40px',
	},
	deleteBtn: {
		// minWidth: '120px',
		color: DANGER_COLOR,
		paddingLeft: '40px',
		paddingRight: '40px',
	},
	unverifyBtn: {
		color: grey[900],
		paddingLeft: '40px',
		paddingRight: '40px',
	},
	verifyBtn: {
		color: SUCCESS_COLOR,
		paddingLeft: '40px',
		paddingRight: '40px',
	},
});

export default CouponsTable;
