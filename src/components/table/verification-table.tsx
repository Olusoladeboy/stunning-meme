import React, { CSSProperties, useState } from 'react';
import Table from '@mui/material/Table';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Avatar, Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { grey } from '@mui/material/colors';
import {
	SUCCESS_COLOR,
	BOX_SHADOW,
	DANGER_COLOR,
	LINKS,
	UserDetails,
	QueryKeys,
} from '../../utilities';
import FilterIcon from '../icons/filter';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import Button from '../button';
import CustomButton from '../button/custom-button';
import Loader from '../loader/table-loader';
import { useAlert, useHandleError } from '../../hooks';
import { useAppSelector } from '../../store/hooks';
import { verifyUser } from '../../api';

type Props = {
	users: UserDetails[] | null;
	isLoading?: boolean;
};

const VerificationTable = ({ users, isLoading }: Props) => {
	const navigate = useNavigate();
	const handleError = useHandleError();
	const theme = useTheme();
	const styles = useStyles(theme);

	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const { token } = useAppSelector((store) => store.authState);
	const [selectedUser, setSelectUser] = useState<null | UserDetails>(null);

	const { isLoading: isVerifyingUser } = useQuery(
		'',
		() =>
			verifyUser(
				selectedUser?.id as string,
			),
		{
			enabled: !!(token && selectedUser),
			onSettled: (data, error) => {
				setSelectUser(null);
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response?.message, type: 'error' });
					}
				}

				if (data && data.success) {
					setAlert({ message: data.message, type: 'success' });
					queryClient.invalidateQueries(QueryKeys.AllUsers);
					queryClient.invalidateQueries(QueryKeys.GetSingleUser);
					queryClient.invalidateQueries(QueryKeys.Statistics);
				}
			},
		}
	);

	return (
		<>
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<TableHeader title={'Verification'} />
					<Box
						sx={{
							alignSelf: 'flex-end',
							display: 'flex',
							alignItems: 'center',
							gap: theme.spacing(3),
						}}
					>
						<Button
							onClick={() => navigate(LINKS.KycVerification)}
							style={styles.btnKycLimit as CSSProperties}
						>
							KYC limit
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
									<Typography variant={'body1'}> Name</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography variant={'body1'}>Email</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography variant={'body1'}>Tier level</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography variant={'body1'}>Status</Typography>
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
							<Loader colSpan={6} />
						) : (
							users && (
								<>
									{users.length > 0 ? (
										users.map((row, key) => (
											<TableRow key={key}>
												<TableCell sx={{ maxWidth: '60px' }}>
													<Avatar src={row.avatar} />
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.firstname} {row.lastname}
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.email}
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.kycLevel}
												</TableCell>
												<TableCell
													style={{
														...styles.tableText,
														color: row.verified ? SUCCESS_COLOR : DANGER_COLOR,
													}}
												>
													{row.verified ? 'Verified' : 'Not Verified'}
												</TableCell>
												<TableCell sx={{ maxWidth: '180px' }}>
													<Box style={styles.verifyPushWrapper}>
														{!row.verified && (
															<CustomButton
																loading={
																	selectedUser &&
																	selectedUser.id === row.id &&
																	isVerifyingUser
																		? true
																		: false
																}
																onClick={() => setSelectUser(row)}
																style={styles.verifyBtn as CSSProperties}
																size={'small'}
															>
																Verify user
															</CustomButton>
														)}
														<Button
															onClick={() => navigate(LINKS.PushNotification)}
															size={'small'}
															style={styles.pushBtn as CSSProperties}
														>
															Push notify
														</Button>
													</Box>
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
	btnKycLimit: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		backgroundColor: theme.palette.secondary.main,
		textTransform: 'uppercase',
		color: grey[50],
		// fontWeight: '600',
	},
	verifyPushWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(3),
	},
	verifyBtn: {
		color: SUCCESS_COLOR,
		border: `1px solid ${SUCCESS_COLOR}`,
		whiteSpace: 'nowrap',
	},
	pushBtn: {
		color: theme.palette.secondary.main,
		border: `1px solid ${theme.palette.secondary.main}`,
		whiteSpace: 'nowrap',
	},
});

export default VerificationTable;
