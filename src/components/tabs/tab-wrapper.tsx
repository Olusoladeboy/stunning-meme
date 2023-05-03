import React, { ReactNode } from 'react';
import { Tabs, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useAppSelector } from 'store/hooks';
import { DARK_BACKGROUND_COLOR, ThemeModeType } from 'utilities';

type Props = {
	currentTab: string | number;
	handleChange: (e: any, value: any) => void;
	children: ReactNode;
};

const TabWrapper = ({ currentTab, handleChange, children }: Props) => {
	const theme = useTheme();
	const { mode } = useAppSelector((store) => store.theme);
	return (
		<Tabs
			sx={{
				display: 'flex',
				overflow: 'auto',
				justifyContent: 'space-between',
				width: '100%',
				position: 'sticky',
				// top: '5rem',

				backgroundColor:
					mode === ThemeModeType.dark ? DARK_BACKGROUND_COLOR : grey[50],
				zIndex: '100',
				'& .MuiButtonBase-root': {
					flex: 1,
					color:
						mode === ThemeModeType.dark
							? grey[300]
							: theme.palette.primary.main,
					whiteSpace: 'nowrap',
				},
				'& .MuiButtonBase-root.Mui-selected': {
					color: theme.palette.secondary.main,
					fontWeight: '600',
				},
				'& .MuiTabs-indicator': {
					backgroundColor: theme.palette.secondary.main,
				},
			}}
			value={currentTab}
			onChange={handleChange}
		>
			{children}
		</Tabs>
	);
};

export default TabWrapper;
