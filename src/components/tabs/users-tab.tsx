import React from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import UserIcon from '../icons/user';
import VerifiedUserIcon from '../icons/verified-user';
import SuspendedUserIcon from '../icons/suspended-user';
import DeletedUserIcon from '../icons/deleted-user';
import UnverifiedUserIcon from '../icons/unverified-user';
import UserItem from '../transaction-item';
import { USERS_TAB, SUCCESS_COLOR } from 'utilities';
import { useAppSelector } from 'store/hooks';

interface Props {
	currentTab?: string;
	changeCurrentTab?: (tab?: string) => void;
}

const UsersTab: React.FC<Props> = ({ currentTab, changeCurrentTab }) => {
	const {
		appState: { statistics },
		authState: { canViewStatistics },
	} = useAppSelector((store) => store);
	const handleChangeTab = (value?: string) => {
		if (typeof changeCurrentTab !== 'undefined') {
			changeCurrentTab(value);
		}
	};
	if (canViewStatistics) {
		return (
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(6, 1fr)',
					gap: (theme) => theme.spacing(2),
					padding: '0px 1rem',
					overflow: 'auto',
				}}
			>
				<UserItem
					isBorder
					borderColor={SUCCESS_COLOR}
					onClick={() => handleChangeTab()}
					bgColor={currentTab === USERS_TAB.All ? SUCCESS_COLOR : undefined}
					amount={statistics ? statistics.total_users : '0'}
					amountColor={currentTab === USERS_TAB.All ? grey[50] : SUCCESS_COLOR}
					icon={
						<UserIcon
							color={currentTab === USERS_TAB.All ? grey[50] : SUCCESS_COLOR}
						/>
					}
				>
					<Typography
						sx={{
							color: currentTab === USERS_TAB.All ? grey[50] : SUCCESS_COLOR,
						}}
						variant={'body1'}
					>
						Total User
					</Typography>
				</UserItem>
				<UserItem
					onClick={() => handleChangeTab(USERS_TAB.Verified)}
					isBorder
					borderColor={SUCCESS_COLOR}
					bgColor={
						currentTab === USERS_TAB.Verified ? SUCCESS_COLOR : undefined
					}
					amountColor={
						currentTab === USERS_TAB.Verified ? grey[50] : SUCCESS_COLOR
					}
					amount={statistics ? statistics.total_verified_users : '0'}
					icon={
						<VerifiedUserIcon
							color={
								currentTab === USERS_TAB.Verified ? grey[50] : SUCCESS_COLOR
							}
						/>
					}
				>
					<Typography
						sx={{
							color:
								currentTab === USERS_TAB.Verified ? grey[50] : SUCCESS_COLOR,
						}}
						variant={'body1'}
					>
						Verified User
					</Typography>
				</UserItem>{' '}
				<UserItem
					isBorder
					onClick={() => handleChangeTab(USERS_TAB.Unverified)}
					bgColor={
						currentTab === USERS_TAB.Unverified ? SUCCESS_COLOR : undefined
					}
					borderColor={SUCCESS_COLOR}
					amountColor={
						currentTab === USERS_TAB.Unverified ? grey[50] : SUCCESS_COLOR
					}
					amount={statistics ? statistics.total_unverified_users : '0'}
					icon={
						<UnverifiedUserIcon
							color={
								currentTab === USERS_TAB.Unverified ? grey[50] : SUCCESS_COLOR
							}
						/>
					}
				>
					<Typography
						sx={{
							color:
								currentTab === USERS_TAB.Unverified ? grey[50] : SUCCESS_COLOR,
						}}
						variant={'body1'}
					>
						Unverified User
					</Typography>
				</UserItem>
				<UserItem
					isBorder
					onClick={() => handleChangeTab(USERS_TAB.Deactivated)}
					bgColor={
						currentTab === USERS_TAB.Deactivated ? SUCCESS_COLOR : undefined
					}
					borderColor={SUCCESS_COLOR}
					amountColor={
						currentTab === USERS_TAB.Deactivated ? grey[50] : SUCCESS_COLOR
					}
					amount={statistics ? statistics.total_deactivated_users : '0'}
					icon={
						<SuspendedUserIcon
							color={
								currentTab === USERS_TAB.Deactivated ? grey[50] : SUCCESS_COLOR
							}
						/>
					}
				>
					<Typography
						sx={{
							color:
								currentTab === USERS_TAB.Deactivated ? grey[50] : SUCCESS_COLOR,
						}}
						variant={'body1'}
					>
						Deactivated User
					</Typography>
				</UserItem>
				<UserItem
					isBorder
					onClick={() => handleChangeTab(USERS_TAB.Suspended)}
					bgColor={
						currentTab === USERS_TAB.Suspended ? SUCCESS_COLOR : undefined
					}
					borderColor={SUCCESS_COLOR}
					amountColor={
						currentTab === USERS_TAB.Suspended ? grey[50] : SUCCESS_COLOR
					}
					amount={statistics ? statistics.total_suspended_users : '0'}
					icon={
						<SuspendedUserIcon
							color={
								currentTab === USERS_TAB.Suspended ? grey[50] : SUCCESS_COLOR
							}
						/>
					}
				>
					<Typography
						sx={{
							color:
								currentTab === USERS_TAB.Suspended ? grey[50] : SUCCESS_COLOR,
						}}
						variant={'body1'}
					>
						Suspended User
					</Typography>
				</UserItem>
				<UserItem
					isBorder
					bgColor={currentTab === USERS_TAB.Deleted ? SUCCESS_COLOR : undefined}
					onClick={() => handleChangeTab(USERS_TAB.Deleted)}
					borderColor={SUCCESS_COLOR}
					amountColor={
						currentTab === USERS_TAB.Deleted ? grey[50] : SUCCESS_COLOR
					}
					amount={statistics ? statistics.total_deleted_users : '0'}
					icon={
						<DeletedUserIcon
							color={
								currentTab === USERS_TAB.Deleted ? grey[50] : SUCCESS_COLOR
							}
						/>
					}
				>
					<Typography
						sx={{
							color:
								currentTab === USERS_TAB.Deleted ? grey[50] : SUCCESS_COLOR,
						}}
						variant={'body1'}
					>
						Deleted User
					</Typography>
				</UserItem>
			</Box>
		);
	}

	return null;
};

export default UsersTab;
