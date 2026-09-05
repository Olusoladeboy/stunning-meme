import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { SECOUNDARY_COLOR } from 'utilities';

const Loader = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: '0px',
				left: '0px',
				height: '100vh',
				width: '100%',
				backgroundColor: 'rgba(40, 83, 107, 0.7)',
				zIndex: '100000',
				overflow: 'auto',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress size={'32px'} sx={{ color: SECOUNDARY_COLOR }} />
		</Box>
	);
};

export default Loader;
