import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import DetailItem from './detail-item';
import Button from '../button';
import { grey } from '@mui/material/colors';
import ModalWrapper from '../modal/Wrapper';
import EditProfileForm from '../forms/edit-profile';

const UserProfileDetails = () => {
	const theme = useTheme();
	const [isEditProfile, setEditProfile] = useState<boolean>(false);
	return (
		<Box>
			{isEditProfile && (
				<ModalWrapper
					close={() => setEditProfile(false)}
					title={'Edit Profile'}
				>
					<EditProfileForm />
				</ModalWrapper>
			)}
			<Typography sx={{ marginBottom: theme.spacing(4) }} variant={'h5'}>
				user profile
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
				<DetailItem text={'name'} value={'Bisoye Amadi'} />
				<DetailItem text={'date joined'} value={'11/11/22'} />
				<DetailItem text={'Username'} value={'Bisoye Amadi'} />
				<DetailItem text={'pnone number'} value={'08101234567'} />
				<DetailItem text={'email'} value={'Bisoye@gmail.com'} />
				<DetailItem
					text={'verification status'}
					value={
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: theme.spacing(4),
							}}
						>
							<Typography>UNVERIFIED</Typography>
							<Typography>VERIFY USER</Typography>
						</Box>
					}
				/>
			</Box>
			<Button
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
	);
};

export default UserProfileDetails;
