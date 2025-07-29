import React, { useState } from 'react';
import Table from '@mui/material/Table';
import moment from 'moment';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import JsonFormatter from 'react-json-formatter';
import {
	LIGHT_GRAY,
	BOX_SHADOW,
	checkAmount,
	formatNumberToCurrency,
} from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import { grey } from '@mui/material/colors';

import Empty from '../empty/table-empty';
import { IGroupTransaction } from 'utilities';
import Button from 'components/button';
import { useHandleError } from 'hooks';
import { apiLogs } from 'api';
import ModalWrapper from 'components/modal/Wrapper';
import Loader from 'components/loader';

interface Props {
	transactions: IGroupTransaction[];
}

const AutoConversionTaskTable: React.FC<Props> = ({ transactions }) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const handleError = useHandleError();
	const [isLoadingApiLog, setLoadingApiLog] = useState<boolean>(false);
	const [jsonData, setJsonData] = useState<string>('');

	const jsonStyle = {
		propertyStyle: { color: 'red' },
		stringStyle: { color: 'green' },
		numberStyle: { color: 'darkorange' },
	};

	const queryApiLog = async (reference: string) => {
		try {
			setLoadingApiLog(true);
			const res = await apiLogs({
				reference,
			});

			if (res.success) {
				const data = res.payload;
				setJsonData(JSON.stringify(data[0].api_log));

				console.log(data);
			}
		} catch (error) {
			const response = handleError({ error });
			if (response?.message) {
				alert({
					message: response.message,
					type: 'error',
				});
			}
		} finally {
			setLoadingApiLog(false);
		}
	};

	return (
		<>
			{isLoadingApiLog && <Loader />}
			{jsonData && (
				<ModalWrapper
					title={'API Logs'}
					hasCloseButton={true}
					closeModal={() => setJsonData('')}
				>
					<Box
						sx={{
							overflow: 'auto',
							maxWidth: '540px',
							width: '100%',
							alignSelf: 'flex-start',
						}}
					>
						<JsonFormatter json={jsonData} tabWith={4} jsonStyle={jsonStyle} />
					</Box>
				</ModalWrapper>
			)}
			<Box sx={{ overflow: 'auto' }}>
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
							<TableCell>Reference</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell sx={{ whiteSpace: 'nowrap' }}>
								SIM Balance Before
							</TableCell>
							<TableCell sx={{ whiteSpace: 'nowrap' }}>
								SIM Balance After
							</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Time</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Response</TableCell>

							{/* <TableCell sx={{ minWidth: '50px', maxWidth: '100px' }} /> */}
						</TableRow>
					</TableHead>
					<TableBody
						sx={{
							'& tr': {
								color: theme.palette.primary.main,
							},
						}}
					>
						{transactions.length > 0 ? (
							transactions.map((transaction: IGroupTransaction) => {
								return (
									<TableRow key={transaction.id}>
										<TableCell style={styles.text}>
											{transaction.reference}
										</TableCell>
										<TableCell style={styles.text}>
											{formatNumberToCurrency(checkAmount(transaction.amount))}
										</TableCell>
										<TableCell style={styles.text}>
											{transaction.simBalanceLog.before}
										</TableCell>
										<TableCell style={styles.text}>
											{transaction.simBalanceLog.after}
										</TableCell>
										<TableCell style={styles.text}>
											{moment(transaction.createdAt).format('l')}
										</TableCell>
										<TableCell
											sx={{ whiteSpace: 'nowrap' }}
											style={styles.text}
										>
											{moment(transaction.createdAt).format('LT')}
										</TableCell>
										<TableCell style={styles.text}>
											{transaction.status}
										</TableCell>
										<TableCell sx={{ minWidth: '500px' }} style={styles.text}>
											{transaction.networkResponse}
										</TableCell>
										<TableCell sx={{ minWidth: '120px' }} style={styles.text}>
											<Button
												onClick={(e) => {
													e.stopPropagation();
													queryApiLog(transaction.reference);
												}}
												sx={{
													textDecoration: 'underline !important',
												}}
											>
												View Log
											</Button>
										</TableCell>
									</TableRow>
								);
							})
						) : (
							<Empty colSpan={7} text={'No Airtime Convert'} />
						)}
					</TableBody>
				</Table>
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	editNetwork: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		cursor: 'pointer',
		userSelect: 'none',
	},
	statusBtnWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(4),
	},
	text: {
		color: theme.palette.primary.main,
	},
});

export default AutoConversionTaskTable;
