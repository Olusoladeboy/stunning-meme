import {
	TableBody,
	TableHead,
	Table,
	useTheme,
	Box,
	styled,
} from '@mui/material';
import { StyledTableCell, StyledTableRow } from './components';
import {
	Transaction,
	checkAmount,
	formatNumberToCurrency,
	extractUserName,
} from 'utilities';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from 'components/loader/table-loader';

type Props = {
	data: Transaction[];
	isLoading?: boolean;
};

const AutoAirtimeConversionTransactionsTable = ({ data, isLoading }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
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
							<CustomTableCell style={styles.headTableCell} label={'User'} />
							<CustomTableCell style={styles.headTableCell} label={'Network'} />
							<CustomTableCell style={styles.headTableCell} label={'Phone'} />
							<CustomTableCell style={styles.headTableCell} label={'Amount'} />
							<CustomTableCell
								style={styles.headTableCell}
								label={'Return Amount'}
							/>

							<CustomTableCell style={styles.headTableCell} label={'Status'} />
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
													{extractUserName(value.user)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{typeof value.network === 'object' &&
														value.network?.name}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.phone_number}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(checkAmount(value.amount))}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(
														checkAmount(value.return_amount)
													)}
												</StyledTableCell>

												<StyledTableCell style={styles.text}>
													{value.status}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty
											colSpan={7}
											text={'No Auto Airtime Conversion Information'}
										/>
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

export default AutoAirtimeConversionTransactionsTable;
