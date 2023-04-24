import React from 'react';

type Props = {
	width?: number;
	height?: number;
	color?: string;
};

const CheckThreeIcon = ({ width, height, color }: Props) => {
	return (
		<svg
			width={width || '23'}
			height={height || '23'}
			viewBox='0 0 23 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11.5 0C5.13146 0 0 5.13146 0 11.5C0 17.8685 5.13146 23 11.5 23C17.8685 23 23 17.8685 23 11.5C23 10.2629 22.8341 9.0293 22.3918 7.87861L20.9543 9.28846C21.1306 9.99684 21.2308 10.7052 21.2308 11.5C21.2308 16.8975 16.8975 21.2308 11.5 21.2308C6.10246 21.2308 1.76923 16.8975 1.76923 11.5C1.76923 6.10246 6.10246 1.76923 11.5 1.76923C14.1538 1.76923 16.5382 2.82662 18.2175 4.50601L19.4615 3.26202C17.4262 1.22671 14.5962 0 11.5 0ZM21.4796 3.78726L11.5 13.7668L7.71274 9.97957L6.44111 11.2512L10.8642 15.6743L11.5 16.2825L12.1358 15.6743L22.7512 5.05889L21.4796 3.78726Z'
				fill={color}
			/>
		</svg>
	);
};

export default CheckThreeIcon;
