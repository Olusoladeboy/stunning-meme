import React from 'react';

type Props = {
	width?: number;
	height?: number;
	color?: string;
};

const CheckIcon = ({ width, height, color }: Props) => {
	return (
		<svg
			width={width || '19'}
			height={height || '23'}
			viewBox='0 0 19 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M8.3125 0V1.15H2.375C1.06519 1.15 0 2.18155 0 3.45V20.7C0 21.9684 1.06519 23 2.375 23H16.625C17.9348 23 19 21.9684 19 20.7V3.45C19 2.18155 17.9348 1.15 16.625 1.15H10.6875V0H8.3125ZM2.375 3.45H8.3125V4.6H10.6875V3.45H16.625V20.7L2.375 20.7022V3.45ZM13.4104 8.38691L8.3125 13.3238L5.5896 10.6869L3.9104 12.3131L8.3125 16.5762L15.0896 10.0131L13.4104 8.38691Z'
				fill={color}
			/>
		</svg>
	);
};

export default CheckIcon;
