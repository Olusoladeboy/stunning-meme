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
	Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	UserStatus,
	User,
	SUCCESS_COLOR,
	DANGER_COLOR,
	BOX_SHADOW,
	LINKS,
	USERS_TAB,
	extractUserName,
} from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import TableLoader from '../loader/table-loader';
import CustomTableCell from './components/custom-table-cell';
import UsersTab from '../tabs/users-tab';
import Checkbox from '../form-components/check-box';

type Props = {
	isLoading?: boolean;
	users?: User[] | null;
	changeUserType?: (type?: string) => void;
	currentTab?: string;
	searchUser?: (value: string) => void;
	clearSearch?: () => void;
	isDisplayTab?: boolean;
	changeSearchDeletedUser?: (state: boolean) => void;
};

const UsersTable = ({
	isLoading,
	users = null,
	changeUserType,
	currentTab = USERS_TAB.All,
	searchUser,
	clearSearch,
	isDisplayTab = true,
	changeSearchDeletedUser,
}: Props) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const styles = useStyles(theme);

	const handleClickRow = (user: User) => {
		const isDeleted = user.deleted,
			link = isDeleted
				? `${LINKS.Users}/${user.id}?_deleted=true`
				: `${LINKS.Users}/${user.id}`;

		navigate(link);
	};

	const deletedCheckbox = (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: '4px',
				marginRight: '15px',
			}}
		>
			<Checkbox
				onChange={(e) => {
					typeof changeSearchDeletedUser === 'function' &&
						changeSearchDeletedUser(e.target.checked);
				}}
			/>
			<Typography sx={{ whiteSpace: 'nowrap' }}>Search Deleted User</Typography>
		</Box>
	);

	return (
		<Box style={styles.container} sx={{ overflow: 'auto' }}>
			<TableHeader
				placeholder={'Search user with email/phone'}
				sx={{ padding: '0px 1rem' }}
				title={'Users'}
				handleSearch={searchUser}
				clearSearch={clearSearch}
				deletedCheckbox={deletedCheckbox}
			/>
			{isDisplayTab && (
				<UsersTab currentTab={currentTab} changeCurrentTab={changeUserType} />
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
						<CustomTableCell label={'Name'} isSortable />
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
					) : users && users.length > 0 ? (
						users.map((user: User, key: number) => (
							<TableRow onClick={() => handleClickRow(user)} key={key}>
								<TableCell style={styles.tableText}>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: '10px',
										}}
									>
										<Avatar src={user.photoUrl as string} />
										<span>{extractUserName(user as User)}</span>
									</Box>
								</TableCell>
								<TableCell style={styles.tableText}>{user.email}</TableCell>
								<TableCell style={styles.tableText}>{user.phone}</TableCell>
								<TableCell style={styles.tableText}>
									{moment.utc(user.createdAt).format('l')}
								</TableCell>

								<TableCell
									sx={{
										textTransform: 'uppercase',
										fontWeight: '600',
										color: user.verified
											? SUCCESS_COLOR
											: user.verified === false
											? DANGER_COLOR
											: user.suspended
											? grey[800]
											: grey[500],
									}}
								>
									{user.verified
										? UserStatus.Verified
										: user.suspended
										? UserStatus.Suspended
										: UserStatus.Unverified}
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={5}>
								<Empty text={'No users'} />
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

export default UsersTable;
