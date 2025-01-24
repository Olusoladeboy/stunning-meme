import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import { Box, useTheme, CircularProgress, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	Layout,
	BackButton,
	UserStatus,
	ModalLayout,
	AssignManagerForm,
	BusinessTab,
	BusinessProfile,
} from 'components';
import {
	BOX_SHADOW,
	LINKS,
	UserNavList,
	QueryKeys,
	User,
	IBusiness,
} from 'utilities';
import { useAppSelector } from 'store/hooks';
import ErrorBoundary from 'utilities/helpers/error-boundary';
import { useHandleError, useAlert } from 'hooks';
import { businesses } from 'api';

const Profile = () => {
	const theme = useTheme();
	const alert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);

	const { id } = useParams();

	const location = useLocation();
	const { token } = useAppSelector((store) => store.authState);
	const [user, setUser] = useState<null | User>(null);
	const [isDisplayModal, setDisplayModal] = useState<boolean>(false);

	const navigate = useNavigate();

	const query = queryString.parse(location.search);

	const link = (tab: string) => {
		const deleted = query._deleted;
		let defaultLink = `${LINKS.Business}/${id}`;

		if (tab) defaultLink = `${LINKS.Business}/${id}?tab=${tab}`;

		if (deleted)
			defaultLink = tab
				? `${LINKS.Business}/${id}?tab=${tab}&_deleted=true`
				: `${LINKS.Users}/${id}?_deleted=true`;

		return defaultLink;
	};

	const { tab } = queryString.parse(location.search);
	const [currentTab, setCurrentTab] = useState<string>(UserNavList.Profile);

	const handleChangeTab = (value: string) => {
		switch (value) {
			case UserNavList.Status:
				return navigate(link(UserNavList.Status));

			case UserNavList.Transaction:
				return navigate(link(UserNavList.Transaction));

			default:
				navigate(`${LINKS.Users}/${id}`);
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
		[QueryKeys.Business, id],
		() =>
			businesses({
				_id: id,
				populate: 'businessOwner',
			}),
		{
			enabled: !!(id && token),
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}
				if (
					data &&
					data.success &&
					data.payload &&
					Array.isArray(data.payload)
				) {
					setUser(data.payload[0]);
				}
			},
		}
	);

	const dataBusiness =
		data && data.payload && Array.isArray(data.payload) && data.payload[0];

	return (
		<>
			{isDisplayModal && (
				<ModalLayout
					title={'Assign Manager to User'}
					hasCloseButton
					closeModal={() => setDisplayModal(false)}
				>
					<AssignManagerForm close={() => setDisplayModal(false)} User={user} />
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
								<BusinessTab
									currentTab={currentTab as string}
									handleChange={handleChangeTab}
								/>
							</Box>
							<ErrorBoundary>
								<Box
									sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' } }}
									hidden={currentTab !== UserNavList.Profile}
								>
									<BusinessProfile business={dataBusiness as IBusiness} />
								</Box>
								<Box
									sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' } }}
									hidden={currentTab !== UserNavList.Status}
								>
									<UserStatus user={dataBusiness as IBusiness} />
								</Box>
								<Box hidden={currentTab !== UserNavList.Transaction}>
									<Typography>Business Transaction</Typography>
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
