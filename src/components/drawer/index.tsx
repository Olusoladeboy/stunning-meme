import React from 'react';
import { Drawer as MuiDrawer, useTheme, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { DRAWER_WIDTH, MIN_DRAWER_WIDTH, TRANSITION } from 'utilities';
import DrawerList from '../list/drawer-list';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setToggleMobileDrawer } from 'store/app';

const Drawer = () => {
	const theme = useTheme();
	const { isToggleDrawer, isToggleMobileDrawer } = useAppSelector(
		(store) => store.appState
	);
	const dispatch = useAppDispatch();

	const closeDrawer = () =>
		dispatch(setToggleMobileDrawer(!isToggleMobileDrawer));

	return (
		<>
			<MuiDrawer
				sx={{
					display: {
						xs: 'flex',
						md: 'none',
						position: 'relative',
					},
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						// width: isToggleDrawer ? DRAWER_WIDTH : MIN_DRAWER_WIDTH,
						width: '75%',
						// transition: TRANSITION,
						padding: '20px 10px',
						borderRightColor: theme.palette.secondary.main,
					},
					padding: '20px',
				}}
				open={isToggleMobileDrawer}
				// variant={'permanent'}
			>
				<IconButton
					onClick={closeDrawer}
					sx={{
						position: 'absolute',
						right: '25px',
						top: '10px',
						color: red['600'],
					}}
				>
					<Close />
				</IconButton>
				<DrawerList />
			</MuiDrawer>
			<MuiDrawer
				sx={{
					display: {
						xs: 'none',
						md: 'flex',
					},
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: isToggleDrawer ? DRAWER_WIDTH : MIN_DRAWER_WIDTH,
						transition: TRANSITION,
						padding: '20px 10px',
						borderRightColor: theme.palette.secondary.main,
					},
					padding: '20px',
				}}
				open
				variant={'permanent'}
			>
				<DrawerList />
			</MuiDrawer>
		</>
	);
};

export default Drawer;
