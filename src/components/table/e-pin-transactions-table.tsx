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
import { StyledTableCell, StyledTableRow } from './components';
import {
	JSON_STYLE,
	Transaction,
	extractUserName,
	formatNumberToCurrency,
} from 'utilities';
import JsonFormatter from 'react-json-formatter';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from 'components/loader/table-loader';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';
import ModalWrapper from 'components/modal/Wrapper';

type Props = {
	data: Transaction[];
	isLoading?: boolean;
};

const EPinTransactionsTable = ({ data, isLoading }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const [jsonData, setJsonData] = useState<string>('');

	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	const handleClickRow = (value: Transaction) => {
		console.log(value);
		setSelectedTransaction(value);
	};

	const handleViewToken = (transaction: Transaction) => {
		const jsonObj = transaction.pin_data;
		setJsonData(JSON.stringify(jsonObj));
	};

	return (
		<Container>
			{jsonData && (
				<ModalWrapper
					title={'Pin Data'}
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
							<CustomTableCell style={styles.headTableCell} label={'Service'} />
							<CustomTableCell style={styles.headTableCell} label={'User'} />
							<CustomTableCell style={styles.headTableCell} label={'Network'} />
							<CustomTableCell style={styles.headTableCell} label={'Pin'} />
							<CustomTableCell style={styles.headTableCell} label={'Amount'} />
							<CustomTableCell style={styles.headTableCell} label={'Date'} />
							<CustomTableCell style={styles.headTableCell} label={'Status'} />
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
							<TableLoader colSpan={8} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((value) => (
											<StyledTableRow
												onClick={() => handleClickRow(value)}
												key={value.id}
											>
												<StyledTableCell style={styles.text}>
													{value.service}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.user &&
														typeof value.user === 'object' &&
														Object.keys(value.user).length > 0 &&
														extractUserName(value.user)}
												</StyledTableCell>

												<StyledTableCell style={styles.text}>
													{value.pin_data &&
														value.pin_data.network &&
														typeof value.pin_data.network === 'object' &&
														Object.keys(value.pin_data.network).length > 0 &&
														value.pin_data.network.name}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.pin}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(
														typeof value.amount === 'object'
															? value.amount.$numberDecimal
															: value.amount
													)}
												</StyledTableCell>

												<StyledTableCell style={styles.text}>
													{moment(value.createdAt).format('ll')}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.status}
												</StyledTableCell>
												<StyledTableCell>
													<Button
														onClick={(e) => {
															e.stopPropagation();
															handleViewToken(value);
														}}
													>
														View Pin Data
													</Button>
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={8} text={'No available EPin'} />
									)}
								</>
							)
						)}
					</TableBody>
				</Table>
			</Box>
		</Container>
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

export default EPinTransactionsTable;
