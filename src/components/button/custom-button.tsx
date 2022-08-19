import React, { ReactNode, useEffect, useState } from 'react';
import {
	Button as MuiButton,
	ButtonProps,
	CircularProgress,
	Box,
} from '@mui/material';

type Props = {
	loading?: boolean;
	buttonProps?: ButtonProps;
	children: ReactNode;
};

const Button = (props: Props) => {
	const { buttonProps, children, loading = false } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		if (loading) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [loading]);
	return (
		<MuiButton disabled={loading} {...buttonProps}>
			{isLoading ? (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<CircularProgress size={'22px'} sx={{ color: 'inherit' }} />
					<Box sx={{ fontSize: '12px' }} component={'span'}>
						Loading...
					</Box>
				</Box>
			) : (
				children
			)}
		</MuiButton>
	);
};

export default Button;
