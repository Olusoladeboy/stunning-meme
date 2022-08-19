import React, { CSSProperties } from 'react';
import Table from '@mui/material/Table';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell, StyledTableRow } from './components';
import { LIGHT_GRAY } from '../../utilities/constant';
import FilterIcon from '../icons/filter';
import Loader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import formatNumberToCurrency from '../../utilities/helpers/formatNumberToCurrency';
import SearchInput from '../form-components/search-input';

type Props = {
	conversions:
		| {
				[key: string]: any;
		  }[]
		| null;
	isLoading?: boolean;
	handleSort?: (filter: string) => void;
	handleSearch?: (search: string) => void;
};

const ConversionsTable = ({
	conversions,
	isLoading,
	handleSort,
	handleSearch,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const handleSortRecord = (field: string) => {
		typeof handleSort !== 'undefined' && handleSort(field);
	};

	return (
		<Box style={styles.container as CSSProperties} sx={{ overflow: 'auto' }}>
			<Box style={styles.searchInput}>
				<SearchInput
					sx={{ maxWidth: '400px', width: '100%' }}
					placeholder='Search...'
					handleSearch={handleSearch}
					fullWidth
				/>
			</Box>
			<Table sx={{ overflow: 'auto' }} stickyHeader>
				<TableHead
					sx={{
						'& tr': {
							backgroundColor: LIGHT_GRAY,
							color: theme.palette.primary.main,
						},
					}}
				>
					<TableRow>
						<StyledTableCell
							onClick={() => handleSortRecord('user')}
							style={styles.headTableCell}
						>
							<Box style={styles.filterWrapper}>
								<Typography>User</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell
							onClick={() => handleSortRecord('id')}
							style={styles.headTableCell}
						>
							<Box style={styles.filterWrapper}>
								<Typography>Order ID</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell
							onClick={() => handleSortRecord('network')}
							style={styles.headTableCell}
						>
							<Box style={styles.filterWrapper}>
								<Typography>Network</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell
							onClick={() => handleSortRecord('number')}
							style={styles.headTableCell}
						>
							<Box style={styles.filterWrapper}>
								<Typography>Number</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>

						<StyledTableCell
							onClick={() => handleSortRecord('amount')}
							style={styles.headTableCell}
						>
							<Box style={styles.filterWrapper}>
								<Typography>Income</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell
							onClick={() => handleSortRecord('return_amount')}
							style={styles.headTableCell}
						>
							<Box style={styles.filterWrapper}>
								<Typography>Return</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
						<StyledTableCell
							onClick={() => handleSortRecord('status')}
							style={styles.headTableCell}
						>
							<Box style={styles.filterWrapper}>
								<Typography>Status</Typography>
								<FilterIcon />
							</Box>
						</StyledTableCell>
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
						<Loader colSpan={7} />
					) : (
						conversions && (
							<>
								{conversions.length > 0 ? (
									conversions.map((conversion, key) => {
										return (
											<StyledTableRow key={key}>
												<StyledTableCell style={styles.text}>
													{conversion.user && conversion.user.firstname}{' '}
													{conversion.user && conversion.user.lastname}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{conversion.id}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{conversion.network.name}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{conversion.phone_number}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(
														conversion.amount.$numberDecimal
													)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(
														conversion.return_amount.$numberDecimal
													)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{conversion.status}
												</StyledTableCell>
											</StyledTableRow>
										);
									})
								) : (
									<Empty colSpan={7} text={'No Airtime Convert'} />
								)}
							</>
						)
					)}
				</TableBody>
			</Table>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	tableHeader: {
		padding: '0px 32px',
		marginBottom: theme.spacing(3),
	},
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

export default ConversionsTable;
