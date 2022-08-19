import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
import Button from '../button';
import { grey } from '@mui/material/colors';
import { ContentCopyRounded } from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import { ThemeModeType } from '../../utilities/types';

type Props = {
	text: string;
};

const InfoList = ({ text }: Props) => {
	const theme = useTheme();
	const { mode } = useAppSelector((store) => store.theme);
	const { enqueueSnackbar } = useSnackbar();

	const handleCopy = () =>
		enqueueSnackbar(`${text} copied successfully!!`, { variant: 'info' });

	return (
		<Box
			sx={{
				padding: '10px 16px',
				border: `1px solid ${
					mode === ThemeModeType.dark ? grey[500] : theme.palette.primary.main
				}`,
				borderRadius: '5px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Typography>{text}</Typography>
			<CopyToClipboard text={text} onCopy={() => handleCopy()}>
				<Button
					sx={{
						fontWeight: '600',
						fontSize: '13px',
						color:
							mode === ThemeModeType.dark
								? grey[500]
								: theme.palette.primary.main,
					}}
					startIcon={<ContentCopyRounded />}
				>
					Copy
				</Button>
			</CopyToClipboard>
		</Box>
	);
};

export default InfoList;
