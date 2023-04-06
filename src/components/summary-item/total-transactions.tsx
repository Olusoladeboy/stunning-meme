import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import SummaryWrapper from './wrapper';
import TransactionIcon from '../icons/transaction';
import { SECOUNDARY_COLOR, LINKS } from '../../utilities';
import Link from '../link';
import { useAppSelector } from '../../store/hooks';

const TotalTransactions = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { statistics } = useAppSelector((store) => store.appState);
	return (
		<SummaryWrapper
			bgColor={SECOUNDARY_COLOR}
			amount={statistics ? statistics.total_transactions : '---'}
			icon={<TransactionIcon color={grey[50]} />}
		>
			<Typography style={styles.text} variant={'h6'}>
				Total transactions
			</Typography>
			<Link to={LINKS.Transactions}>
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

export default TotalTransactions;
