import React, { CSSProperties } from 'react';
import { Box, Avatar, Typography, useTheme } from '@mui/material';

const UserAvatarWithDetails = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container}>
			<Avatar style={styles.avatar} />
			<Box style={styles.detailsWrapper as CSSProperties}>
				<Typography style={styles.text} variant={'body1'}>
					Name
				</Typography>
				<Typography style={styles.text} variant={'body1'}>
					Email
				</Typography>
				<Typography style={styles.text} variant={'body1'}>
					Verified Status
				</Typography>
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
