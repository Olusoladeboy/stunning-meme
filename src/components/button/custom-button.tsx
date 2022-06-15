import React, { ReactNode, useEffect, useState } from 'react';
import {
	Button as MuiButton,
	ButtonProps,
	CircularProgress,
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
				<CircularProgress size={'24px'} sx={{ color: 'inherit' }} />
			) : (
				children
			)}
		</MuiButton>
	);
};

export default Button;
