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
import { IEpin, extractUserName, formatNumberToCurrency } from 'utilities';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from 'components/loader/table-loader';

type Props = {
	data: IEpin[];
	isLoading?: boolean;
};

const EPinTransactionsTable = ({ data, isLoading }: Props) => {
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
							<CustomTableCell style={styles.headTableCell} label={'Name'} />
							<CustomTableCell style={styles.headTableCell} label={'Service'} />
							<CustomTableCell style={styles.headTableCell} label={'Network'} />
							<CustomTableCell style={styles.headTableCell} label={'Pin'} />
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
							<TableLoader colSpan={7} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((value) => (
											<StyledTableRow key={value.id}>
												<StyledTableCell style={styles.text}>
													{value.user &&
														typeof value.user === 'object' &&
														Object.keys(value.user).length > 0 &&
														extractUserName(value.user)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{value.service}
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
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={7} text={'No available EPin'} />
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
