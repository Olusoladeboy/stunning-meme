import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
	Avatar,
	useTheme,
	TableBody,
	TableHead,
	Table,
	Box,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	User,
	IBusiness,
	SUCCESS_COLOR,
	BOX_SHADOW,
	LINKS,
	USERS_TAB,
} from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import TableLoader from '../loader/table-loader';
import CustomTableCell from './components/custom-table-cell';

type Props = {
	isLoading?: boolean;
	businesses?: IBusiness[] | null;
	changeUserType?: (type?: string) => void;
	currentTab?: string;
	searchUser?: (value: string) => void;
	clearSearch?: () => void;
	isDisplayTab?: boolean;
	changeSearchDeletedUser?: (state: boolean) => void;
};

const BusinessTable = ({
	isLoading,
	businesses = null,
	searchUser,
	clearSearch,
}: Props) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const styles = useStyles(theme);

	const handleClickRow = (business: IBusiness) => {
		navigate(`${LINKS.Business}/${business.id}`);
	};

	return (
		<Box style={styles.container} sx={{ overflow: 'auto' }}>
			<TableHeader
				placeholder={'Search business with email/phone'}
				sx={{ padding: '0px 1rem' }}
				title={'Business'}
				handleSearch={searchUser}
				clearSearch={clearSearch}
			/>

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
						<CustomTableCell label={'Business Name'} isSortable />
						<CustomTableCell label={'Email'} isSortable />
						<CustomTableCell label={'Phone Number'} isSortable />
						<CustomTableCell label={'Date'} />
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
						<TableLoader colSpan={5} />
					) : businesses && businesses.length > 0 ? (
						businesses.map((business: IBusiness, key: number) => (
							<TableRow onClick={() => handleClickRow(business)} key={key}>
								<TableCell style={styles.tableText}>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: '10px',
										}}
									>
										{/* <Avatar src={user.photoUrl as string} /> */}
										<span>{business.businessName}</span>
									</Box>
								</TableCell>
								<TableCell style={styles.tableText}>
									{typeof business.businessOwner === 'object' &&
										business.businessOwner.email}
								</TableCell>
								<TableCell style={styles.tableText}>
									{typeof business.businessOwner === 'object' &&
										business.businessOwner?.phone}
								</TableCell>
								<TableCell style={styles.tableText}>
									{moment.utc(business.createdAt).format('l')}
								</TableCell>

								<TableCell
									sx={{
										textTransform: 'uppercase',
										fontWeight: '600',
										// color: user.verified
										// 	? SUCCESS_COLOR
										// 	: user.verified === false
										// 	? DANGER_COLOR
										// 	: user.suspended
										// 	? grey[800]
										// 	: grey[500],
									}}
								>
									{business.status}
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={5}>
								<Empty text={'No available business'} />
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</Box>
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
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	tableHeaderText: {
		fontWeight: '600',
	},
	tableText: {
		color: theme.palette.primary.main,
	},
	transactionItemText: {
		color: SUCCESS_COLOR,
	},
});

export default BusinessTable;
