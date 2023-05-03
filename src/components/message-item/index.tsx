import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from 'store/hooks';

interface Props {
	message: string;
	repliedBy: string;
}

const MessageItem = ({ message, repliedBy }: Props) => {
	const { user } = useAppSelector((store) => store.authState);

	return (
		<Box
			sx={{
				padding: '10px 0px',
				justifySelf: user && user.id === repliedBy ? 'flex-end' : 'flex-start',
			}}
		>
			<Typography variant={'body1'}>{message}</Typography>
		</Box>
	);
};

export default MessageItem;
