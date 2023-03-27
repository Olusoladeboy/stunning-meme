import React, { CSSProperties, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import DetailItem from './detail-item';
import Button from '../button';
import ModalWrapper from '../modal/Wrapper';
import EditProfileForm from '../forms/profile-form';
import UserAvatarWithDetails from '../avatar-with-details';
import UserWallet from '../user-wallet';
import { UserDetails } from '../../utilities/types';
import { SUCCESS_COLOR } from '../../utilities/constant';
import VerifyUser from '../verify-user';

type Props = {
	user: UserDetails | null;
};

const UserProfile = ({ user }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [isEditProfile, setEditProfile] = useState<boolean>(false);
	return (
		<Box>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: 'repeat(2, 1fr)',
					},
				}}
			>
				<UserAvatarWithDetails user={user} />
				<UserWallet user={user} />
			</Box>
			<Box sx={{ marginTop: theme.spacing(5) }}>
				{isEditProfile && (
					<ModalWrapper
						closeModal={() => setEditProfile(false)}
						title={'Edit Profile'}
					>
						<EditProfileForm />
					</ModalWrapper>
				)}
				<Typography sx={{ marginBottom: theme.spacing(4) }} variant={'h5'}>
					User profile
				</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							md: 'repeat(2, 1fr)',
						},
						rowGap: theme.spacing(3),
						columnGap: theme.spacing(6),
					}}
				>
					<DetailItem
						text={'name'}
						value={user && `${user.firstname} ${user.lastname}`}
					/>
					<DetailItem
						text={'date joined'}
						value={user && moment.utc(user.createdAt).format('l')}
					/>
					<DetailItem text={'Username'} value={user && user.username} />
					<DetailItem text={'pnone number'} value={user && user.phone} />
					<DetailItem text={'email'} value={user && user.email} />
					<DetailItem
						text={'verification status'}
						value={
							user && user.verified ? (
								<Typography style={styles.verifyText as CSSProperties}>
									Verified
								</Typography>
							) : (
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: theme.spacing(4),
									}}
								>
									<Typography>UNVERIFIED</Typography>
									<VerifyUser
										buttonProps={{ style: styles.verifyButton }}
										user={user}
									/>
								</Box>
							)
						}
					/>
				</Box>
				<Button
					disabled
					onClick={() => setEditProfile(true)}
					sx={{
						backgroundColor: theme.palette.secondary.main,
						color: grey[50],
						textTransform: 'uppercase',
						fontWeight: '600',
						minWidth: '140px',
						marginTop: theme.spacing(4),
						':hover': {
							backgroundColor: theme.palette.secondary.main,
						},
					}}
				>
					Edit profile
				</Button>
			</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	verifyText: {
		color: SUCCESS_COLOR,
		textTransform: 'uppercase',
		fontWeight: '600',
	},
	verifyButton: {
		border: `1px solid ${SUCCESS_COLOR}`,
		color: SUCCESS_COLOR,
	},
});

export default UserProfile;
