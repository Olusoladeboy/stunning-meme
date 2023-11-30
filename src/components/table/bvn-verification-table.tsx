import React, { CSSProperties } from 'react';
import Table from '@mui/material/Table';
import { useMutation, useQueryClient } from 'react-query';
import { Avatar, useTheme, TableBody, TableHead, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	BOX_SHADOW,
	QueryKeys,
	ErrorBoundaryGuard,
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
import TableLoader from '../loader/table-loader';
import { useAlert, useHandleError } from 'hooks';
import { updateVerification } from 'api';
import CustomTableCell from './components/custom-table-cell';
import Loader from 'components/loader';

type Props = {
	data: IVerification[] | null | undefined;
	isLoading?: boolean;
	clearSearch?(): void;
	searchUser?(value: string): void;
};

const BvnVerificationTable = ({
	data,
	isLoading,
	searchUser,
	clearSearch,
}: Props) => {
	const handleError = useHandleError();
	const theme = useTheme();
	const styles = useStyles(theme);

	const queryClient = useQueryClient();
	const setAlert = useAlert();

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
					queryClient.invalidateQueries(QueryKeys.BvnVerification);
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
			{isVerifyingUser && <Loader />}
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<TableHeader
						title={'Bvn Verification'}
						placeholder={'Search User by Email'}
						clearSearch={clearSearch}
						handleSearch={searchUser}
					/>
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
							<CustomTableCell label={'BVN'} />
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
								<TableLoader colSpan={5} />
							) : (
								data && (
									<>
										{data.length > 0 ? (
											data.map((row, key) => (
												<TableRow key={key}>
													<TableCell style={styles.tableText}>
														<Box
															sx={{
																display: 'flex',
																alignItems: 'center',
																gap: '10px',
															}}
														>
															<Avatar src={row.user?.avatar} />
															<span>
																{row.user.firstname} {row.user.lastname}
															</span>
														</Box>
													</TableCell>
													<TableCell style={styles.tableText}>
														{row.user.email}
													</TableCell>
													<TableCell style={styles.tableText}>
														{row.payload}
													</TableCell>

													<TableCell
													// style={{
													// 	...styles.tableText,
													// 	color: row.user.verified
													// 		? SUCCESS_COLOR
													// 		: DANGER_COLOR,
													// }}
													>
														{row.status}
													</TableCell>
													<TableCell sx={{ maxWidth: '180px' }}>
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
													<Empty text={'No available bvn record'} />
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

	tableText: {
		color: theme.palette.primary.main,
	},

	verifyPushWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(3),
	},

	button: {
		color: theme.palette.secondary.main,
		border: `1px solid ${theme.palette.secondary.main}`,
		whiteSpace: 'nowrap',
		padding: '4px 20px',
	},
});

export default BvnVerificationTable;
