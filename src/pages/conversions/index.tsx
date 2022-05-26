import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import Layout from '../../components/layout';
import { BOX_SHADOW } from '../../utilities/constant';
import ConversionsTable from '../../components/table/conversions-table';
import ConversionTotal from '../../components/conversion-total';
import AvailableNetwork from '../../components/available-network';

const Conversions = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Layout>
			<Box style={styles.container}>
				<Box sx={{ padding: '0px 2rem' }}>
					<Typography sx={{ marginBottom: theme.spacing(2) }} variant={'h5'}>
						Conversions
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								md: 'repeat(2, 1fr)',
							},
							gap: theme.spacing(5),
						}}
					>
						<ConversionTotal />
						<AvailableNetwork />
					</Box>
				</Box>
				<ConversionsTable data={[]} />
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
});

export default Conversions;
