import React, { useState, useEffect } from 'react';
import {
	Table,
	Box,
	Typography,
	useTheme,
	TableBody,
	TableHead,
	TableRow,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import moment from 'moment';
import { StyledTableRow, StyledTableCell } from './components';
import {
	UserDetails,
	QueryKey,
	UserNavList,
	Transaction,
	formatNumberToCurrency,
	LINKS,
	MAX_RECORDS,
	LIGHT_GRAY,
} from '../../utilities';
import SearchInput from '../form-components/search-input';
import { useAppSelector } from '../../store/hooks';
import Loader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import Pagination from '../pagination';
import { useAlert, useHandleError } from '../../hooks';
import { transactions } from '../../api';
import CustomTableCell from './components/custom-table-cell';

type Props = {
	user: UserDetails | null;
};

const WalletSummaryTable = ({ user }: Props) => {
	const theme = useTheme();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const location = useLocation();
	const query = queryString.parse(location.search);

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const { token } = useAppSelector((store) => store.authState);

	const { isLoading, data } = useQuery(
		[QueryKey.UserWalletTransaction, user?.id, page],
		() =>
			transactions({
				params: {
					user: user?.id,
					sort: '-createdAt',
					limit: MAX_RECORDS,
					skip: (page - 1) * MAX_RECORDS,
				},
			}),
		{
			enabled: !!(token && user),
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						setAlert({ message: response.message, type: 'error' });
				}

				if (data && data.success) {
					const total = data.metadata.total;
					setTotal(data.metadata.total);
					const count = Math.ceil(total / MAX_RECORDS);
					setCount(count);
				}
			},
		}
	);

	const handlePageChange = (page: number) => {
		if (page !== 1) {
			setPage(page);
			navigate(
				`${LINKS.User}/${user?.id}?tab=${UserNavList.WalletSummary}&page=${page}`
			);
		} else {
			navigate(`${LINKS.User}/${user?.id}?tab=${UserNavList.WalletSummary}`);
			setPage(page);
		}
	};

	return (
		<Box sx={{ overflow: 'auto' }}>
			<Box
				sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' } }}
				style={styles.tableHeader}
			>
				<Typography variant={'h5'}>User Wallet Summary</Typography>
				<Box
					sx={{
						display: 'flex',
						maxWidth: '320px',
						width: '100%',
						gap: theme.spacing(3),
					}}
				>
					<SearchInput fullWidth placeholder={'Search...'} />
				</Box>
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
						<CustomTableCell label={'Reference'} isSortable />
						<CustomTableCell label={'Amount'} isSortable />
						<CustomTableCell label={'Product'} isSortable />
						<CustomTableCell label={'Prev Balance'} />
						<CustomTableCell label={'New Balance'} isSortable />

						<CustomTableCell label={'Date'} isSortable />
						<CustomTableCell label={'Time'} isSortable />
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
						data && (
							<>
								{data.payload.length > 0 ? (
									data.payload.map((row: Transaction) => (
										<StyledTableRow key={row.id}>
											<StyledTableCell style={styles.text}>
												{row.reference}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{formatNumberToCurrency(
													typeof row.amount !== 'string'
														? row.amount.$numberDecimal
														: row.amount
												)}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{row.transaction
													? row.transaction.service
													: row.type
													? row.type
													: 'No Available Service'}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{formatNumberToCurrency(
													row.balanceBefore
														? typeof row.balanceBefore !== 'string'
															? row.balanceBefore.$numberDecimal
															: row.balanceBefore
														: 0
												)}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{formatNumberToCurrency(
													row.balanceAfter
														? typeof row.balanceAfter !== 'string'
															? row.balanceAfter.$numberDecimal
															: row.balanceAfter
														: 0
												)}
											</StyledTableCell>

											<StyledTableCell style={styles.text}>
												{moment.utc(row.createdAt).format('ll')}
											</StyledTableCell>
											<StyledTableCell style={styles.text}>
												{moment.utc(row.createdAt).format('LT')}
											</StyledTableCell>
										</StyledTableRow>
									))
								) : (
									<Empty colSpan={7} text={'No Wallet Summary'} />
								)}
							</>
						)
					)}
				</TableBody>
			</Table>

			{total > MAX_RECORDS && (
				<Box style={styles.paginationWrapper}>
					<Pagination
						sx={{}}
						size={'large'}
						variant={'outlined'}
						shape={'rounded'}
						page={page}
						count={count}
						onChange={(e, number) => handlePageChange(number)}
					/>
				</Box>
			)}
		</Box>
	);
};

const useStyles = (theme: any) => ({
	tableHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(3),
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.primary.main,
	},
	paginationWrapper: {
		marginRight: '20px',
		marginTop: '2rem',
		display: 'flex',
		justifyContent: 'flex-end',
	},
});

export default WalletSummaryTable;
