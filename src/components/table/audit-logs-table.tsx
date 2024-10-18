import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableHead,
	useTheme,
	Box,
	Typography,
} from '@mui/material';
import moment from 'moment';
import JsonFormatter from 'react-json-formatter';
import { grey } from '@mui/material/colors';
import { AuditFilter, AuditLog, extractUserName, User } from 'utilities';
import { ChevronRight } from '@mui/icons-material';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Empty from '../empty';
import CustomTableCell from './components/custom-table-cell';
import TableLoader from '../loader/table-loader';
import ModalWrapper from 'components/modal/Wrapper';
import Button from 'components/button';
import { useAuditLogViewAction, useAlert } from 'hooks';
import Loader from 'components/loader';

interface Props {
	data: AuditLog[] | undefined | null;
	isLoading: boolean;
	auditFilter?: AuditFilter;
}

interface IDetails {
	close?: () => void;
	data: AuditLog;
	viewAction?: (data: AuditLog) => void;
}

const DetailsItem = ({ label, value }: { label: string; value: string }) => {
	return (
		<Box>
			<Typography
				sx={{
					fontWeight: 'bold',
					marginBottom: '0.3em !important',
				}}
			>
				{label}
			</Typography>
			<Typography>{value}</Typography>
		</Box>
	);
};

const Details = ({ close, data, viewAction }: IDetails) => {
	const theme = useTheme();
	const staff = data.staff as User;
	return (
		<ModalWrapper hasCloseButton closeModal={close} title={'Activity Details'}>
			<Box>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: '15px',
						marginBottom: '2.5rem',
					}}
				>
					<DetailsItem label={'User'} value={extractUserName(staff)} />
					<DetailsItem label={'Email Address'} value={staff?.email as string} />
					<DetailsItem label={'Role'} value={staff?.role as string} />
					<DetailsItem
						label={'IP Address'}
						value={staff?.currentIp as string}
					/>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '15px',
					}}
				>
					<Button
						onClick={() => typeof viewAction === 'function' && viewAction(data)}
						sx={{
							backgroundColor: `${theme.palette.secondary.main} !important`,
							color: theme.palette.background.paper,
						}}
					>
						View action
					</Button>
					<Button
						sx={{
							border: '1px solid',
							borderColor: theme.palette.secondary.main,
							color: theme.palette.secondary.main,
						}}
						onClick={close}
					>
						Close
					</Button>
				</Box>
			</Box>
		</ModalWrapper>
	);
};

const AuditLogsTable: React.FC<Props> = ({ data, isLoading, auditFilter }) => {
	const theme = useTheme();
	const alert = useAlert();

	const jsonStyle = {
		propertyStyle: { color: 'red' },
		stringStyle: { color: 'green' },
		numberStyle: { color: 'darkorange' },
	};

	const [jsonData, setJsonData] = useState<string>('');

	const { isLoadingAuditLogViewAction, auditLogViewAction } =
		useAuditLogViewAction((data) => {
			if (data) {
				setJsonData(JSON.stringify(data));
			}
		});

	const [selectedDetail, setSelectedDetail] = useState<null | AuditLog>(null);

	const applyAuditFilter = (data: AuditLog[]) => {
		if (auditFilter) {
			return data.filter(
				(datum) =>
					datum.staff &&
					typeof datum.staff === 'object' &&
					`${datum.staff.firstname} ${datum.staff.lastname}`.includes(
						auditFilter.user
					) &&
					datum.details.includes(auditFilter.action) &&
					moment.utc(datum.createdAt).format('l').includes(auditFilter.date)
			);
		} else {
			return data;
		}
	};

	const closeModal = () => {
		setSelectedDetail(null);
	};

	const handleViewAction = (data: AuditLog) => {
		const { recordId, module } = data;
		if (!(recordId && module)) {
			let message = '';
			let errors = [];
			if (!recordId) errors.push('Record ID');
			if (!module) errors.push('Module');

			if (errors.length > 0) message = errors.join(', and');
			else message = errors.toString();

			alert({
				message: `${message} is not found in the record`,
				type: 'error',
			});

			return;
		}
		auditLogViewAction({
			module,
			recordId,
		});
	};

	return (
		<>
			{jsonData && (
				<ModalWrapper
					title={'View Action'}
					containerStyle={{
						zIndex: theme.zIndex.modal + 10,
					}}
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
			{isLoadingAuditLogViewAction && <Loader />}
			{selectedDetail && (
				<Details
					viewAction={handleViewAction}
					data={selectedDetail}
					close={closeModal}
				/>
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
						<CustomTableCell label={'Name'} />
						<CustomTableCell label={'Email'} />
						<CustomTableCell label={'Module'} />
						<CustomTableCell label={'Action'} />
						<CustomTableCell label={'Details'} />
						<CustomTableCell label={'Date'} />
						<CustomTableCell label={'Time'} />
						<CustomTableCell label={''} />
					</TableRow>
				</TableHead>
				<TableBody
					sx={{
						overflow: 'auto',
						'& tr': {
							color: theme.palette.primary.main,
						},
					}}
				>
					{isLoading ? (
						<TableLoader colSpan={8} />
					) : (
						data && (
							<>
								{data.length > 0 ? (
									applyAuditFilter(data).map((row: AuditLog) => (
										<TableRow
											key={row.id}
											onClick={() => setSelectedDetail(row)}
										>
											<TableCell style={{ whiteSpace: 'nowrap' }}>
												{row.staff &&
													typeof row.staff === 'object' &&
													`${row.staff.firstname} ${row.staff.lastname}`}
											</TableCell>
											<TableCell>
												{row.staff &&
													typeof row.staff === 'object' &&
													row.staff.email}
											</TableCell>
											<TableCell>{row.module}</TableCell>
											<TableCell>{row.action}</TableCell>
											<TableCell>{row.details}</TableCell>
											<TableCell>
												{moment.utc(row.createdAt).format('l')}
											</TableCell>
											<TableCell style={{ whiteSpace: 'nowrap' }}>
												{moment.utc(row.createdAt).format('LT')}
											</TableCell>
											<TableCell>
												<ChevronRight
													sx={{
														marginTop: '0.2em',
													}}
												/>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={8}>
											<Empty text={'No audit log(s)'} />
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

export default AuditLogsTable;
