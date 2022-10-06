import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
	children?: ReactNode;
	errorMessage?: string;
}

interface State {
	hasError: boolean;
	error?: string;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: '',
	};

	public static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
		this.setState((prevState) => ({ ...prevState, error: error.message }));
	}

	public render() {
		const { error } = this.state;
		const { errorMessage = 'Sorry.. there was an error' } = this.props;
		if (this.state.hasError) {
			return (
				<Box>
					<Typography variant={'body1'}>{error || errorMessage}</Typography>
				</Box>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
