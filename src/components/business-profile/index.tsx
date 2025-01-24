import React, { CSSProperties, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import DetailItem from './detail-item';
import Button from '../button';
import ModalWrapper from '../modal/Wrapper';
import EditProfileForm from '../forms/profile-form';
import UserAvatarWithDetails from '../avatar-with-details';
import {
	User,
	SUCCESS_COLOR,
	QueryKeys,
	extractUserName,
	IBusiness,
} from 'utilities';
import VerifyUser from '../verify-user';
import { restoreDeletedAccount, walletAccount } from 'api';
import { useHandleError, useAlert } from 'hooks';
import Loader from 'components/loader';
import { UserWallet, UserLien } from 'components';
import { useAppSelector } from 'store/hooks';
import BusinessAvatarWithDetails from 'components/avatar-with-details/business';

type Props = {
	business?: IBusiness | null;
};

const BusinessProfile = ({ business }: Props) => {
	const alert = useAlert();
	const navigate = useNavigate();
	const handleError = useHandleError();
	const queryClient = useQueryClient();
	const theme = useTheme();

	const token = useAppSelector((store) => store.authState.token);

	const styles = useStyles(theme);
	const [isEditProfile, setEditProfile] = useState<boolean>(false);

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

	const { data: dataWallet } = useQuery(
		[QueryKeys.UserWallet, business?.id],
		() =>
			walletAccount({
				user: business?.id,
			}),
		{
			enabled: !!(token && business),
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						alert({ message: response.message, type: 'error' });
					}
				}
			},
		}
	);

	const wallet =
		dataWallet &&
		dataWallet.payload &&
		Array.isArray(dataWallet.payload) &&
		dataWallet.payload[0];

	return (
		<>
			{isRestoringAccount && <Loader />}
			<Box>
				<Box
					sx={{
						display: 'grid',
						gap: ['1rem', '20px'],
						gridTemplateColumns: {
							xs: '1fr',
							md: 'repeat(3, 1fr)',
						},
					}}
				>
					<BusinessAvatarWithDetails business={business} />
					{/* <UserWallet wallet={wallet} user={business} /> */}
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
						Business profile
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
						<DetailItem text={'name'} value={business?.businessName} />
						<DetailItem
							text={'date joined'}
							value={business && moment.utc(business.createdAt).format('l')}
						/>
						<DetailItem
							text={'Business number'}
							value={
								typeof business?.businessOwner === 'object' &&
								business.businessOwner.phone
							}
						/>
						<DetailItem
							text={'Business email'}
							value={
								typeof business?.businessOwner === 'object' &&
								business.businessOwner.phone
							}
						/>
						{/* <DetailItem
							text={'Kyc Level'}
							value={user && `Level ${user.kycLevel}`}
						/> */}
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

export default BusinessProfile;
