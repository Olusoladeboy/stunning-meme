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
import { useMutation, useQueryClient } from 'react-query';
import { StyledTableCell, StyledTableRow } from './components';
import { TransactionStatus, formatNumberToCurrency } from '../../utilities';
import TableLoader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import SearchInput from '../form-components/search-input';
import CustomTableCell from './components/custom-table-cell';
import { updateConvertAirtimeStatus } from '../../api';
import { useHandleError, useAlert } from '../../hooks';
import { STATUS, AirtimeConversion, QueryKeys } from '../../utilities';
import Loader from '../loader';

interface UpdateStatusPayload {
	id: string;
	status: string;
}

type Props = {
	conversions: AirtimeConversion[] | null;
	isLoading?: boolean;
	handleSort?: (filter: string) => void;
	handleSearch?: (search: string) => void;
	clearSearch?: () => void;
	isDisplaySearchField?: boolean;
	conversionType?: 'auto' | 'default';
};

const ConversionsTable = ({
	conversions,
	isLoading,
	handleSort,
	handleSearch,
	clearSearch,
	isDisplaySearchField = false,
	conversionType,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const handleError = useHandleError();
	const alert = useAlert();
	const queryClient = useQueryClient();

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
							conversions && (
								<>
									{conversions.length > 0 ? (
										conversions.map(
											(conversion: AirtimeConversion, key: number) => {
												return (
													<StyledTableRow key={conversion.id}>
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
															{formatNumberToCurrency(
																typeof conversion.amount === 'object'
																	? conversion.amount.$numberDecimal
																	: conversion.amount
															)}
														</StyledTableCell>
														<StyledTableCell style={styles.text}>
															{formatNumberToCurrency(
																typeof conversion.return_amount === 'object'
																	? conversion.return_amount.$numberDecimal
																	: conversion.return_amount
															)}
														</StyledTableCell>
														<StyledTableCell style={styles.text}>
															{/* {conversion.status} */}
															{conversion.status ===
															TransactionStatus.APPROVED ? (
																TransactionStatus.APPROVED
															) : conversion.status ===
															  TransactionStatus.DECLINED ? (
																TransactionStatus.DECLINED
															) : conversionType === 'auto' ? (
																conversion.status
															) : (
																<Box
																	sx={{
																		display: 'flex',
																		gap: theme.spacing(2),
																	}}
																>
																	<ApproveButton
																		onClick={() =>
																			handleUpdateStatus({
																				id: conversion.id,
																				status: STATUS.APPROVED,
																			})
																		}
																		size={'small'}
																	>
																		Approve
																	</ApproveButton>
																	<DeclineButton
																		onClick={() =>
																			handleUpdateStatus({
																				id: conversion.id,
																				status: STATUS.DECLINED,
																			})
																		}
																		size={'small'}
																	>
																		Decline
																	</DeclineButton>
																</Box>
															)}
														</StyledTableCell>
													</StyledTableRow>
												);
											}
										)
									) : (
										<Empty colSpan={7} text={'No Airtime Convert'} />
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

export default ConversionsTable;
