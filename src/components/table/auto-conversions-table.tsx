import React from 'react';
import {
	TableBody,
	TableHead,
	Table,
	useTheme,
	Box,
	styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { StyledTableCell, StyledTableRow } from './components';
import {
	formatNumberToCurrency,
	QueryKeys,
	LINKS,
	IGroupAutoTransaction,
	extractUserName,
} from 'utilities';
import TableLoader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import SearchInput from '../form-components/search-input';
import CustomTableCell from './components/custom-table-cell';
import { updateConvertAirtimeStatus } from 'api';
import Loader from '../loader';
import { useAlert, useHandleError } from 'hooks';

type Props = {
	conversions: IGroupAutoTransaction[] | null;
	isLoading?: boolean;
	handleSort?: (filter: string) => void;
	handleSearch?: (search: string) => void;
	clearSearch?: () => void;
	isDisplaySearchField?: boolean;
};

const AutoConversionsTable = ({
	conversions,
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

	const handleClickRow = (id: string) => {
		navigate(`${LINKS.AutoConversions}/${id}`);
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
								label={'Total Amount'}
							/>
							<CustomTableCell
								onClick={() => handleSortRecord('return_amount')}
								style={styles.headTableCell}
								label={'Total Return Amount'}
							/>

							<CustomTableCell
								style={styles.headTableCell}
								label={'Number of Share'}
							/>
							<CustomTableCell style={styles.headTableCell} label={'Date'} />
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
							conversions && (
								<>
									{conversions.length > 0 ? (
										conversions.map(
											(conversion: IGroupAutoTransaction, key: number) => {
												return (
													<StyledTableRow
														onClick={() =>
															handleClickRow(
																conversion?.transactions[0].reference
															)
														}
														key={conversion.id}
													>
														<StyledTableCell style={styles.text}>
															{extractUserName(conversion?.user)}
														</StyledTableCell>
														<StyledTableCell style={styles.text}>
															{conversion.id}
														</StyledTableCell>
														<StyledTableCell style={styles.text}>
															{(conversion.network &&
																typeof conversion.network === 'object' &&
																conversion.network?.name) ||
																'No Network name'}
														</StyledTableCell>
														<StyledTableCell style={styles.text}>
															{conversion.phone_number}
														</StyledTableCell>
														<StyledTableCell style={styles.text}>
															{formatNumberToCurrency(
																typeof conversion.totalAmount === 'object'
																	? conversion.totalAmount.$numberDecimal
																	: conversion.totalAmount
															)}
														</StyledTableCell>
														<StyledTableCell style={styles.text}>
															{formatNumberToCurrency(
																typeof conversion.totalReturnAmount === 'object'
																	? conversion.totalReturnAmount.$numberDecimal
																	: conversion.totalReturnAmount
															)}
														</StyledTableCell>

														<StyledTableCell style={styles.text}>
															{conversion?.count}
														</StyledTableCell>
														<StyledTableCell style={styles.text}>
															{moment(conversion?.createdAt).format('ll')}
														</StyledTableCell>
													</StyledTableRow>
												);
											}
										)
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

export default AutoConversionsTable;
