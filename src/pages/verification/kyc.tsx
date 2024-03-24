import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import { grey } from '@mui/material/colors';
import { Layout, BackButton, KycForm } from 'components';
import { BOX_SHADOW, QueryKeys } from 'utilities';
import { useAlert, useHandleError, usePageTitle } from 'hooks';
import { kycs } from 'api';

const Kyc = () => {
	usePageTitle('KYC Limit');
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const setAlert = useAlert();
	const [kycLimits, setKycLimits] = useState<{ [key: string]: any } | null>(
		null
	);

	useQuery(QueryKeys.KycLimit, kycs, {
		refetchOnWindowFocus: false,
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message)
					setAlert({ message: response.message, type: 'error' });
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
