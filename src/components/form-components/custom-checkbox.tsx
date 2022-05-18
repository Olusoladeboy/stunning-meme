import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
	size?: any;
	ischecked?: string | undefined;
}

const CustomCheckbox = (props: Props) => {
	const { size = '15px', ischecked, onClick } = props;
	const [checked, setChecked] = useState<boolean>(false);

	useEffect(() => {
		if (ischecked) {
			setChecked(true);
		} else {
			setChecked(false);
		}
	}, [ischecked]);

	return (
		<Button
			{...props}
			onClick={onClick ? (e) => onClick(e) : (e) => setChecked(true)}
			sx={{
				height: size || '20px',
				width: size || '20px',
				minWidth: 'unset',
				backgroundColor: '#CCD6DC',
				borderRadius: '5px',
				padding: '6px',
			}}
		>
			{checked && (
				<Box
					sx={{
						height: '100%',
						width: '100%',
						backgroundColor: (theme) => theme.palette.primary.main,
						borderRadius: '2.5px',
					}}
				></Box>
			)}
		</Button>
	);
};

export default CustomCheckbox;
