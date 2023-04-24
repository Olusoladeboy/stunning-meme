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
import StatisticsIcon from '../icons/stat';
import CouponIcon from '../icons/coupon';
import ShareIcon from '../icons/share';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Image from '../image';
import { getActiveLink, LINKS } from '../../utilities';
import { useLogoutUser } from '../../hooks';
import { setToggleMobileDrawer } from '../../store/app';

type ListItemButtonProps = {
	icon: any;
	name: string;
	link?: string;
	isActive: boolean;
};

const ListItemButton = ({
	icon,
	name,
	link,
	isActive,
}: ListItemButtonProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const initialColor = theme.palette.primary.main;
	const activeColor = theme.palette.secondary.main;
	const styles = useStyles(theme);
	const { isToggleDrawer } = useAppSelector((store) => store.appState);

	const handleNavigate = () => {
		navigate(link as string);
		dispatch(setToggleMobileDrawer(false));
	};

	return (
		<MuiListItemButton
			onClick={handleNavigate}
			style={{
				alignItems: 'center',
				justifyContent: 'flex-start',
				display: 'flex',
				borderRadius: isToggleDrawer ? '5px' : '15px',
			}}
		>
			<Box
				sx={{
					margin: { md: isToggleDrawer ? '0px 15px 0px 0px' : 'initial' },
					width: '40px',
					height: '40px',
				}}
				style={styles.iconWrapper}
			>
				{icon}
			</Box>
			<Typography
				sx={{
					display: { md: isToggleDrawer ? 'block' : 'none' },
					color: isActive ? activeColor : initialColor,
					fontWeight: isActive ? '600' : 'initial',
				}}
			>
				{name}
			</Typography>
		</MuiListItemButton>
	);
};

const DrawerList = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const initialColor = theme.palette.primary.main;
	const activeColor = theme.palette.secondary.main;
	const logout = useLogoutUser();

	const handleLogout = () => {
		logout();
		dispatch(setToggleMobileDrawer(false));
	};

	const styles = useStyles(theme);
	const { isToggleDrawer } = useAppSelector((store) => store.appState);
	return (
		<>
			<Box style={styles.appLogoWrapper}>
				<Box
					sx={{
						display: {
							md: 'none',
						},
					}}
				>
					<Image
						sx={{
							img: {
								maxWidth: '140px',
							},
						}}
						src={require('../../assets/images/app-logo-with-text.png')}
					/>
				</Box>
				<Box
					sx={{
						display: {
							xs: 'none',
							md: 'block',
						},
					}}
				>
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
					isActive={
						getActiveLink({ name: 'dashboard', currentPath: pathname }).isActive
					}
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
					link={LINKS.Users}
					name={'Users'}
					isActive={
						getActiveLink({ name: 'users', currentPath: pathname }).isActive
					}
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
					name={'Managers'}
					link={LINKS.Managers}
					isActive={
						getActiveLink({ name: 'managers', currentPath: pathname }).isActive
					}
					icon={
						<ManagerIcon
							color={
								getActiveLink({ name: 'managers', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Statistics'}
					link={LINKS.Statistics}
					isActive={
						getActiveLink({ name: 'statistics', currentPath: pathname })
							.isActive
					}
					icon={
						<StatisticsIcon
							color={
								getActiveLink({ name: 'statistics', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Transactions'}
					link={LINKS.Transactions}
					isActive={
						getActiveLink({ name: 'transactions', currentPath: pathname })
							.isActive
					}
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
					link={LINKS.Conversions}
					isActive={
						getActiveLink({ name: 'conversions', currentPath: pathname })
							.isActive
					}
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
					name={'Auto Conversions'}
					link={LINKS.AutoConversions}
					isActive={
						getActiveLink({ name: 'auto-conversions', currentPath: pathname })
							.isActive
					}
					icon={
						<ConversionIcon
							color={
								getActiveLink({
									name: 'auto-conversions',
									currentPath: pathname,
								}).isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Data Network'}
					link={LINKS.DataNetwork}
					isActive={
						getActiveLink({ name: 'data-network', currentPath: pathname })
							.isActive
					}
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
					link={LINKS.AirtimeNetwork}
					isActive={
						getActiveLink({ name: 'airtime-network', currentPath: pathname })
							.isActive
					}
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
					name={'Coupons'}
					link={LINKS.Coupons}
					isActive={
						getActiveLink({ name: 'coupons', currentPath: pathname }).isActive
					}
					icon={
						<CouponIcon
							color={
								getActiveLink({
									name: 'coupons',
									currentPath: pathname,
								}).isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Dispute'}
					link={LINKS.Dispute}
					isActive={
						getActiveLink({ name: 'dispute', currentPath: pathname }).isActive
					}
					icon={
						<CouponIcon
							color={
								getActiveLink({
									name: 'dispute',
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
					link={LINKS.Referrals}
					isActive={
						getActiveLink({
							name: 'referrals' || 'referee',
							currentPath: pathname,
						}).isActive
					}
					icon={
						<ShareIcon
							color={
								getActiveLink({
									name: 'referrals' || 'referee',
									currentPath: pathname,
								}).isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Notifications'}
					link={LINKS.Notifications}
					isActive={
						getActiveLink({ name: 'notifications', currentPath: pathname })
							.isActive
					}
					icon={
						<NotificationIcon
							color={
								getActiveLink({ name: 'notifications', currentPath: pathname })
									.isActive
									? activeColor
									: initialColor
							}
						/>
					}
				/>
				<ListItemButton
					name={'Verification'}
					link={LINKS.Verification}
					isActive={
						getActiveLink({ name: 'verification', currentPath: pathname })
							.isActive
					}
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
					link={LINKS.Suspension}
					isActive={
						getActiveLink({ name: 'suspension', currentPath: pathname })
							.isActive
					}
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
					link={LINKS.AuditLogs}
					isActive={
						getActiveLink({ name: 'audit-logs', currentPath: pathname })
							.isActive
					}
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
					onClick={handleLogout}
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
							display: { md: isToggleDrawer ? 'block' : 'none' },
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
		marginBottom: '3rem',
	},
	iconWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default DrawerList;
