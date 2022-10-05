import React, { CSSProperties } from 'react';
import { Box, Avatar, Typography, useTheme } from '@mui/material';
import { ManagerDetailsData, UserDetails } from '../../utilities/types';
import { DANGER_COLOR, SUCCESS_COLOR } from '../../utilities/constant';

type Props = {
	user: UserDetails | null;
	userType?: 'user' | 'manager';
};

const UserAvatarWithDetails = ({ user, userType = 'user' }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container}>
			<Avatar src={(user && user.avatar) || ''} style={styles.avatar} />
			<Box style={styles.detailsWrapper as CSSProperties}>
				<Typography style={styles.nameText} variant={'body1'}>
					{user && `${user.firstname} ${user.lastname}`}
				</Typography>
				<Typography style={styles.text} variant={'body1'}>
					{user && user.email}
				</Typography>
				{user && (
					<Typography
						style={{
							...styles.text,
							textTransform: 'uppercase',
							color: user.verified ? SUCCESS_COLOR : DANGER_COLOR,
						}}
						variant={'body1'}
					>
						{user.verified ? 'Verified' : 'Not verified'}
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
	nameText: {
		fontSize: '18px',
		fontWeight: '600',
	},
	text: {
		fontWeight: '600',
	},
});

export default UserAvatarWithDetails;
