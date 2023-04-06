import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import { Box, useTheme, CircularProgress, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	Layout,
	BackButton,
	UserTab,
	UserProfile,
	UserStatus,
	UserTransaction,
	UserWalletSummary,
	UserManagerInfo,
	ModalLayout,
	AssignManagerForm,
	Button,
} from '../../components';
import { BOX_SHADOW } from '../../utilities/constant';
import LINKS from '../../utilities/links';
import { UserNavList, QueryKey, UserDetails } from '../../utilities/types';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';
import ErrorBoundary from '../../utilities/helpers/error-boundary';

interface User extends UserDetails {
	manager: any;
}

const Profile = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { id } = useParams();
	const { token } = useAppSelector((store) => store.authState);
	const [userDetails, setUserDetails] = useState<null | User>(null);
	const [isDisplayModal, setDisplayModal] = useState<boolean>(false);

	const location = useLocation();
	const navigate = useNavigate();

	const { tab } = queryString.parse(location.search);
	const [currentTab, setCurrentTab] = useState<string>(UserNavList.Profile);

	const handleChangeTab = (value: string) => {
		switch (value) {
			case UserNavList.Status:
				return navigate(`${LINKS.User}/${id}?tab=${UserNavList.Status}`);

			case UserNavList.Transaction:
				return navigate(`${LINKS.User}/${id}?tab=${UserNavList.Transaction}`);
			case UserNavList.WalletSummary:
				return navigate(`${LINKS.User}/${id}?tab=${UserNavList.WalletSummary}`);
			case UserNavList.Manager:
				return navigate(`${LINKS.User}/${id}?tab=${UserNavList.Manager}`);

			default:
				navigate(`${LINKS.User}/${id}`);
		}
		setCurrentTab(value);
	};

	useEffect(() => {
		switch (tab) {
			case UserNavList.Status:
				return setCurrentTab(UserNavList.Status);

			case UserNavList.Transaction:
				return setCurrentTab(UserNavList.Transaction);

			case UserNavList.WalletSummary:
				return setCurrentTab(UserNavList.WalletSummary);

			case UserNavList.Manager:
				return setCurrentTab(UserNavList.Manager);

			default:
				setCurrentTab(UserNavList.Profile);
		}
	}, [tab]);

	const { isLoading, data } = useQuery(
		QueryKey.GetSingleUser,
		() =>
			Api.User.GetUserById({
				token: token || '',
				id: id || '',
			}),
		{
			enabled: !!(token && id),
			onSettled: (data, error) => {
				if (data && data.success) {
					setUserDetails(data.payload[0]);
				}
			},
		}
	);

	return (
		<>
			{isDisplayModal && (
				<ModalLayout
					title={'Assign Manager to User'}
					hasCloseButton
					closeModal={() => setDisplayModal(false)}
				>
					<AssignManagerForm
						close={() => setDisplayModal(false)}
						userDetails={userDetails}
					/>
				</ModalLayout>
			)}
			<Layout>
				{isLoading ? (
					<Box style={styles.circularProgress}>
						<CircularProgress />
					</Box>
				) : (
					<>
						<Box
							sx={{ padding: { xs: '1rem 0px', md: '2rem 0px' } }}
							style={styles.container}
						>
							<Box
								sx={{
									padding: { xs: '0px 1rem', md: '0px 2rem' },
									display: 'grid',
									gap: '2rem',
								}}
							>
								<BackButton />
								<UserTab
									currentTab={currentTab as string}
									handleChange={handleChangeTab}
								/>
							</Box>
							<ErrorBoundary>
								<Box
									sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' } }}
									hidden={currentTab !== UserNavList.Profile}
								>
									<UserProfile
										user={
											data && data.payload && Array.isArray(data.payload)
												? data.payload[0]
												: data.payload
										}
									/>
								</Box>
								<Box
									sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' } }}
									hidden={currentTab !== UserNavList.Status}
								>
									<UserStatus
										user={
											data && data.payload && Array.isArray(data.payload)
												? data.payload[0]
												: data.payload
										}
									/>
								</Box>
								<Box hidden={currentTab !== UserNavList.Transaction}>
									<UserTransaction
										user={
											data && data.payload && Array.isArray(data.payload)
												? data.payload[0]
												: data.payload
										}
									/>
								</Box>
								<Box hidden={currentTab !== UserNavList.WalletSummary}>
									<UserWalletSummary
										user={
											data && data.payload && Array.isArray(data.payload)
												? data.payload[0]
												: data.payload
										}
									/>
								</Box>
								<Box
									sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' } }}
									hidden={currentTab !== UserNavList.Manager}
								>
									{userDetails && userDetails.manager ? (
										<UserManagerInfo
											changeManager={() => setDisplayModal(true)}
											manager={userDetails.manager}
										/>
									) : (
										<Box>
											<Typography sx={{ marginBottom: theme.spacing(2) }}>
												User does not have a manage
											</Typography>
											<Button
												onClick={() => setDisplayModal(true)}
												style={styles.button}
											>
												Assign manager to user
											</Button>
										</Box>
									)}
								</Box>
							</ErrorBoundary>
						</Box>
					</>
				)}
			</Layout>
		</>
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
	circularProgress: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
	},
});

export default Profile;
