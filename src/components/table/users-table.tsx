import React from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Avatar, Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { grey } from '@mui/material/colors';
import {
	SUCCESS_COLOR,
	DANGER_COLOR,
	BOX_SHADOW,
} from '../../utilities/constant';
import { UserStatusTypes } from '../../utilities/types';
import FilterIcon from '../icons/filter';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import TransactionItem from '../transaction-item';
import UserIcon from '../icons/user';
import VerifiedUserIcon from '../icons/verified-user';
import SuspendedUserIcon from '../icons/suspended-user';
import DeletedUserIcon from '../icons/deleted-user';
import UnverifiedUserIcon from '../icons/unverified-user';
import Empty from '../empty';
import LINKS from '../../utilities/links';
import { UserDetailsType } from '../../utilities/types';
import TableLoader from '../loader/table-loader';

interface UserDetails extends UserDetailsType {}

type Props = {
	isLoading?: boolean;
	users?: UserDetails[] | null;
};

const UsersTable = ({ isLoading, users = null }: Props) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<Box style={styles.container} sx={{ overflow: 'auto' }}>
			<TableHeader sx={{ padding: '0px 1rem' }} title={'Users'} />
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(5, 1fr)',
					gap: theme.spacing(3),
					padding: '0px 1rem',
				}}
			>
				<TransactionItem
					bgColor={SUCCESS_COLOR}
					amount={'500'}
					amountColor={grey[50]}
					icon={<UserIcon color={grey[50]} />}
				>
					<Typography sx={{ color: grey[50] }} variant={'body1'}>
						Total User
					</Typography>
				</TransactionItem>
				<TransactionItem
					isBorder
					borderColor={SUCCESS_COLOR}
					amountColor={SUCCESS_COLOR}
					amount={'500'}
					icon={<VerifiedUserIcon color={SUCCESS_COLOR} />}
				>
					<Typography variant={'body1'} style={styles.transactionItemText}>
						Verified User
					</Typography>
				</TransactionItem>{' '}
				<TransactionItem
					isBorder
					borderColor={SUCCESS_COLOR}
					amountColor={SUCCESS_COLOR}
					amount={'500'}
					icon={<UnverifiedUserIcon color={SUCCESS_COLOR} />}
				>
					<Typography variant={'body1'} style={styles.transactionItemText}>
						Unverified User
					</Typography>
				</TransactionItem>{' '}
				<TransactionItem
					isBorder
					borderColor={SUCCESS_COLOR}
					amountColor={SUCCESS_COLOR}
					amount={'500'}
					icon={<SuspendedUserIcon color={SUCCESS_COLOR} />}
				>
					<Typography variant={'body1'} style={styles.transactionItemText}>
						Suspended User
					</Typography>
				</TransactionItem>{' '}
				<TransactionItem
					isBorder
					borderColor={SUCCESS_COLOR}
					amountColor={SUCCESS_COLOR}
					amount={'500'}
					icon={<DeletedUserIcon color={SUCCESS_COLOR} />}
				>
					<Typography variant={'body1'} style={styles.transactionItemText}>
						Deleted User
					</Typography>
				</TransactionItem>
			</Box>
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
						<TableCell />
						<TableCell>
							<Box style={styles.filterWrapper}>
								<Typography style={styles.tableHeaderText} variant={'body1'}>
									Name
								</Typography>
								<FilterIcon />
							</Box>
						</TableCell>
						<TableCell>
							<Box style={styles.filterWrapper}>
								<Typography style={styles.tableHeaderText} variant={'body1'}>
									Email
								</Typography>
								<FilterIcon />
							</Box>
						</TableCell>
						<TableCell>
							<Box style={styles.filterWrapper}>
								<Typography style={styles.tableHeaderText} variant={'body1'}>
									Phone no.
								</Typography>
								<FilterIcon />
							</Box>
						</TableCell>
						<TableCell>
							<Box style={styles.filterWrapper}>
								<Typography style={styles.tableHeaderText} variant={'body1'}>
									Date
								</Typography>
								<FilterIcon />
							</Box>
						</TableCell>
						<TableCell>
							<Box style={styles.filterWrapper}>
								<Typography style={styles.tableHeaderText} variant={'body1'}>
									Status
								</Typography>
								<FilterIcon />
							</Box>
						</TableCell>
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
					) : users && users.length > 0 ? (
						users.map((user, key) => (
							<TableRow
								onClick={() => navigate(`${LINKS.User}/${user.id}`)}
								key={key}
							>
								<TableCell sx={{ maxWidth: '60px' }}>
									<Avatar src={user.avatar} />
								</TableCell>
								<TableCell
									style={styles.tableText}
								>{`${user.firstname} ${user.lastname}`}</TableCell>
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
										? UserStatusTypes.Verified
										: user.suspended
										? UserStatusTypes.Suspended
										: UserStatusTypes.Unverified}
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={6}>
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
		border: `1px solid ${theme.palette.secondary.main}`,
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
