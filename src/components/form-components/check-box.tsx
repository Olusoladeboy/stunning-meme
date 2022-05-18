import React from 'react';
import {
	Box,
	Typography,
	Checkbox as MuiCheckBox,
	CheckboxProps,
} from '@mui/material';

interface Props extends CheckboxProps {
	label?: any;
	labelStyle?: any;
}

const CheckBox = (props: Props) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
			<MuiCheckBox {...props} />
			{props.label && (
				<Typography style={props.labelStyle} variant={'body1'}>
					{props.label}
				</Typography>
			)}
		</Box>
	);
};

export default CheckBox;
