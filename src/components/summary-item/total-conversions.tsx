import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import SummaryWrapper from './wrapper';
import ConversionIcon from '../icons/conversion';
import { SEMI_GREEN_COLOR, LINKS } from '../../utilities';
import Link from '../link';
import { useAppSelector } from '../../store/hooks';

const TotalConversions = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { statistics } = useAppSelector((store) => store.appState);
	return (
		<SummaryWrapper
			bgColor={SEMI_GREEN_COLOR}
			amount={statistics ? statistics.total_conversions : '---'}
			icon={<ConversionIcon color={grey[50]} />}
		>
			<Typography style={styles.text} variant={'h6'}>
				Total Conversions
			</Typography>
			<Link to={LINKS.AllConversions}>
				<Typography style={styles.linkText} variant={'body1'}>
					View all
				</Typography>
			</Link>
		</SummaryWrapper>
	);
};

const useStyles = (theme: any) => ({
	text: {
		color: grey[50],
		fontWeight: '600',
		fontSize: '17px',
	},
	linkText: {
		color: grey[50],
		fontWeight: '600',
	},
});

export default TotalConversions;
