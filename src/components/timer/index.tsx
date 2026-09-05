import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Typography, TypographyProps } from '@mui/material';

interface Props extends TypographyProps {}

const Timer: React.FC<Props> = (props) => {
	const [timer, setTimer] = useState(
		moment().format('MMMM Do YYYY, h:mm:ss A')
	);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimer(moment().format('MMMM Do YYYY, h:mm:ss A'));
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);
	return (
		<Typography
			{...props}
			sx={{ fontWeight: 'bold', ...props.sx }}
			variant={'body1'}
		>
			{timer}
		</Typography>
	);
};

export default Timer;
