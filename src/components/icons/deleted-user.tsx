import React from 'react';

type Props = {
	width?: number;
	height?: number;
	color?: string;
};

const DeletedUserIcon = ({ width, height, color }: Props) => {
	return (
		<svg
			width={width || '24'}
			height={height || '23'}
			viewBox='0 0 24 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M12 0C5.38341 0 0 5.1591 0 11.5C0 17.8409 5.38341 23 12 23C18.6166 23 24 17.8409 24 11.5C24 5.1591 18.6166 0 12 0ZM12 1.76923C17.6178 1.76923 22.1538 6.11629 22.1538 11.5C22.1538 16.8837 17.6178 21.2308 12 21.2308C6.38221 21.2308 1.84615 16.8837 1.84615 11.5C1.84615 6.11629 6.38221 1.76923 12 1.76923ZM8.50962 6.88341L7.18269 8.15505L10.6731 11.5L7.18269 14.845L8.50962 16.1166L12 12.7716L15.4904 16.1166L16.8173 14.845L13.3269 11.5L16.8173 8.15505L15.4904 6.88341L12 10.2284L8.50962 6.88341Z'
				fill={color || '#379550'}
			/>
		</svg>
	);
};

export default DeletedUserIcon;
