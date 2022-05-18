import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from '../image';

type Props = {
	text?: String;
};

const Empty = ({ text }: Props) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<Image
				src={require('../../assets/icons/data.png')}
				alt={'empty data'}
				sx={{
					maxWidth: '40px',
					img: {
						width: '100%',
					},
				}}
			/>
			{text && <Typography variant={'body1'}>{text}</Typography>}
		</Box>
	);
};

export default Empty;
