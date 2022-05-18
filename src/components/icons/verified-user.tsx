import React from 'react';

type Props = {
	width?: number;
	height?: number;
	color?: string;
};

const VerifiedUserIcon = ({ width, height, color }: Props) => {
	return (
		<svg
			width={width || '24'}
			height={height || '23'}
			viewBox='0 0 24 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M8.57143 0C5.26674 0 2.57143 2.58301 2.57143 5.75C2.57143 7.72977 3.62612 9.48814 5.22321 10.5246C2.16629 11.7824 0 14.6895 0 18.0714H1.71429C1.71429 14.4328 4.77455 11.5 8.57143 11.5C9.75 11.5 10.8482 11.7952 11.8125 12.2958C10.8616 13.4252 10.2857 14.8691 10.2857 16.4286C10.2857 20.048 13.3661 23 17.1429 23C20.9196 23 24 20.048 24 16.4286C24 12.8092 20.9196 9.85714 17.1429 9.85714C15.6462 9.85714 14.2533 10.3288 13.125 11.115C12.7467 10.8871 12.3348 10.6946 11.9196 10.5246C13.5167 9.48814 14.5714 7.72977 14.5714 5.75C14.5714 2.58301 11.8761 0 8.57143 0ZM8.57143 1.64286C10.9487 1.64286 12.8571 3.47182 12.8571 5.75C12.8571 8.02818 10.9487 9.85714 8.57143 9.85714C6.1942 9.85714 4.28571 8.02818 4.28571 5.75C4.28571 3.47182 6.1942 1.64286 8.57143 1.64286ZM17.1429 11.5C19.9922 11.5 22.2857 13.698 22.2857 16.4286C22.2857 19.1592 19.9922 21.3571 17.1429 21.3571C14.2935 21.3571 12 19.1592 12 16.4286C12 13.698 14.2935 11.5 17.1429 11.5ZM19.9554 14.1953L17.1429 16.8906L15.1875 15.0167L13.9554 16.1975L16.5268 18.6618L17.1429 19.2266L17.7589 18.6618L21.1875 15.3761L19.9554 14.1953Z'
				fill={color || '#379550'}
			/>
		</svg>
	);
};

export default VerifiedUserIcon;
