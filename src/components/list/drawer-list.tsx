import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Box,
	List,
	ListItemButton as MuiListItemButton,
	Typography,
	useTheme,
} from '@mui/material';
import DashboardIcon from '../icons/dashboard';
import ManagerIcon from '../icons/manager';
import UserIcon from '../icons/user';
import TransactionIcon from '../icons/transaction';
import DataIcon from '../icons/data';
import LogoutIcon from '../icons/logout';
import PhoneIcon from '../icons/phone';
import CheckIcon from '../icons/check';
import ConversionIcon from '../icons/conversion';
import SuspensionIcon from '../icons/suspension';
import NotificationIcon from '../icons/notification';
import VerificationIcon from '../icons/verification';
import ShareIcon from '../icons/share';
import { useAppSelector } from '../../store/hooks';
import Image from '../image';
import getActiveLink from '../../utilities/helpers/getActivePath';
import LINKS from '../../utilities/links';

type ListItemButtonProps = {
	icon: any;
	name: string;
	link?: string;
};

const ListItemButton = ({ icon, name, link }: ListItemButtonProps) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const theme = useTheme();
	const initialColor = theme.palette.primary.main;
	const activeColor = theme.palette.secondary.main;
	const styles = useStyles(theme);
	const { isToggleDrawer } = useAppSelector((store) => store.appState);

	const activePath = () => {
		return getActiveLink({
			name: name.toLocaleLowerCase().replace(/\s/gi, '-'),
			currentPath: pathname,
		}).isActive;
	};

	return (
		<MuiListItemButton
			onClick={() => navigate(link || '')}
			style={{
				alignItems: 'center',
				justifyContent: 'flex-start',
				display: 'flex',
				borderRadius: isToggleDrawer ? '5px' : '15px',
			}}
		>
			<Box
				sx={{
					margin: isToggleDrawer ? '0px 15px 0px 0px' : 'initial',
					width: '40px',
					height: '40px',
				}}
				style={styles.iconWrapper}
			>
				{icon}
			</Box>
			<Typography
				sx={{
					display: isToggleDrawer ? 'block' : 'none',
					color: activePath() ? activeColor : initialColor,
					fontWeight: activePath() ? '600' : 'initial',
				}}
			>
				{name}
			</Typography>
		</MuiListItemButton>
	);
};

const DrawerList = () => {
	const { pathname } = useLocation();
	const theme = useTheme();
	const initialColor = theme.palette.primary.main;
	const activeColor = theme.palette.secondary.main;

	const styles = useStyles(theme);
	const { isToggleDrawer } = useAppSelector((store) => store.appState);
	return (
		<>
			<Box style={styles.appLogoWrapper}>
				{isToggleDrawer ? (
					<Image
						sx={{
							img: {
								maxWidth: '140px',
							},
						}}
						src={require('../../assets/images/app-logo-with-text.png')}
					/>
				) : (
					<Image
						sx={{
							img: {
								maxWidth: '32px',
							},
						}}
						src={require('../../assets/images/app-logo.png')}
					/>
				)}
			</Box>
			<List
				sx={{
					'.MuiListItemButton-root': {
						marginBottom: '0.5rem',
					},
					'.MuiListItemButton-root:last-child': {
						marginBottom: '0px',
					},
				}}
				disablePadding
			>
				<ListItemButton
					link={LINKS.Dashboard}
					name={'Dashboard'}
					icon={
						<DashboardIcon
							color={
								getActiveLink({ name: 'dashboard', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					link={LINKS.User}
					name={'Users'}
					icon={
						<UserIcon
							color={
								getActiveLink({ name: 'users', currentPath: pathname }).isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Manager'}
					icon={
						<ManagerIcon
							color={
								getActiveLink({ name: 'manager', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Transactions'}
					icon={
						<TransactionIcon
							color={
								getActiveLink({ name: 'transactions', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Conversions'}
					icon={
						<ConversionIcon
							color={
								getActiveLink({ name: 'conversions', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Data Network'}
					icon={
						<DataIcon
							color={
								getActiveLink({ name: 'data-network', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Airtime Network'}
					icon={
						<PhoneIcon
							color={
								getActiveLink({
									name: 'airtime-network',
									currentPath: pathname,
								}).isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Referral'}
					icon={
						<ShareIcon
							color={
								getActiveLink({ name: 'referral', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Notification'}
					icon={
						<NotificationIcon
							color={
								getActiveLink({ name: 'notification', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Verification'}
					icon={
						<VerificationIcon
							color={
								getActiveLink({ name: 'verification', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Suspension'}
					icon={
						<SuspensionIcon
							color={
								getActiveLink({ name: 'suspension', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Audit Logs'}
					icon={
						<CheckIcon
							color={
								getActiveLink({ name: 'audit-logs', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<MuiListItemButton
					style={{
						marginTop: '3rem',
						alignItems: 'center',
						justifyContent: 'flex-start',
						display: 'flex',
						borderRadius: isToggleDrawer ? '5px' : '15px',
					}}
				>
					<Box
						sx={{
							margin: isToggleDrawer ? '0px 15px 0px 0px' : 'initial',
							width: '40px',
							height: '40px',
						}}
						style={styles.iconWrapper}
					>
						<LogoutIcon />
					</Box>
					<Typography
						sx={{
							display: isToggleDrawer ? 'block' : 'none',
						}}
					>
						Logout
					</Typography>
				</MuiListItemButton>
			</List>
		</>
	);
};

const useStyles = (theme: any) => ({
	appLogoWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '4rem',
	},
	iconWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default DrawerList;
