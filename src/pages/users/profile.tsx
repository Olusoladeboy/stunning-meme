import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Box, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import Layout from '../../components/layout';
import BackButton from '../../components/back-button';
import { BOX_SHADOW } from '../../utilities/constant';
import UserTab from '../../components/tabs/user';
import LINKS from '../../utilities/links';
import { UserNavList } from '../../utilities/types';
import UserProfile from '../../components/user-profile';
import UserStatus from '../../components/user-status';
import UserTransaction from '../../components/user-transaction';
import UserWalletSummary from '../../components/user-wallet-summary';

const ID = '1234567890';

const Profile = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const location = useLocation();
	const navigate = useNavigate();

	const { tab } = queryString.parse(location.search);
	const [currentTab, setCurrentTab] = useState<string>(UserNavList.Profile);

	const handleChangeTab = (value: string) => {
		switch (value) {
			case UserNavList.Status:
				return navigate(`${LINKS.User}/${ID}?tab=${UserNavList.Status}`);

			case UserNavList.Transaction:
				return navigate(`${LINKS.User}/${ID}?tab=${UserNavList.Transaction}`);
			case UserNavList.WalletSummary:
				return navigate(`${LINKS.User}/${ID}?tab=${UserNavList.WalletSummary}`);

			default:
				navigate(`${LINKS.User}/${ID}`);
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

			default:
				setCurrentTab(UserNavList.Profile);
		}
	}, [tab]);

	return (
		<Layout>
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
						<UserProfile />
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
				</Box>
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
