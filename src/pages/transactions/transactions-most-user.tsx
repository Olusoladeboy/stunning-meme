import React, {
	useState,
	useEffect,
	CSSProperties,
	MouseEvent,
	useRef,
} from 'react';
import queryString from 'query-string';
import {
	Box,
	Button,
	ClickAwayListener,
	List,
	ListItemButton,
	Popper,
	useTheme,
	Typography,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import {
	Layout,
	ModalWrapper,
	Pagination,
	TableHeader,
	TransactionsMostUserTable,
} from 'components';
import {
	BOX_SHADOW,
	MAX_RECORDS,
	LINKS,
	SECOUNDARY_COLOR,
	capitalize,
	removeSpecialChar,
} from 'utilities';
import { useAlert, usePageTitle, useQueryTransactionStatistics } from 'hooks';
import { ArrowDropDown } from '@mui/icons-material';
import DatePicker from 'components/form-components/date-picker';

export const TRANSACTION_SERVICE = {
	AIRTIME: 'AIRTIME',
	DATA: 'DATA',
	CABLE: 'CABLE',
	EDUCATION: 'EDUCATION',
	INTERNET: 'INTERNET',
	ELECTRICITY: 'ELECTRICITY',
	BETTING: 'BETTING',
	AIRTIME_CONVERSION: 'AIRTIME_CONVERSION',
	AUTO_AIRTIME_CONVERSION: 'AIRTIME_AUTO_CONVERSION',
};

const TransactionMostUsers = () => {
	usePageTitle('Transactions (Most User)');
	const theme = useTheme();
	const styles = useStyles(theme);
	const alert = useAlert();
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const location = useLocation();
	const query = queryString.parse(location.search);
	const [page, setPage] = useState<number>(Number(query?.page) || 1);
	const [total, setTotal] = useState<number>(0);
	const [isDisplayPicker, setDisplayPicker] = useState<boolean>(false);
	const startDate = useRef<string>('');
	const endDate = useRef<string>('');

	const {
		isLoadingTransactionStatistics,
		queryTransactionStatistics,
		dataTransactionStatistics,
	} = useQueryTransactionStatistics((payload, metadata) => {
		if (payload && Array.isArray(payload) && payload.length > 0) {
			console.log(payload, metadata);
			// const total = data.metadata.total;
			// setTotal(data.metadata.total);
			// const count = Math.ceil(total / MAX_RECORDS);
			// setCount(count);
		}
	});

	const [serviceAnchorEl, setServiceAnchorEl] = useState<null | HTMLElement>(
		null
	);
	const [transactionService, setTransactionService] = useState<string>('');

	const handleServiceClick = (e: MouseEvent<HTMLElement>) => {
		setServiceAnchorEl(serviceAnchorEl ? null : e.currentTarget);
	};

	useEffect(
		() => {
			// if (query && query.page) {
			// 	const page = parseInt(`${query.page}`);
			// 	setPage(page);
			// }
			// handleQueryTransaction(transactionService);
		},
		// eslint-disable-next-line
		[query, query?.page]
	);

	/*
	!TODO
	*Add start and end date param
	*/

	const handlePageChange = (page: number) => {
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.TransactionsMostUser}?page=${page}`);
		} else {
			navigate(LINKS.TransactionsMostUser);
			setPage(page);
		}
	};

	const handleQueryTransaction = () => {
		if (!transactionService) {
			alert({
				message: 'Select transaction service',
				type: 'info',
			});
			return;
		}

		let payload: { [key: string]: any } = {
			service: transactionService,
		};

		if (startDate.current) payload.start_date = startDate.current;
		if (endDate.current) payload.end_date = endDate.current;

		if (page > 1) payload.page = page;

		setDisplayPicker(false);
		queryTransactionStatistics(payload);
	};

	const closeModal = () => {
		setDisplayPicker(false);
		setTransactionService('');
	};
	const openModal = () => {
		setDisplayPicker(true);
		startDate.current = '';
		endDate.current = '';
	};

	const handleSetDateRange = (dateRange: any) => {
		// Clear state
		startDate.current = '';
		endDate.current = '';
		const rangeStartDate = moment(dateRange.startDate).format('YYYY-MM-DD');
		const rangeEndDate = moment(dateRange.endDate).format('YYYY-MM-DD');

		if (rangeStartDate === rangeEndDate) {
			startDate.current = rangeStartDate;
		} else {
			startDate.current = rangeStartDate;
			endDate.current = rangeEndDate;
		}
	};

	// const statusFilter = (
	// 	<Box
	// 		sx={{
	// 			display: 'flex',
	// 			alignItems: 'center',
	// 			gap: '10px',
	// 		}}
	// 	>
	// 		<TextInput placeholder='Start date' size='small' type='date' />
	// 		<TextInput placeholder='End date' size='small' />
	// 		<Box>
	// 			<ClickAwayListener onClickAway={() => setServiceAnchorEl(null)}>
	// 				<Box>
	// 					<Button
	// 						style={styles.button as CSSProperties}
	// 						onClick={(e) => handleServiceClick(e)}
	// 						variant={'outlined'}
	// 						endIcon={<ArrowDropDown />}
	// 					>
	// 						Filter by Service
	// 					</Button>
	// 					<Popper
	// 						sx={{ zIndex: theme.zIndex.modal }}
	// 						open={Boolean(serviceAnchorEl)}
	// 						anchorEl={serviceAnchorEl}
	// 					>
	// 						<List
	// 							sx={{
	// 								'& .MuiListItemButton-root': {
	// 									textTransform: 'capitalize',
	// 								},
	// 								'& .MuiListItemButton-root:hover': {
	// 									backgroundColor: theme.palette.primary.main,
	// 									color: grey[50],
	// 								},
	// 							}}
	// 							style={styles.list}
	// 						>
	// 							{Object.values(TRANSACTION_SERVICE).map((value) => (
	// 								<ListItemButton
	// 									sx={{
	// 										textTransform: 'capitalize',
	// 									}}
	// 									onClick={() => handleFilter(value)}
	// 									key={value}
	// 								>
	// 									{value}
	// 								</ListItemButton>
	// 							))}
	// 						</List>
	// 					</Popper>
	// 				</Box>
	// 			</ClickAwayListener>
	// 		</Box>
	// 	</Box>
	// );

	const statusFilter = (
		<Box
			sx={{
				marginTop: '10px',
				display: 'flex',
				alignItems: 'center',
				gap: '10px',
			}}
		>
			<Box>
				<ClickAwayListener onClickAway={() => setServiceAnchorEl(null)}>
					<Box>
						<Button
							style={
								{ ...styles.outlineBtn, minWidth: '120px' } as CSSProperties
							}
							onClick={(e) => handleServiceClick(e)}
							variant={'outlined'}
							endIcon={<ArrowDropDown />}
						>
							{capitalize(transactionService) || 'Select Service'}
						</Button>
						<Popper
							sx={{ zIndex: theme.zIndex.modal }}
							open={Boolean(serviceAnchorEl)}
							anchorEl={serviceAnchorEl}
						>
							<List
								sx={{
									'& .MuiListItemButton-root': {
										textTransform: 'capitalize',
									},
									'& .MuiListItemButton-root:hover': {
										backgroundColor: theme.palette.primary.main,
										color: grey[50],
									},
								}}
								style={styles.list}
							>
								{Object.values(TRANSACTION_SERVICE).map((value) => (
									<ListItemButton
										sx={{
											textTransform: 'capitalize',
										}}
										onClick={() => {
											setServiceAnchorEl(null);
											setTransactionService(value);
										}}
										key={value}
									>
										{capitalize(removeSpecialChar(value))}
									</ListItemButton>
								))}
							</List>
						</Popper>
					</Box>
				</ClickAwayListener>
			</Box>
			<Button
				style={styles.primaryButton as CSSProperties}
				onClick={(e) => handleQueryTransaction()}
			>
				Apply
			</Button>
		</Box>
	);

	return (
		<Layout>
			{isDisplayPicker && (
				<ModalWrapper
					title={'Filter Transaction'}
					contentWidth='700px'
					closeModal={closeModal}
				>
					<DatePicker
						cancelPicker={() => setDisplayPicker(false)}
						setDateRange={handleSetDateRange}
						customButton={statusFilter}
					/>
				</ModalWrapper>
			)}
			<Box style={styles.container}>
				<Box
					sx={{
						padding: { xs: '0px 15px', md: '0px 2rem' },
						display: 'grid',
						gap: '2rem',
					}}
				>
					<TableHeader
						canSearch={false}
						searchPlaceholder={'Search transaction by reference'}
						title={'Transactions (Most User)'}
						statusFilter={
							<Button
								style={styles.outlineBtn as CSSProperties}
								onClick={openModal}
								variant={'outlined'}
								// endIcon={<ArrowDropDown />}
							>
								Filter record
							</Button>
						}
					/>
				</Box>

				{transactionService && dataTransactionStatistics ? (
					<>
						<TransactionsMostUserTable
							isLoading={isLoadingTransactionStatistics}
							data={dataTransactionStatistics as any}
						/>
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
					</>
				) : (
					<Box
						sx={{
							padding: '0px 30px',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Typography>Select a service</Typography>
					</Box>
				)}
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'grid',
		gridTemplateColumn: '1fr',
		gap: theme.spacing(4),
		border: `0.5px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	paginationWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		paddingRight: '20px',
	},
	outlineBtn: {
		whiteSpace: 'nowrap',
	},
	primaryButton: {
		backgroundColor: `${SECOUNDARY_COLOR}`,
		color: 'white',
	},
	list: {
		border: `1px solid ${theme.palette.primary.main}`,
		borderRadius: theme.spacing(1),
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(2),
	},
});

export default TransactionMostUsers;
