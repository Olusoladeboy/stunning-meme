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
	IPurchasedBill,
	extractUserName,
	formatNumberToCurrency,
	JSON_STYLE,
} from 'utilities';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from 'components/loader/table-loader';
import ModalWrapper from 'components/modal/Wrapper';

type Props = {
	data: IPurchasedBill[];
	isLoading?: boolean;
};

const ElectricityTransactionsTable = ({ data, isLoading }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const [jsonData, setJsonData] = useState<string>('');

	const handleViewToken = (bill: IPurchasedBill) => {
		const jsonObj = bill.electricity_token;
		setJsonData(JSON.stringify(jsonObj));
	};

	return (
		<>
			{jsonData && (
				<ModalWrapper
					title={'Electricity token'}
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
								<CustomTableCell
									style={styles.headTableCell}
									label={'Service provider'}
								/>
								<CustomTableCell
									style={styles.headTableCell}
									label={'Amount'}
								/>
								<CustomTableCell style={styles.headTableCell} label={'User'} />
								<CustomTableCell style={styles.headTableCell} label={'Data'} />

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
												<StyledTableRow key={value.reference}>
													<StyledTableCell style={styles.text}>
														{value.reference}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{value.name.replace(/_/g, ' ')}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{formatNumberToCurrency(value.amount)}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{value.user &&
															typeof value.user === 'object' &&
															Object.keys(value.user).length > 0 &&
															extractUserName(value.user)}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{moment(value.createdAt).format('ll')}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{value.status}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														<Button onClick={() => handleViewToken(value)}>
															View token
														</Button>
													</StyledTableCell>
												</StyledTableRow>
											))
										) : (
											<Empty colSpan={7} text={'No available electricity'} />
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

export default ElectricityTransactionsTable;