import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import SummaryWrapper from './wrapper';
import UserIcon from '../icons/user';
import { SUCCESS_COLOR } from '../../utilities/constant';
import Link from '../link';
import LINKS from '../../utilities/links';
import { useAppSelector } from '../../store/hooks';

const TotalUsers = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { statistics } = useAppSelector((store) => store.appState);
	return (
		<SummaryWrapper
			bgColor={SUCCESS_COLOR}
			amount={statistics ? statistics.total_users : '---'}
			icon={<UserIcon color={grey[50]} />}
		>
			<Typography style={styles.text} variant={'h6'}>
				Total Users
			</Typography>
			<Link to={LINKS.Users}>
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

export default TotalUsers;
