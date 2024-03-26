import React from 'react';
import { Radio as MUIRadio, Box, RadioProps, Typography } from '@mui/material';

interface Props extends RadioProps {
	label?: string;
}

const Radio = (props: Props) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
			<MUIRadio {...props} />
			{props.label && <Typography>{props.label}</Typography>}
		</Box>
	);
};

export default Radio;
