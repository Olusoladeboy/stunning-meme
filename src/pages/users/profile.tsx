import React from 'react';
import { Box, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import Layout from '../../components/layout';
import BackButton from '../../components/back-button';
import { BOX_SHADOW } from '../../utilities/constant';
import UserTab from '../../components/tabs/user';
import UserAvatarWithDetails from '../../components/user-avatar-with-details';
import UserWallet from '../../components/user-wallet';
import UserProfileDetails from '../../components/user-profile-details';

const Profile = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const handleChange = (value: string) => console.log(value);

	return (
		<Layout>
			<Box
				sx={{
					padding: { xs: '1.5rem 1rem', md: '2rem' },
				}}
				style={styles.container}
			>
				<BackButton />
				<UserTab handleChange={handleChange} />
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							md: 'repeat(2, 1fr)',
						},
					}}
				>
					<UserAvatarWithDetails />
					<UserWallet />
				</Box>
				<UserProfileDetails />
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'grid',
		gridTemplateColumn: '1fr',
		gap: theme.spacing(4),
		border: `1px solid ${theme.palette.secondary.main}`,

		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
});

export default Profile;
