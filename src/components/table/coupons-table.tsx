import React, { CSSProperties, useState, MouseEvent, useEffect } from 'react';
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
import { useMutation, useQueryClient } from 'react-query';
import TableHead from '@mui/material/TableHead';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import { AddCircle, MoreHoriz } from '@mui/icons-material';

import ModalWrapper from '../modal/Wrapper';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import Button from '../button';
import CouponForm from '../forms/coupon-form';
import {
	SUCCESS_COLOR,
	BOX_SHADOW,
	DANGER_COLOR,
	Coupon,
	QueryKeys,
	CouponStatus,
	ADMIN_ROLE,
	checkAmount,
	Amount,
	PRIVILEGE_MESSAGE,
} from 'utilities';
import TableLoader from '../loader/table-loader';
import { useAlert, useHandleError, useModalAlert } from 'hooks';
import Loader from '../loader';
import { deleteCoupon, updateCouponStatus } from 'api';
import CustomTableCell from './components/custom-table-cell';
import { useAppSelector } from 'store/hooks';

interface Props {
	data: Coupon[] | null;
	isLoading?: boolean;
	searchCoupon?: (value: string) => void;
	clearSearch?: () => void;
}

const CouponsTable = ({
	data,
	isLoading,
	clearSearch,
	searchCoupon,
}: Props) => {
	const [isCreateCoupon, setCreateCoupon] = useState<boolean>(false);
	const setAlert = useAlert();
	const modal = useModalAlert();
	const handleError = useHandleError();
	const theme = useTheme();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();

	const { user } = useAppSelector((store) => store.authState);

	const [canCreateOrUpdate, setCanCreateOrUpdate] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [selectedCoupon, setSelectedCoupon] = useState<null | Coupon>(null);
	const [isEdit, setEdit] = useState<boolean>(false);

	useEffect(() => {
		if (user) {
			const role = user.role;
			if (
				role === ADMIN_ROLE.CUSTOMER_SUPPORT ||
				role === ADMIN_ROLE.OPERATIONS
			) {
				setCanCreateOrUpdate(false);
			} else {
				setCanCreateOrUpdate(true);
			}
		}
	}, [user]);

	// Update Coupon
	const { isLoading: isUpdatingCoupon, mutate: mutateUpdateCouponState } =
		useMutation(updateCouponStatus, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					setAlert({
						message: 'Coupon updated successfully!!',
						type: 'success',
					});
					queryClient.invalidateQueries(QueryKeys.Coupon);
				}
			},
		});

	// Delete  Coupon
	const { isLoading: isDeletingCoupon, mutate: mutateDeleteCoupon } =
		useMutation(deleteCoupon, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}

					return;
				}

				setSelectedCoupon(null);
				setAlert({
					message: 'Coupon delete successfully!!',
					type: 'success',
				});
				queryClient.invalidateQueries(QueryKeys.Coupon);
			},
		});

	const handleClickAction = (
		event: MouseEvent<HTMLElement>,
		coupon: Coupon
	) => {
		setSelectedCoupon(coupon);
		setAnchorEl(
			anchorEl && anchorEl === event.currentTarget ? null : event.currentTarget
		);
	};

	const handleDelete = (id: string) => {
		modal({
			title: `Delete Coupon`,
			message: `Are you sure you want to delete ${selectedCoupon?.code}`,
			primaryButtonText: 'Delete',
			onClickPrimaryButton: () => {
				mutateDeleteCoupon(id);
				modal(null);
			},
		});
	};

	const handleVerifyCoupon = (
		status:
			| CouponStatus.VERIFIED
			| CouponStatus.UNVERIFIED
			| CouponStatus.EXPIRED
			| CouponStatus.CANCELLED
	) => {
		mutateUpdateCouponState({
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
			{(isUpdatingCoupon || isDeletingCoupon) && <Loader />}
			{isCreateCoupon && (
				<ModalWrapper
					hasCloseButton
					closeModal={() => setCreateCoupon(false)}
					title={'CREATE COUPON'}
				>
					<CouponForm onSuccess={() => setCreateCoupon(false)} />
				</ModalWrapper>
			)}
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

			<Box style={styles.container}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: { xs: '0px 15px', md: '0px 30px' } }}
				>
					<TableHeader
						title={'Coupons'}
						clearSearch={clearSearch}
						handleSearch={searchCoupon}
					/>
					<Box
						sx={{
							alignSelf: 'flex-end',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						{canCreateOrUpdate && (
							<Button
								onClick={() => setCreateCoupon(true)}
								startIcon={<AddCircle />}
								style={styles.btnOutline as CSSProperties}
							>
								create coupon
							</Button>
						)}
					</Box>
				</Box>
				<Box
					sx={{
						overflow: 'auto',
					}}
				>
					<Table>
						<TableHead
							sx={{
								'& tr': {
									backgroundColor: `${grey[50]} !important`,
									color: theme.palette.primary.main,
								},
							}}
						>
							<TableRow>
								<CustomTableCell label={'Coupon Name'} />
								<CustomTableCell label={'Type'} />
								<CustomTableCell label={'Gift'} />
								<CustomTableCell label={'Create By'} />
								<CustomTableCell label={'Date'} />
								<CustomTableCell label={'Expiration'} />
								<CustomTableCell label={'Status'} />
								{canCreateOrUpdate && <CustomTableCell label={'Action'} />}
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
														{checkAmount(row.gift as string | Amount)}
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
													{canCreateOrUpdate && (
														<TableCell>
															<Box>
																<IconButton
																	onClick={(event) =>
																		handleClickAction(event, row)
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
																		<ListItemButton
																			onClick={() => {
																				setAnchorEl(null);
																				if (!canCreateOrUpdate)
																					return alert({
																						message: PRIVILEGE_MESSAGE,
																						type: 'info',
																					});
																				setEdit(true);
																			}}
																			style={styles.editBtn}
																		>
																			Edit
																		</ListItemButton>

																		<ListItemButton
																			onClick={() => {
																				setAnchorEl(null);
																				handleVerifyCoupon(
																					CouponStatus.VERIFIED
																				);
																			}}
																			style={styles.verifyBtn}
																		>
																			Verify
																		</ListItemButton>

																		<ListItemButton
																			onClick={() => {
																				setAnchorEl(null);
																				handleDelete(row.id as string);
																			}}
																			style={styles.deleteBtn}
																		>
																			Delete
																		</ListItemButton>
																	</List>
																</Popper>
															</Box>
														</TableCell>
													)}
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={8}>
													<Empty text={'No coupon'} />
												</TableCell>
											</TableRow>
										)}
									</>
								)
							)}
						</TableBody>
					</Table>
				</Box>
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
		gap: theme.spacing(4),
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
