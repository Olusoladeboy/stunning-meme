import React, { useRef, useState } from 'react';
import {
	TableBody,
	TableHead,
	Table,
	useTheme,
	Box,
	styled,
} from '@mui/material';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { StyledTableCell, StyledTableRow } from './components';
import {
	Transaction,
	formatNumberToCurrency,
	QueryKeys,
	extractUserName,
	User,
	checkAmount,
	MAX_RECORDS,
} from 'utilities';
import TableLoader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import SearchInput from '../form-components/search-input';
import CustomTableCell from './components/custom-table-cell';
import { updateConvertAirtimeStatus } from 'api';
import Loader from '../loader';
import { useAlert, useHandleError } from 'hooks';
import TablePagination from 'components/pagination/table-pagination';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';

type Props = {
	subscriptions: Transaction[] | null;
	isLoading?: boolean;
	handleSort?: (filter: string) => void;
	handleSearch?: (search: string) => void;
	clearSearch?: () => void;
	isDisplaySearchField?: boolean;
	total?: number;
	handleRefresh?: () => void;
	page?: number;
	handlePageChange?: (page: number) => void;
};

const DataSubscriptionTable = ({
	subscriptions,
	isLoading,
	handleSort,
	handleSearch,
	clearSearch,
	isDisplaySearchField = false,
	total,
	handleRefresh,
	handlePageChange,
	page,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const handleError = useHandleError();
	const alert = useAlert();
	const queryClient = useQueryClient();

	const [selectedTransaction, setSelectedTransaction] =
		useState<null | Transaction>(null);

	const maxRecordRef = useRef<number>(MAX_RECORDS);

	/* 
		Mutation
	*/
	const { isLoading: isUpdatingStatus } = useMutation(
		updateConvertAirtimeStatus,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}

				if (data && data.success) {
					queryClient.invalidateQueries([QueryKeys.ConvertAirtime]);
					queryClient.invalidateQueries([QueryKeys.RecentConvertAirtime]);
					alert({
						message: 'Airtime convert status updated successfully!!',
						type: 'success',
					});
				}
			},
		}
	);

	const handleChangeRowsPerPage = (value: number) => {
		maxRecordRef.current = value;
		typeof handleRefresh === 'function' && handleRefresh();
	};

	const handleClickRow = (value: Transaction) => {
		setSelectedTransaction(value);
	};

	return (
		<Container>
			{selectedTransaction && (
				<TransactionDetailsModal
					closeModal={() => setSelectedTransaction(null)}
					transaction={selectedTransaction as any}
					isDisplayButtons
				/>
			)}
			{isUpdatingStatus && <Loader />}
			{isDisplaySearchField && (
				<SearchContainer>
					<SearchInput
						sx={{ maxWidth: '400px', width: '100%' }}
						placeholder='Search conversion with phone or reference ID...'
						handleSearch={handleSearch}
						clearSearch={clearSearch}
						fullWidth
					/>
				</SearchContainer>
			)}
			<Box sx={{ overflow: 'auto' }}>
				<Table sx={{ overflow: 'auto' }}>
					<TableHead
						sx={{
							'& tr': {
								// backgroundColor: LIGHT_GRAY,
								color: theme.palette.primary.main,
							},
						}}
					>
						<StyledTableRow>
							<CustomTableCell label={'Reference'} isSortable />
							<CustomTableCell label={'User'} isSortable />
							<CustomTableCell style={styles.headTableCell} label={'Network'} />
							<CustomTableCell label={'Plan'} />
							<CustomTableCell label={'Data Type'} />
							<CustomTableCell style={styles.headTableCell} label={'Number'} />
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
							<TableLoader colSpan={9} />
						) : (
							subscriptions && (
								<>
									{subscriptions.length > 0 ? (
										subscriptions.map((subscription, key: number) => {
											return (
												<StyledTableRow
													onClick={() => handleClickRow(subscription)}
													key={subscription.id}
												>
													<StyledTableCell style={styles.text}>
														{subscription.reference}
													</StyledTableCell>
													<StyledTableCell
														sx={{
															whiteSpace: 'nowrap',
														}}
														style={styles.text}
													>
														{subscription.user &&
															extractUserName(subscription?.user as User)}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														Network
													</StyledTableCell>
													<StyledTableCell
														sx={{
															whiteSpace: 'nowrap',
														}}
														style={styles.text}
													>
														{subscription.plan &&
															typeof subscription.plan === 'object' &&
															subscription.plan.name}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{subscription.dataType &&
															typeof subscription.dataType === 'object' &&
															subscription.dataType.name}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{subscription.number && subscription.number}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{subscription.amount &&
															formatNumberToCurrency(
																checkAmount(subscription.amount)
															)}
													</StyledTableCell>

													<StyledTableCell
														sx={{
															whiteSpace: 'nowrap',
														}}
														style={styles.text}
													>
														{moment(subscription.createdAt).format('ll')}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{subscription.status}
													</StyledTableCell>
												</StyledTableRow>
											);
										})
									) : (
										<Empty
											colSpan={9}
											text={'No available data subscription'}
										/>
									)}
								</>
							)
						)}
					</TableBody>
				</Table>
			</Box>
			{!isLoading && parseInt(`${total}`) > maxRecordRef.current && (
				<Box style={styles.paginationWrapper}>
					<TablePagination
						page={Number(`${page}`) - 1}
						count={Number(total)}
						onPageChange={(value) =>
							typeof handlePageChange === 'function' &&
							handlePageChange(value + 1)
						}
						rowsPerPage={maxRecordRef.current}
						handleChangeRowsPerPage={handleChangeRowsPerPage}
					/>
					{/* <Pagination
								sx={{}}
								size={'large'}
								variant={'outlined'}
								shape={'rounded'}
								page={page}
								count={count}
								onChange={(e, number) => handlePageChange(number)}
							/> */}
				</Box>
			)}
		</Container>
	);
};

const Container = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	// overflow: 'auto',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	padding: '0px 15px',
	marginBottom: '2rem',
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
	paginationWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		paddingRight: '20px',
	},
});

export default DataSubscriptionTable;
