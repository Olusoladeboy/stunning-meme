import React from 'react';
import {
	AppBar,
	Toolbar,
	useTheme,
	IconButton,
	Box,
	Typography,
	Avatar,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setToggleDrawer, setToggleMobileDrawer } from '../../store/app';
import { grey } from '@mui/material/colors';

const Header = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const dispatch = useAppDispatch();
	const {
		appState: { isToggleDrawer },
		authState: { user },
	} = useAppSelector((store) => store);
	return (
		<AppBar position={'sticky'} style={styles.appBar}>
			<Toolbar style={styles.toolbar}>
				<IconButton
					sx={{
						color: 'white',
						display: {
							xs: 'none',
							md: 'block',
						},
					}}
					size={'large'}
					onClick={() => dispatch(setToggleDrawer(!isToggleDrawer))}
				>
					<Menu />
				</IconButton>
				<IconButton
					sx={{
						color: 'white',
						display: {
							md: 'none',
						},
					}}
					size={'large'}
					onClick={() => dispatch(setToggleMobileDrawer(true))}
				>
					<Menu />
				</IconButton>
				<Box style={styles.avatarUserNameWrapper}>
					<Box>
						<Typography style={styles.userName} variant={'body1'}>
							{user && `${user.firstname} ${user.lastname}`}
						</Typography>
						<Typography style={styles.roleText} variant={'body2'}>
							{user && user.role && `${user.role.replace(/_/gi, ' ')}`}
						</Typography>
					</Box>
					<Avatar />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

const useStyles = (theme: any) => ({
	appBar: {
		backgroundColor: theme.palette.secondary.main,
		boxShadow: 'none',
	},
	appMenu: {
		width: '20px',
		height: '20px',
		display: 'flex',
		alignItems: 'center',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		color: 'white',
	},
	avatarUserNameWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(3),
	},
	userName: {
		fontSize: '16px',
		color: grey[100],
		fontWeight: '600',
	},
	roleText: {
		fontSize: '14px',
		color: grey[100],
	},
});
export default Header;
