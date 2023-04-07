import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import { useQuery } from 'react-query';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { StyledTableRow, StyledTableCell } from './components';
import {
	UserDetails,
	QueryKey,
	UserNavList,
	Transaction,
	MAX_RECORDS,
	LINKS,
	formatNumberToCurrency,
	ErrorBoundary,
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

const UserTransactionsTable = ({ user }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const setAlert = useAlert();
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
		[QueryKey.UserTransactions, user?.id, page],
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
				`${LINKS.User}/${user?.id}?tab=${UserNavList.Transaction}&page=${page}`
			);
		} else {
			navigate(`${LINKS.User}/${user?.id}?tab=${UserNavList.Transaction}`);
			setPage(page);
		}
	};

	return (
		<Box sx={{ overflow: 'auto' }}>
			<Box
				sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' } }}
				style={styles.tableHeader}
			>
				<Typography variant={'h5'}>User Transaction Summary</Typography>
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
			<ErrorBoundary>
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
							<CustomTableCell isSortable label={'Transaction'} />
							<CustomTableCell isSortable label={'Reference'} />
							<CustomTableCell isSortable label={'Amount'} />
							<CustomTableCell label={'Date'} />
							<CustomTableCell label={'Time'} />
							<CustomTableCell label={'Status'} />
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
							<Loader colSpan={6} />
						) : (
							data && (
								<>
									{data.payload.length > 0 ? (
										data.payload.map((row: Transaction) => (
											<StyledTableRow key={row.id}>
												<StyledTableCell style={styles.text}>
													{row.transaction
														? row.transaction.service
														: row.service
														? row.service
														: row.type}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{row.transaction
														? row.transaction.reference
														: row.reference}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{formatNumberToCurrency(
														typeof row.amount !== 'string'
															? row.amount.$numberDecimal
															: row.amount
													)}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{moment.utc(row.createdAt).format('ll')}
												</StyledTableCell>
												<StyledTableCell style={styles.text}>
													{moment.utc(row.createdAt).format('LT')}
												</StyledTableCell>

												<StyledTableCell style={styles.text}>
													{row.status}
												</StyledTableCell>
											</StyledTableRow>
										))
									) : (
										<Empty colSpan={6} text={'No Wallet Summary'} />
									)}
								</>
							)
						)}
					</TableBody>
				</Table>

				{total > MAX_RECORDS && (
					<Pagination
						sx={{ marginLeft: '20px', marginTop: '2rem' }}
						size={'large'}
						variant={'outlined'}
						shape={'rounded'}
						page={page}
						count={count}
						onChange={(e, number) => handlePageChange(number)}
					/>
				)}
			</ErrorBoundary>
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
});

export default UserTransactionsTable;
