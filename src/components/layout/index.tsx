import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import Drawer from '../drawer';
import {
	DRAWER_WIDTH,
	MIN_DRAWER_WIDTH,
	TRANSITION,
	AuthGuard,
} from 'utilities';
import Header from '../header';
import { useAppSelector } from 'store/hooks';

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	const theme = useTheme();
	const { isToggleDrawer } = useAppSelector((store) => store.appState);
	return (
		<AuthGuard>
			<Box
				sx={{ display: 'flex', justifyContent: 'flex-end', minHeight: '100vh' }}
			>
				<Drawer />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: {
							xs: '100%',
							md: `calc(100% - ${
								isToggleDrawer ? DRAWER_WIDTH : MIN_DRAWER_WIDTH
							})`,
						},
						transition: TRANSITION,
					}}
					component={'main'}
				>
					<Header />
					<Box
						sx={{ padding: { xs: '2rem 15px', md: theme.spacing(4) }, flex: 1 }}
					>
						{children}
					</Box>
				</Box>
			</Box>
		</AuthGuard>
	);
};

export default Layout;
