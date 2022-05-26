import React from 'react';
import { AppBar, Toolbar, useTheme, IconButton } from '@mui/material';
import Image from '../image';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setToggleDrawer } from '../../store/app';

const Header = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const dispatch = useAppDispatch();
	const { isToggleDrawer } = useAppSelector((store) => store.appState);
	return (
		<AppBar position={'sticky'} style={styles.appBar}>
			<Toolbar>
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
});
export default Header;
