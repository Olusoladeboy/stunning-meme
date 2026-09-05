import React from 'react';
import { styled, Box, BoxProps } from '@mui/material';
import { BOX_SHADOW } from 'utilities';
import { grey } from '@mui/material/colors';

interface Props extends BoxProps {}

const BorderContainer: React.FC<Props> = ({ children, ...rest }) => {
	return <Container {...rest}>{children}</Container>;
};

const Container = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumn: '1fr',
	gap: theme.spacing(4),
	border: `0.5px solid ${theme.palette.secondary.main}`,
	padding: '1.5rem 0px',
	backgroundColor: grey[50],
	borderRadius: theme.spacing(2),
	boxShadow: BOX_SHADOW,
}));

export default BorderContainer;
