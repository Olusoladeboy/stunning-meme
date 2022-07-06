import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import { Box, useTheme, CircularProgress, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Layout from '../../components/layout';
import BackButton from '../../components/back-button';
import { BOX_SHADOW } from '../../utilities/constant';
import UserTab from '../../components/tabs/user';
import LINKS from '../../utilities/links';
import {
	UserNavList,
	QueryKeyTypes,
	UserDetailsType,
} from '../../utilities/types';
import UserProfile from '../../components/user-profile';
import UserStatus from '../../components/user-status';
import UserTransaction from '../../components/user-transaction';
import UserWalletSummary from '../../components/user-wallet-summary';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';
import ManagerInfo from '../../components/user-manager-info';
import Button from '../../components/button';
import Modal from '../../components/modal/Wrapper';
import AssignManagerForm from '../../components/forms/assign-manager-form';

interface UserDetails extends UserDetailsType {
	manager: any;
}

const Profile = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { id } = useParams();
	const { token } = useAppSelector((store) => store.authState);
	const [userDetails, setUserDetails] = useState<null | UserDetails>(null);
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

	const { isLoading } = useQuery(
		QueryKeyTypes.GetSingleUser,
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
				<Modal
					title={'Assign Manager to User'}
					close={() => setDisplayModal(false)}
				>
					<AssignManagerForm
						close={() => setDisplayModal(false)}
						userDetails={userDetails}
					/>
				</Modal>
			)}
			<Layout>
				{isLoading ? (
					<Box style={styles.circularProgress}>
						<CircularProgress />
					</Box>
				) : (
					<>
						<Box
							sx={{
								padding: { xs: '1.5rem 1rem', md: '2rem' },
							}}
							style={styles.container}
						>
							<BackButton />
							<UserTab handleChange={handleChangeTab} />
							<Box>
								<Box hidden={currentTab !== UserNavList.Profile}>
									<UserProfile userDetails={userDetails} />
								</Box>
								<Box hidden={currentTab !== UserNavList.Status}>
									<UserStatus />
								</Box>
								<Box hidden={currentTab !== UserNavList.Transaction}>
									<UserTransaction />
								</Box>
								<Box hidden={currentTab !== UserNavList.WalletSummary}>
									<UserWalletSummary />
								</Box>
								<Box hidden={currentTab !== UserNavList.Manager}>
									{userDetails && userDetails.manager ? (
										<ManagerInfo
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
							</Box>
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
