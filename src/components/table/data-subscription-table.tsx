import React from 'react';
import {
	TableBody,
	TableHead,
	Table,
	useTheme,
	Box,
	Button,
	styled,
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { StyledTableCell, StyledTableRow } from './components';
import {
	Transaction,
	TransactionStatus,
	formatNumberToCurrency,
	STATUS,
	QueryKeys,
	extractUserName,
	User,
	LINKS,
	checkAmount,
} from 'utilities';
import TableLoader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import SearchInput from '../form-components/search-input';
import CustomTableCell from './components/custom-table-cell';
import { updateConvertAirtimeStatus } from 'api';
import Loader from '../loader';
import { useAlert, useHandleError } from 'hooks';

interface UpdateStatusPayload {
	id: string;
	status: string;
}

type Props = {
	subscriptions: Transaction[] | null;
	isLoading?: boolean;
	handleSort?: (filter: string) => void;
	handleSearch?: (search: string) => void;
	clearSearch?: () => void;
	isDisplaySearchField?: boolean;
};

const DataSubscriptionTable = ({
	subscriptions,
	isLoading,
	handleSort,
	handleSearch,
	clearSearch,
	isDisplaySearchField = false,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const handleError = useHandleError();
	const alert = useAlert();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const handleSortRecord = (field: string) => {
		typeof handleSort !== 'undefined' && handleSort(field);
	};

	/* 
		Mutation
	*/
	const { isLoading: isUpdatingStatus, mutate } = useMutation(
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

	const handleUpdateStatus = ({ status, id }: UpdateStatusPayload) => {
		mutate({
			id,
			data: { status },
		});
	};

	const handleClickRow = (id: string) => {};

	return (
		<Container>
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
							subscriptions && (
								<>
									{subscriptions.length > 0 ? (
										subscriptions.map((subscription, key: number) => {
											return (
												<StyledTableRow
													onClick={() => handleClickRow(subscription.id)}
													key={subscription.id}
												>
													<StyledTableCell style={styles.text}>
														{subscription.reference}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{extractUserName(subscription?.user as User)}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														Network
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{typeof subscription.plan === 'object' &&
															subscription.plan.name}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{typeof subscription.dataType === 'object' &&
															subscription.dataType.name}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{subscription.number}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{formatNumberToCurrency(
															checkAmount(subscription.amount)
														)}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{subscription.status}
													</StyledTableCell>
												</StyledTableRow>
											);
										})
									) : (
										<Empty colSpan={8} text={'No Airtime Convert'} />
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
	// overflow: 'auto',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	padding: '0px 15px',
	marginBottom: '2rem',
}));

const ApproveButton = styled(Button)(({ theme }) => ({
	color: grey['50'],
	backgroundColor: `${green['600']} !important`,
}));

const DeclineButton = styled(Button)(({ theme }) => ({
	color: grey['50'],
	backgroundColor: `${red['600']} !important`,
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

export default DataSubscriptionTable;
