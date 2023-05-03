import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	Layout,
	PushNotificationForm,
	ImagePreview,
	UploadImage,
} from 'components';
import { BOX_SHADOW } from 'utilities/constant';
import BackButton from 'components/back-button';

const CreateNotification = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [file, setFile] = useState<any | null>(null);

	return (
		<Layout>
			<Box style={styles.container}>
				<Box>
					<BackButton />
					<Typography
						variant={'h5'}
						sx={{ fontWeight: 'bold', marginTop: '2rem' }}
					>
						Create Notification
					</Typography>
				</Box>

				<PushNotificationForm />
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

export default CreateNotification;
