import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import { grey } from '@mui/material/colors';
import Layout from '../../components/layout';
import BackButton from '../../components/back-button';
import { BOX_SHADOW } from '../../utilities/constant';
import KycForm from '../../components/forms/kyc-form';
import { QueryKey } from '../../utilities/types';
import { useAppSelector } from '../../store/hooks';
import Api from '../../utilities/api';
import { useAlert } from '../../utilities/hooks';

const Kyc = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const setAlert = useAlert();
	const [kycLimits, setKycLimits] = useState<{ [key: string]: any } | null>(
		null
	);
	const { token } = useAppSelector((store) => store.authState);

	useQuery(QueryKey.KycLimit, () => Api.KycLimits.Retrieve(token || ''), {
		onSettled: (data, error) => {
			if (error) {
				setAlert({ data: error, type: 'error' });
			}
			if (data && data.success) {
				const payload = data.payload;
				let store_key = {};
				for (let i in payload) {
					store_key = { ...store_key, [payload[i].level]: payload[i] };
				}
				setKycLimits(store_key);
			}
		},
	});

	return (
		<Layout>
			<Box style={styles.container}>
				<BackButton text={'KYC Limit'} />
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							md: 'repeat(2, 1fr)',
						},
						gap: '3rem',
					}}
				>
					<KycForm level={1} data={kycLimits && kycLimits[1]} />
					<KycForm level={2} data={kycLimits && kycLimits[2]} />
					<KycForm level={3} data={kycLimits && kycLimits[3]} />
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
		padding: '1.5rem',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	title: {
		fontWeight: '600',
	},
});

export default Kyc;
