import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import SummaryWrapper from './wrapper';
import ConversionIcon from '../icons/conversion';
import { SUCCESS_COLOR } from '../../utilities/constant';
import Link from '../link';
import LINKS from '../../utilities/links';
import { useAppSelector } from '../../store/hooks';

const TotalConversions = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { statistics } = useAppSelector((store) => store.appState);
	return (
		<SummaryWrapper
			bgColor={SUCCESS_COLOR}
			amount={statistics ? statistics.total_conversions : '---'}
			icon={<ConversionIcon color={grey[50]} />}
		>
			<Typography style={styles.text} variant={'h6'}>
				Total Conversions
			</Typography>
			<Link to={LINKS.Conversions}>
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
