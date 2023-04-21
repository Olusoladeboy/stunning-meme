import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { formatNumberToCurrency } from '../../utilities';

interface IStatisticsTotalTransaction {
	name: string;
	figure: number;
	isAmount?: boolean;
}

const StatisticsTotalTransaction: React.FC<IStatisticsTotalTransaction> = ({
	name,
	figure,
	isAmount = true,
}) => {
	const value$ = isAmount ? formatNumberToCurrency(figure) : figure;
	return (
		<Container>
			<Typography variant={'body1'}>{name}</Typography>
			<FigureText variant={'h5'}>{value$}</FigureText>
		</Container>
	);
};

const FigureText = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
	fontSize: '32px',
	marginTop: theme.spacing(2),
}));

const Container = styled(Box)(({ theme }) => ({
	padding: '15px 20px',
	borderRadius: theme.spacing(2),
	border: `1px solid ${grey['600']}`,
}));

export default StatisticsTotalTransaction;
