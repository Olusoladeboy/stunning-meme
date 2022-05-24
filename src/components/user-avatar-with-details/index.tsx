import React, { CSSProperties } from 'react';
import { Box, Avatar, Typography, useTheme } from '@mui/material';

type Props = {
	details?: { [key: string]: any };
};

const UserAvatarWithDetails = ({ details }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container}>
			<Avatar src={(details && details.avatar) || ''} style={styles.avatar} />
			<Box style={styles.detailsWrapper as CSSProperties}>
				<Typography style={styles.text} variant={'body1'}>
					{details && details.name}
				</Typography>
				<Typography style={styles.text} variant={'body1'}>
					{details && details.email}
				</Typography>
				{details && details.verifiedStatev && (
					<Typography style={styles.text} variant={'body1'}>
						Verified Status
					</Typography>
				)}
				{details && details.role && (
					<Typography style={styles.text} variant={'body1'}>
						{details.role}
					</Typography>
				)}
			</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(3),
	},
	avatar: {
		height: '120px',
		width: '120px',
	},
	detailsWrapper: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(2),
	},
	text: {
		fontWeight: '600',
	},
});

export default UserAvatarWithDetails;
