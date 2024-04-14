import {
	TableBody,
	TableHead,
	Table,
	useTheme,
	Box,
	styled,
} from '@mui/material';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from './components';
import {
	IPurchasedBill,
	User,
	extractUserName,
	formatNumberToCurrency,
} from 'utilities';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from 'components/loader/table-loader';

type Props = {
	data: IPurchasedBill[];
	isLoading?: boolean;
};

const CableTransactionsTable = ({ data, isLoading }: Props) => {
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
							<CustomTableCell
								style={styles.headTableCell}
								label={'Card number'}
							/>
							<CustomTableCell style={styles.headTableCell} label={'User'} />
							<CustomTableCell
								style={styles.headTableCell}
								label={'Cable Provider'}
							/>
							<CustomTableCell style={styles.headTableCell} label={'Amount'} />
							<CustomTableCell style={styles.headTableCell} label={'Date'} />

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
							<TableLoader colSpan={8} />
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
													{value.card_number}
												</StyledTableCell>
												<StyledTableCell
													sx={{
														whiteSpace: 'nowrap',
													}}
													style={styles.text}
												>
													{value.user &&
														Object.keys(value.user).length > 0 &&
														extractUserName(value?.user as User)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.name}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(value.amount)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{moment(value.createdAt).format('ll')}
												</StyledTableCell>

												<StyledTableCell style={styles.text}>
													{value.status}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={8} text={'No Cable Information'} />
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

export default CableTransactionsTable;
