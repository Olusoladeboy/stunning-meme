import React, { useState } from 'react';
import {
	useTheme,
	Box,
	TableBody,
	TableHead,
	TableRow,
	Table,
	Typography,
} from '@mui/material';
import moment from 'moment';
import { StyledTableRow, StyledTableCell } from './components';
import { ErrorBoundary, LIGHT_GRAY, IActivation } from 'utilities';
import TableLoader from '../loader/table-loader';
import Empty from '../empty/table-empty';
import CustomTableCell from './components/custom-table-cell';
// import Loader from 'components/loader';
import ModalWrapper from 'components/modal/Wrapper';
import { red } from '@mui/material/colors';

type Props = {
	data?: IActivation[] | null;
	isLoading?: boolean;
	clearSearch?(): void;
	searchTransaction?(value: string): void;
	handleSelectCommission?: (activations: IActivation) => void;
};

const BusinessServiceActivationTable = ({
	isLoading,
	data,
	handleSelectCommission,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const [selectedActivation, setSelectedActivation] =
		useState<IActivation | null>(null);

	return (
		<>
			{selectedActivation && (
				<ModalWrapper
					closeModal={() => setSelectedActivation(null)}
					title={'Activation'}
				>
					<Box
						sx={{
							display: 'grid',
							gap: '8px',
						}}
					>
						{Object.keys(selectedActivation.activations).map((value) => {
							const item = selectedActivation.activations[value];
							if (item.active) {
								return (
									<Box>
										<Typography sx={{ fontSize: '18px' }}>
											Service: {value}
										</Typography>
										<Typography>
											Transaction Reference: {item.trxref || 'No reference'}
										</Typography>
										<Typography>
											Status: {item.active ? 'ACTIVE' : 'NOT ACTIVE'}
										</Typography>
									</Box>
								);
							}

							return null;
						})}
					</Box>
				</ModalWrapper>
			)}
			{/* {isDeleting && <Loader />} */}
			<Box sx={{ overflow: 'auto' }}>
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
								<CustomTableCell label={'Service'} />
								<CustomTableCell label={'Date'} />
								<CustomTableCell label={'Time'} />
								{/* <CustomTableCell label={'Actions'} /> */}
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
								<TableLoader colSpan={3} />
							) : (
								data && (
									<>
										{data.length > 0 ? (
											data.map((row: IActivation) => (
												<StyledTableRow
													onClick={() => setSelectedActivation(row)}
													key={row.id}
												>
													<StyledTableCell style={styles.text}>
														{row?.activations &&
															Object.keys(row.activations)
																.filter((value) => {
																	if (row.activations[value].active) {
																		return value;
																	}

																	return '';
																})
																.join(', ')}
													</StyledTableCell>

													<StyledTableCell style={styles.text}>
														{moment(row.createdAt).format('ll')}
													</StyledTableCell>
													<StyledTableCell style={styles.text}>
														{moment(row.createdAt).format('LT')}
													</StyledTableCell>
													{/* <StyledTableCell
														sx={{
															display: 'flex',
															gap: '5px',
															alignItems: 'center',
														}}
													>
														<Button
															onClick={() => {
																typeof handleSelectCommission === 'function' &&
																	handleSelectCommission(row);
															}}
															style={styles.updateButton}
															variant='outlined'
														>
															Update
														</Button>
														<Button
															onClick={() => handleMutateDelete(row.id)}
															style={styles.deleteButton}
															variant='outlined'
														>
															Delete
														</Button>
													</StyledTableCell> */}
												</StyledTableRow>
											))
										) : (
											<Empty colSpan={3} text={'No available activations'} />
										)}
									</>
								)
							)}
						</TableBody>
					</Table>
				</ErrorBoundary>
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.primary.main,
	},
	deleteButton: {
		backgroundColor: red['600'],
		color: 'white',
		borderColor: red['600'],
	},
	updateButton: {
		backgroundColor: theme.palette.secondary.main,
		color: 'white',
		borderColor: theme.palette.secondary.main,
	},
});

export default BusinessServiceActivationTable;
