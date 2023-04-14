import React from 'react';
import {
	TableBody,
	TableHead,
	TableRow,
	Table,
	useTheme,
	Box,
	Button,
	styled,
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { StyledTableCell, StyledTableRow } from './components';
import { LIGHT_GRAY, formatNumberToCurrency } from '../../utilities';
import Loader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import SearchInput from '../form-components/search-input';
import CustomTableCell from './components/custom-table-cell';

type Props = {
	conversions:
		| {
				[key: string]: any;
		  }[]
		| null;
	isLoading?: boolean;
	handleSort?: (filter: string) => void;
	handleSearch?: (search: string) => void;
	clearSearch?: () => void;
};

const ConversionsTable = ({
	conversions,
	isLoading,
	handleSort,
	handleSearch,
	clearSearch,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const handleSortRecord = (field: string) => {
		typeof handleSort !== 'undefined' && handleSort(field);
	};

	return (
		<Container sx={{ overflow: 'auto' }}>
			<SearchContainer>
				<SearchInput
					sx={{ maxWidth: '400px', width: '100%' }}
					placeholder='Search conversion with phone or reference ID...'
					handleSearch={handleSearch}
					clearSearch={clearSearch}
					fullWidth
				/>
			</SearchContainer>
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
						<CustomTableCell
							onClick={() => handleSortRecord('user')}
							label={'User'}
							isSortable
						/>
						<CustomTableCell
							onClick={() => handleSortRecord('id')}
							label={'Order ID'}
						/>
						<CustomTableCell
							onClick={() => handleSortRecord('network')}
							style={styles.headTableCell}
							label={'Network'}
						/>
						<CustomTableCell
							onClick={() => handleSortRecord('number')}
							style={styles.headTableCell}
							label={'Number'}
						/>

						<CustomTableCell
							onClick={() => handleSortRecord('amount')}
							style={styles.headTableCell}
							label={'Income'}
						/>
						<CustomTableCell
							onClick={() => handleSortRecord('return_amount')}
							style={styles.headTableCell}
							label={'Return'}
						/>
						<CustomTableCell
							onClick={() => handleSortRecord('status')}
							style={styles.headTableCell}
							label={'Status'}
						/>
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
													{conversion.reference}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{conversion.network.name}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{conversion.phone_number}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(conversion.amount)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(conversion.return_amount)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{/* {conversion.status} */}
													<Box sx={{ display: 'flex', gap: theme.spacing(2) }}>
														<ApproveButton size={'small'}>
															Approve
														</ApproveButton>
														<DeclineButton size={'small'}>
															Decline
														</DeclineButton>
													</Box>
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
		</Container>
	);
};

const Container = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	overflow: 'auto',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	padding: '0px 15px',
	marginBottom: '2rem',
}));

const ApproveButton = styled(Button)(({ theme }) => ({
	color: grey['50'],
	backgroundColor: green['600'],
}));

const DeclineButton = styled(Button)(({ theme }) => ({
	color: grey['50'],
	backgroundColor: red['600'],
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

export default ConversionsTable;
