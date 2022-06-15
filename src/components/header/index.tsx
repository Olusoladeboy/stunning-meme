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
import Image from '../image';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setToggleDrawer } from '../../store/app';
import { grey } from '@mui/material/colors';

const Header = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const dispatch = useAppDispatch();
	const { isToggleDrawer } = useAppSelector((store) => store.appState);
	return (
		<AppBar position={'sticky'} style={styles.appBar}>
			<Toolbar style={styles.toolbar}>
				<IconButton
					size={'large'}
					onClick={() => dispatch(setToggleDrawer(!isToggleDrawer))}
				>
					<Image
						style={styles.appMenu}
						sx={{
							img: {
								width: '100%',
								display: 'block',
							},
						}}
						src={require('../../assets/icons/menu.png')}
					/>
				</IconButton>
				<Box style={styles.avatarUserNameWrapper}>
					<Box>
						<Typography style={styles.userName} variant={'body1'}>
							user name
						</Typography>
						<Typography style={styles.roleText} variant={'body2'}>
							role
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
