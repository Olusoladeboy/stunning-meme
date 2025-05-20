import { useState } from 'react';
import {
	TableBody,
	TableHead,
	Table,
	useTheme,
	Box,
	styled,
	Button,
} from '@mui/material';
import moment from 'moment';
import JsonFormatter from 'react-json-formatter';
import { StyledTableCell, StyledTableRow } from './components';
import {
	JSON_STYLE,
	Transaction,
	checkAmount,
	extractUserName,
	formatNumberToCurrency,
} from 'utilities';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from 'components/loader/table-loader';
import ModalWrapper from 'components/modal/Wrapper';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';
import { updateBillTransactions } from 'api/bill';
import { useMutation } from 'react-query';
import useToastAlert from 'hooks/useToastAlert';
import { useHandleError } from 'hooks';
import { green, red } from '@mui/material/colors';
import Loader from 'components/loader';
import { useAppSelector } from 'store/hooks';

type Props = {
	data: Transaction[];
	isLoading?: boolean;
	reloadTransactions?: () => void;
};

const InternetTransactionsTable = ({
	data,
	isLoading,
	reloadTransactions,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const alert = useToastAlert();
	const handleError = useHandleError();
	const isSupperAdmin = useAppSelector(
		(store) => store.authState.isSupperAdmin
	);

	const [jsonData, setJsonData] = useState<string>('');
	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	const handleClickRow = (value: Transaction) => {
		console.log(value);
		setSelectedTransaction(value);
	};

	const handleViewPins = (bill: Transaction) => {
		const jsonObj = bill.pins;
		setJsonData(JSON.stringify(jsonObj));
	};

	const { mutate, isLoading: isUpdatingTransaction } = useMutation(
		updateBillTransactions,
		{
			onSettled: (data, error) => {
				if (error) {
					const errorResponse = handleError({ error });
					if (errorResponse?.message) {
						alert({ message: errorResponse.message, type: 'error' });
					}
				}

				if (data && data.success) {
					reloadTransactions?.();
					alert({
						message: 'Transaction updated successfully',
						type: 'success',
					});
				}
			},
		}
	);

	const handleUpdateTransaction = ({
		status,
		id,
	}: {
		status: string;
		id: string;
	}) => {
		if (!isSupperAdmin) {
			alert({
				message: 'You are not authorized to perform this action',
				type: 'error',
			});
			return;
		}

		mutate({
			id,
			data: { status },
		});
	};

	return (
		<>
			{isUpdatingTransaction && <Loader />}
			{jsonData && (
				<ModalWrapper
					title={'Internet Pins'}
					hasCloseButton={true}
					closeModal={() => setJsonData('')}
				>
					<Box
						sx={{
							overflow: 'auto',
							maxWidth: '540px',
							width: '100%',
							alignSelf: 'flex-start',
						}}
					>
						<JsonFormatter json={jsonData} tabWith={4} jsonStyle={JSON_STYLE} />
					</Box>
				</ModalWrapper>
			)}
			<Container>
				{selectedTransaction && (
					<TransactionDetailsModal
						closeModal={() => setSelectedTransaction(null)}
						transaction={selectedTransaction as any}
						isDisplayButtons
					/>
				)}
				<Box sx={{ overflow: 'auto' }}>
					<Table sx={{ overflow: 'auto' }}>
						<TableHead
							sx={{
								'& tr': {
									color: theme.palette.primary.main,
								},
							}}
						>
							<StyledTableRow>
								<CustomTableCell
									style={styles.headTableCell}
									label={'Reference ID'}
								/>
								<CustomTableCell style={styles.headTableCell} label={'Name'} />
								<CustomTableCell style={styles.headTableCell} label={'User'} />
								<CustomTableCell
									style={styles.headTableCell}
									label={'Amount'}
								/>
								<CustomTableCell style={styles.headTableCell} label={'Date'} />

								<CustomTableCell
									style={styles.headTableCell}
									label={'Status'}
								/>
								<CustomTableCell
									style={styles.headTableCell}
									label={'Action'}
								/>
							</StyledTableRow>
						</TableHead>
						<TableBody
							sx={{
								'& tr': {
									color: theme.palette.primary.main,
								},
							}}
						>
							{isLoading ? (
								<TableLoader colSpan={7} />
							) : (
								data && (
									<>
										{data.length > 0 ? (
											data.map((value) => (
												<StyledTableRow
													onClick={() => handleClickRow(value)}
													key={value.reference}
												>
													<StyledTableCell style={styles.text}>
														{value.reference}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{value.name}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{value.user &&
															typeof value.user === 'object' &&
															Object.keys(value.user).length > 0 &&
															extractUserName(value.user)}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{formatNumberToCurrency(checkAmount(value.amount))}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{moment(value.createdAt).format('ll')}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{value.status}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														<Button
															onClick={(e) => {
																e.stopPropagation();
																handleViewPins(value);
															}}
														>
															View Pins
														</Button>
														{value.status === 'PENDING' && (
															<Box sx={{ display: 'flex', gap: '10px' }}>
																<Button
																	onClick={(e) => {
																		e.stopPropagation();
																		handleUpdateTransaction({
																			id: value.id,
																			status: 'SUCCESSFUL',
																		});
																	}}
																	sx={{
																		backgroundColor: `${green['600']} !important`,
																		color: 'white',
																	}}
																>
																	Approve
																</Button>
																<Button
																	onClick={(e) => {
																		e.stopPropagation();
																		handleUpdateTransaction({
																			id: value.id,
																			status: 'FAILED',
																		});
																	}}
																	sx={{
																		backgroundColor: `${red['600']} !important`,
																		color: 'white',
																	}}
																>
																	Decline
																</Button>
															</Box>
														)}
													</StyledTableCell>
												</StyledTableRow>
											))
										) : (
											<Empty colSpan={7} text={'No Internet Information'} />
										)}
									</>
								)
							)}
						</TableBody>
					</Table>
				</Box>
			</Container>
		</>
	);
};

const Container = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
}));

const useStyles = (theme: any) => ({
	headTableCell: {
		cursor: 'pointer',
	},
	headerText: {
		fontWeight: '600',
	},
	searchInput: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '0px 15px',
		marginBottom: '2rem',
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.primary.main,
	},
	link: {
		color: theme.palette.secondary.main,
	},
});

export default InternetTransactionsTable;
