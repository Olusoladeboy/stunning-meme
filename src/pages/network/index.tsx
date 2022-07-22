import React, { ComponentProps } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import Layout from '../../components/layout';
import { BOX_SHADOW } from '../../utilities/constant';
import { NetworkPageTypes } from '../../utilities/types';
import NetworkDescriptiveAndAddButton from '../../components/network-descriptive-message-and-add-buttton';
import DataNetworkTable from '../../components/table/data-network-table';
import AirtimeNetworkTable from '../../components/table/airtime-network-table';
import ConversionNetworkTable from '../../components/table/conversion-network-table';

interface Props extends ComponentProps<any> {
	pageType:
		| NetworkPageTypes.AIRTIME_NETWORK
		| NetworkPageTypes.DATA_NETWORK
		| NetworkPageTypes.CONVERSION_NETWORK;
}

const Network = ({ pageType }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<Layout>
			<Box style={styles.container}>
				<Box sx={{ padding: '0px 2rem' }}>
					<Typography
						style={styles.title}
						sx={{ marginBottom: theme.spacing(2) }}
						variant={'h5'}
					>
						{pageType}
					</Typography>
					<NetworkDescriptiveAndAddButton
						type={pageType}
						message={`Edit ${pageType} plan`}
					/>
				</Box>
				{pageType === NetworkPageTypes.DATA_NETWORK ? (
					<DataNetworkTable />
				) : pageType === NetworkPageTypes.AIRTIME_NETWORK ? (
					<AirtimeNetworkTable />
				) : (
					<ConversionNetworkTable />
				)}
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
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	title: {
		fontWeight: '600',
	},
});

export default Network;
