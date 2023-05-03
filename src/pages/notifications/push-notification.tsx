import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	Layout,
	PushNotificationForm,
	ImagePreview,
	UploadImage,
} from 'components';
import { BOX_SHADOW } from 'utilities/constant';
import BackButton from 'components/back-button';

const PushNotification = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [file, setFile] = useState<any | null>(null);

	return (
		<Layout>
			<Box style={styles.container}>
				<BackButton text={'Push Notification'} />
				<Box
					sx={{
						display: 'flex',
						gap: theme.spacing(4),
						gridTemplateColumns: '3.5fr 6.5fr',
						maxWidth: '540px',
					}}
				>
					<UploadImage
						sx={{
							flexShrink: 0,
							height: {
								xs: '120px',
								md: '160px',
							},
							width: {
								xs: '120px',
								md: '160px',
							},
						}}
						setFile={setFile}
					/>
					<ImagePreview
						sx={{
							overflow: 'hidden',
							height: {
								xs: '120px',
								md: '160px',
							},
							width: '100%',
						}}
						src={file ? URL.createObjectURL(file) : ''}
					/>
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

export default PushNotification;
