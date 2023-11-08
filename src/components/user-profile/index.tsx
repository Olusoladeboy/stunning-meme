import React, { CSSProperties, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import DetailItem from './detail-item';
import Button from '../button';
import ModalWrapper from '../modal/Wrapper';
import EditProfileForm from '../forms/profile-form';
import UserAvatarWithDetails from '../avatar-with-details';
import { User, SUCCESS_COLOR, QueryKeys } from 'utilities';
import VerifyUser from '../verify-user';
import { restoreDeletedAccount } from 'api';
import { useHandleError, useAlert } from 'hooks';
import Loader from 'components/loader';

type Props = {
	user: User | null;
};

const UserProfile = ({ user }: Props) => {
	const alert = useAlert();
	const navigate = useNavigate();
	const handleError = useHandleError();
	const queryClient = useQueryClient();
	const theme = useTheme();

	const styles = useStyles(theme);
	const [isEditProfile, setEditProfile] = useState<boolean>(false);

	const isAccountDeleted = user?.deleted;

	// Restor user mutation
	const { isLoading: isRestoringAccount, mutate: mutateRestoreAccount } =
		useMutation(restoreDeletedAccount, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });

					if (response && response.message) {
						alert({
							message: response.message,
							type: 'error',
						});
					}

					return;
				}

				queryClient.invalidateQueries([QueryKeys.User]);
				queryClient.invalidateQueries([QueryKeys.Users]);
				queryClient.invalidateQueries([QueryKeys.Statistics]);

				alert({
					message: 'Account restore successfully!',
					type: 'success',
				});
				navigate(-1);
			},
		});

	const handleRestoreAccount = () => mutateRestoreAccount(user?.id as string);

	return (
		<>
			{isRestoringAccount && <Loader />}
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
							text={'Kyc Level'}
							value={user && `Level ${user.kycLevel}`}
						/>
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
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: ['25px', '50px', '100px'],
						}}
					>
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
						{isAccountDeleted && (
							<Button
								onClick={handleRestoreAccount}
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
								Restore account
							</Button>
						)}
					</Box>
				</Box>
			</Box>
		</>
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
