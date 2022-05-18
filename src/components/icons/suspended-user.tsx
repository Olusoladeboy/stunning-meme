import React from 'react';

type Props = {
	width?: number;
	height?: number;
	color?: string;
};

const SuspendedUserIcon = ({ width, height, color }: Props) => {
	return (
		<svg
			width={width || '23'}
			height={height || '23'}
			viewBox='0 0 23 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11.5 0C5.1591 0 0 5.1591 0 11.5C0 17.8409 5.1591 23 11.5 23C17.8409 23 23 17.8409 23 11.5C23 5.1591 17.8409 0 11.5 0ZM11.5 1.76923C16.8837 1.76923 21.2308 6.11629 21.2308 11.5C21.2308 13.912 20.3565 16.1062 18.9087 17.8029L5.33534 3.95312C7.01127 2.58128 9.15715 1.76923 11.5 1.76923ZM4.09135 5.19712L17.6647 19.0469C15.9887 20.4187 13.8428 21.2308 11.5 21.2308C6.11629 21.2308 1.76923 16.8837 1.76923 11.5C1.76923 9.08804 2.64348 6.89378 4.09135 5.19712Z'
				fill={color || '#379550'}
			/>
		</svg>
	);
};

export default SuspendedUserIcon;
