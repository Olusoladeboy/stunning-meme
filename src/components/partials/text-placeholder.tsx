import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { useAppSelector } from 'store/hooks';
import { ThemeModeType } from 'utilities';
import { grey } from '@mui/material/colors';

type Props = {
	text: string;
	hasArrowDropDown?: boolean;
};

const TextPlaceholder = ({ text, hasArrowDropDown }: Props) => {
	const theme = useTheme();
	const { mode } = useAppSelector((store) => store.theme);
	return (
		<Box
			sx={{
				borderRadius: theme.spacing(1),
				border: `1px solid ${
					mode === ThemeModeType.dark ? grey[50] : theme.palette.primary.main
				}`,
				padding: '16.5px 14px',
				cursor: 'not-allowed',
				userSelect: 'none',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Typography variant={'body1'}>{text}</Typography>
			{hasArrowDropDown && (
				<ArrowDropDown
					sx={{ fontSize: '20px', position: 'absolute', right: '14px' }}
				/>
			)}
		</Box>
	);
};

export default TextPlaceholder;
