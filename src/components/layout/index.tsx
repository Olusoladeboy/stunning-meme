import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import Drawer from '../drawer';
import {
	DRAWER_WIDTH,
	MIN_DRAWER_WIDTH,
	TRANSITION,
} from '../../utilities/constant';
import Header from '../header';
import { useAppSelector } from '../../store/hooks';

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	const theme = useTheme();
	const { isToggleDrawer } = useAppSelector((store) => store.appState);
	return (
		<Box
			sx={{ display: 'flex', justifyContent: 'flex-end', minHeight: '100vh' }}
		>
			<Drawer />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: `calc(100% - ${
						isToggleDrawer ? DRAWER_WIDTH : MIN_DRAWER_WIDTH
					})`,
					transition: TRANSITION,
				}}
				component={'main'}
			>
				<Header />
				<Box sx={{ padding: theme.spacing(4), flex: 1 }}>{children}</Box>
			</Box>
		</Box>
	);
};

export default Layout;
