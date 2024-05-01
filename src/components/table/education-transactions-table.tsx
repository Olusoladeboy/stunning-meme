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
import JsonFormatter from 'react-json-formatter';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from './components';
import {
	extractUserName,
	JSON_STYLE,
	Transaction,
	checkAmount,
	formatNumberToCurrency,
} from 'utilities';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from 'components/loader/table-loader';
import ModalWrapper from 'components/modal/Wrapper';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';

type Props = {
	data: Transaction[];
	isLoading?: boolean;
};

const EducationTransactionsTable = ({ data, isLoading }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const [jsonData, setJsonData] = useState<string>('');

	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	const handleClickRow = (value: Transaction) => {
		setSelectedTransaction(value);
	};

	const handleViewPin = (bill: Transaction) => {
		const jsonObj = bill.pins;
		setJsonData(JSON.stringify(jsonObj));
	};

	return (
		<>
			{jsonData && (
				<ModalWrapper
					title={'Education Pins'}
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
								<CustomTableCell style={styles.headTableCell} label={'User'} />
								<CustomTableCell
									style={styles.headTableCell}
									label={'Product'}
								/>
								<CustomTableCell
									style={styles.headTableCell}
									label={'Amount'}
								/>
								<CustomTableCell style={styles.headTableCell} label={'Date'} />
								<CustomTableCell
									style={styles.headTableCell}
									label={'Status'}
								/>
								<CustomTableCell style={styles.headTableCell} label={''} />
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
														{value.user &&
															typeof value.user === 'object' &&
															Object.keys(value.user).length > 0 &&
															extractUserName(value.user)}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{value.name}
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
																handleViewPin(value);
															}}
														>
															View Pins
														</Button>
													</StyledTableCell>
												</StyledTableRow>
											))
										) : (
											<Empty colSpan={7} text={'No Education Information'} />
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

export default EducationTransactionsTable;
