import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import DetailItem from './detail-item';
import Button from '../button';
import ModalWrapper from '../modal/Wrapper';
import EditProfileForm from '../forms/profile-form';
import { SUCCESS_COLOR, QueryKeys, IBusiness } from 'utilities';
import { restoreDeletedAccount } from 'api';
import { useHandleError, useAlert } from 'hooks';
import Loader from 'components/loader';
import BusinessAvatarWithDetails from 'components/avatar-with-details/business';
import UpdateBusinessStatusForm from 'components/forms/update-business-status-form';
import { ModalLayout } from 'components';

type Props = {
	business?: IBusiness;
};

const BusinessProfile = ({ business }: Props) => {
	const alert = useAlert();
	const navigate = useNavigate();
	const handleError = useHandleError();
	const queryClient = useQueryClient();
	const theme = useTheme();
	const styles = useStyles(theme);

	const [isEditProfile, setEditProfile] = useState<boolean>(false);
	const [isDisplayModal, setDisplayModal] = useState<boolean>(false);

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

	return (
		<>
			{isRestoringAccount && <Loader />}
			{isDisplayModal && (
				<ModalLayout
					title={'Update Business'}
					hasCloseButton
					closeModal={() => setDisplayModal(false)}
				>
					<UpdateBusinessStatusForm
						formData={business}
						callback={() => setDisplayModal(false)}
					/>
				</ModalLayout>
			)}
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
								business.businessOwner.email
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
							marginTop: theme.spacing(4),
						}}
					>
						<Button
							onClick={() => setDisplayModal(true)}
							style={styles.updateButton}
						>
							Update Status
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
	updateButton: {
		backgroundColor: theme.palette.secondary.main,
		color: 'white',
		borderColor: theme.palette.secondary.main,
		minWidth: '120px',
	},
});

export default BusinessProfile;
