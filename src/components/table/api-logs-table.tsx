import React, { useState } from 'react';
import { Table, TableBody, TableHead, useTheme, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import JsonFormatter from 'react-json-formatter';
import { IApiLog, LINKS, extractUserName } from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Empty from '../empty';
import Button from '../button';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from '../loader/table-loader';
import ModalWrapper from '../modal/Wrapper';

interface Props {
	data: IApiLog[] | null;
	isLoading: boolean;
}

const ApiLogsTable: React.FC<Props> = ({ data, isLoading }) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const jsonStyle = {
		propertyStyle: { color: 'red' },
		stringStyle: { color: 'green' },
		numberStyle: { color: 'darkorange' },
	};

	const [jsonData, setJsonData] = useState<string>('');

	const handleViewLog = (log: IApiLog) => {
		const jsonObj = log.api_log;

		setJsonData(JSON.stringify(jsonObj));
	};

	const handleViewProfile = (log: IApiLog) => {
		const id = typeof log.user === 'object' && log.user.id;
		const link = `${LINKS.Users}/${id}`;

		navigate(link);
	};

	return (
		<>
			{jsonData && (
				<ModalWrapper hasCloseButton={true} closeModal={() => setJsonData('')}>
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
			<Table sx={{ overflow: 'auto' }}>
				<TableHead
					sx={{
						'& tr': {
							backgroundColor: `${grey[50]} !important`,
							color: theme.palette.primary.main,
						},
					}}
				>
					<TableRow>
						<CustomTableCell label={'Reference'} />

						<CustomTableCell label={'User Name'} />
						<CustomTableCell label={'User Email'} />
						<CustomTableCell label={'Date'} />
						<CustomTableCell label={'Time'} />
						<CustomTableCell label={'Profile'} />
						<CustomTableCell label={'View'} />
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
						<TableLoader colSpan={6} />
					) : (
						data && (
							<>
								{data.length > 0 ? (
									data.map((row: IApiLog) => (
										<TableRow key={row.id}>
											<TableCell>{row.reference}</TableCell>
											<TableCell>
												{typeof row.user === 'object' &&
													extractUserName(row.user)}
											</TableCell>
											<TableCell>
												{typeof row.user === 'object' && row.user.email}
											</TableCell>
											<TableCell>
												{moment.utc(row.createdAt).format('l')}
											</TableCell>
											<TableCell>
												{moment.utc(row.createdAt).format('LT')}
											</TableCell>
											<TableCell>
												<Button onClick={() => handleViewProfile(row)}>
													View profile
												</Button>
											</TableCell>
											<TableCell>
												<Button onClick={() => handleViewLog(row)}>
													View log
												</Button>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={6}>
											<Empty text={'No api log(s)'} />
										</TableCell>
									</TableRow>
								)}
							</>
						)
					)}
				</TableBody>
			</Table>
		</>
	);
};

// const useStyles = (theme: any) => ({
// 	container: {
// 		display: 'grid',
// 		gridTemplateColumn: '1fr',
// 		gap: theme.spacing(4),
// 		border: `1px solid ${theme.palette.secondary.main}`,
// 		padding: '1.5rem 0px',
// 		backgroundColor: grey[50],
// 		borderRadius: theme.spacing(2),
// 		boxShadow: BOX_SHADOW,
// 	},
// 	filterWrapper: {
// 		display: 'flex',
// 		gap: '10px',
// 		alignItems: 'center',
// 	},
// 	tableHeader: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 		gap: theme.spacing(3),
// 	},
// 	suspendBtn: {
// 		paddingLeft: theme.spacing(3),
// 		paddingRight: theme.spacing(3),
// 		textTransform: 'uppercase',
// 		border: `1px solid ${SUCCESS_COLOR}`,
// 		color: SUCCESS_COLOR,
// 		// fontWeight: '600',
// 	},
// });

export default ApiLogsTable;
