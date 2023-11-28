import React, { CSSProperties, useState } from 'react';
import Table from '@mui/material/Table';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Avatar, useTheme, TableBody, TableHead, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	SUCCESS_COLOR,
	BOX_SHADOW,
	DANGER_COLOR,
	LINKS,
	User,
	QueryKeys,
	ErrorBoundaryGuard,
	extractUserName,
	IVerification,
	VERIFICATION_STATUS,
} from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import Button from '../button';
import CustomButton from '../button/custom-button';
import Loader from '../loader/table-loader';
import { useAlert, useHandleError } from 'hooks';
import { useAppSelector } from 'store/hooks';
import { updateVerification, verifyUser } from 'api';
import CustomTableCell from './components/custom-table-cell';

type Props = {
	verifications: IVerification[] | null;
	isLoading?: boolean;
	clearSearch?(): void;
	searchUser?(value: string): void;
};

const VerificationTable = ({
	isLoading,
	searchUser,
	clearSearch,
	verifications,
}: Props) => {
	const navigate = useNavigate();
	const handleError = useHandleError();
	const theme = useTheme();
	const styles = useStyles(theme);

	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const { token } = useAppSelector((store) => store.authState);
	const [selectedUser, setSelectUser] = useState<null | User>(null);

	// const { isLoading: isVerifyingUser } = useQuery(
	// 	'',
	// 	() => verifyUser(selectedUser?.id as string),
	// 	{
	// 		enabled: !!(token && selectedUser),
	// 		onSettled: (data, error) => {
	// 			setSelectUser(null);
	// 			if (error) {
	// 				const response = handleError({ error });
	// 				if (response?.message) {
	// 					setAlert({ message: response?.message, type: 'error' });
	// 				}
	// 			}

	// 			if (data && data.success) {
	// 				setAlert({ message: data.message, type: 'success' });
	// 				queryClient.invalidateQueries(QueryKeys.Users);
	// 				queryClient.invalidateQueries(QueryKeys.User);
	// 				queryClient.invalidateQueries(QueryKeys.Statistics);
	// 			}
	// 		},
	// 	}
	// );

	const { isLoading: isVerifyingUser, mutate: mutateVerifyUser } = useMutation(
		updateVerification,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response?.message, type: 'error' });
					}
				}

				if (data && data.success) {
					setAlert({ message: data.message, type: 'success' });
					queryClient.invalidateQueries(QueryKeys.Users);
					queryClient.invalidateQueries(QueryKeys.User);
					queryClient.invalidateQueries(QueryKeys.Statistics);
					queryClient.invalidateQueries(QueryKeys.NiNVerification);
				}
			},
		}
	);

	const handleVerifyUser = (id: string, status: string) =>
		mutateVerifyUser({
			id,
			data: {
				status,
			},
		});

	return (
		<>
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<TableHeader
						title={'Verification'}
						placeholder={'Search User by Email'}
						clearSearch={clearSearch}
						handleSearch={searchUser}
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
							<CustomTableCell label={'Name'} />
							<CustomTableCell label={'Email'} />
							<CustomTableCell label={'Tier Level'} />
							<CustomTableCell label={'Status'} />
							<CustomTableCell label={'Action'} />
						</TableRow>
					</TableHead>
					<ErrorBoundaryGuard>
						<TableBody
							sx={{
								'& tr': {
									color: theme.palette.primary.main,
								},
							}}
						>
							{isLoading ? (
								<Loader colSpan={5} />
							) : (
								verifications && (
									<>
										{verifications.length > 0 ? (
											verifications.map((row, key) => (
												<TableRow key={key}>
													<TableCell style={styles.tableText}>
														<Box
															sx={{
																display: 'flex',
																alignItems: 'center',
																gap: '10px',
															}}
														>
															<Avatar src={row.user.avatar} />
															<span>{extractUserName(row.user)}</span>
														</Box>
													</TableCell>
													<TableCell style={styles.tableText}>
														{row.user.email}
													</TableCell>
													<TableCell style={styles.tableText}>
														{row.user.kycLevel}
													</TableCell>
													<TableCell
														style={{
															...styles.tableText,
															color: row.user.verified
																? SUCCESS_COLOR
																: DANGER_COLOR,
														}}
													>
														{row.user.verified ? 'Verified' : 'Not Verified'}
													</TableCell>
													<TableCell sx={{ maxWidth: '180px' }}>
														{/* <Box style={styles.verifyPushWrapper}>
															{!row.user.verified && (
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
														</Box> */}
														{row.status === VERIFICATION_STATUS.PENDING && (
															<Box style={styles.verifyPushWrapper}>
																<Button
																	onClick={() =>
																		handleVerifyUser(
																			row.id,
																			VERIFICATION_STATUS.SUCCESSFUL
																		)
																	}
																	size={'small'}
																	style={styles.button as CSSProperties}
																>
																	Approve
																</Button>
																<Button
																	onClick={() =>
																		handleVerifyUser(
																			row.id,
																			VERIFICATION_STATUS.FAILED
																		)
																	}
																	size={'small'}
																	style={styles.button as CSSProperties}
																>
																	Decline
																</Button>
															</Box>
														)}
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
					</ErrorBoundaryGuard>
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
	button: {
		color: theme.palette.secondary.main,
		border: `1px solid ${theme.palette.secondary.main}`,
		whiteSpace: 'nowrap',
		padding: '4px 20px',
	},
});

export default VerificationTable;
