import React from 'react';

type Props = {
	width?: number;
	height?: number;
	color?: string;
};

const CheckTwoIcon = ({ width, height, color }: Props) => {
	return (
		<svg
			width={width || '18'}
			height={height || '23'}
			viewBox='0 0 18 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M9 0C7.97185 0 7.24862 0.760964 6.88583 1.7037H4.90909H4.09091H0V23H18V1.7037H13.9091H13.0909H11.1142C10.7514 0.760964 10.0281 0 9 0ZM9 1.7037C9.4623 1.7037 9.81818 2.07423 9.81818 2.55556V3.40741H10.6364H12.2727V5.11111H5.72727V3.40741H8.18182V2.55556C8.18182 2.07423 8.5377 1.7037 9 1.7037ZM1.63636 3.40741H4.09091V6.81482H13.9091V3.40741H16.3636V21.2963H1.63636V3.40741ZM13.3306 10.4718L8.18182 15.8325L5.48757 13.0273L4.33061 14.2319L8.18182 18.2416L14.4876 11.6764L13.3306 10.4718Z'
				fill={color}
			/>
		</svg>
	);
};

export default CheckTwoIcon;
