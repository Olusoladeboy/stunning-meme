import React, { useState } from 'react';
import { Box, Avatar, useTheme } from '@mui/material';
import { CameraAlt, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { LIGHT_GRAY, DANGER_COLOR, API_ENDPOINTS } from '../../utilities';
import Button from '../button';
import UploadImageButton from '../button/upload-image-button';
import { useAppSelector } from '../../store/hooks';
import PreviewProfileImageModal from '../modal/preview-profile-image-modal';
import { useHandleError, useAlert } from '../../hooks';

const baseUrl = process.env.REACT_APP_API_URI as string;

interface IUploadUserAvatar {
	managerId: string;
}

const UploadUserAvatar: React.FC<IUploadUserAvatar> = ({ managerId }) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const alert = useAlert();
	const styles = useStyles(theme);
	const [file, setFile] = useState<any>(null);
	const [previewImage, setPreviewImage] = useState<string>('');
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();
	const [photoUrl, setPhotoUrl] = useState<string>('');

	const { user, token } = useAppSelector((store) => store.authState);

	const handleClosePreviewModal = () => {
		setFile(null);
		setPreviewImage('');
	};

	const [isLoading, setLoading] = useState(false);
	const handleSave = async () => {
		const formData = new FormData();
		formData.append('file-upload', file);
		setLoading(true);

		try {
			const res = await axios.post(
				`${baseUrl}/${API_ENDPOINTS.Manager}/upload-display-picture/${managerId}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = res.data;
			if (data && data.success) {
				setLoading(false);
				setPhotoUrl(data.payload.photoUrl);
				alert({ message: data.message, type: 'success' });
				setFile(null);
				setPreviewImage('');
			}
		} catch (error) {
			setLoading(false);
			const res = handleError({ error });
			if (res?.message) {
				alert({ message: res.message, type: 'error' });
			}
		}
	};

	return (
		<>
			{file && previewImage && (
				<PreviewProfileImageModal
					handleSave={() => handleSave()}
					image={previewImage}
					close={() => handleClosePreviewModal()}
					isLoading={isLoading}
				/>
			)}
			<Box style={styles.container}>
				<Avatar
					src={photoUrl}
					sx={{
						// backgroundImage: `url(${require('../../assets/images/stripBg.png')})`,
						backgroundSize: '400%',
						backgroundPosition: 'center',
						color: theme.palette.primary.main,
					}}
					style={styles.avatar}
				/>
				<UploadImageButton
					setFile={(file: string) => setFile(file)}
					setPreviewImage={(preview) => setPreviewImage(preview)}
					style={styles.uploadBtn}
					startIcon={<CameraAlt />}
				>
					Upload Image
				</UploadImageButton>
				{user?.avatar && (
					<Button style={styles.deleteBtn} startIcon={<Delete />}>
						Delete Image
					</Button>
				)}
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		// alignItems: 'center',
		gap: theme.spacing(3),
	},
	avatar: {
		borderRadius: '5px',
		backgroundColor: LIGHT_GRAY,
		height: '50px',
		width: '50px',
		border: `1px solid ${theme.palette.primary.main}`,
	},
	uploadBtn: {
		backgroundColor: 'unset',
		border: `1px solid ${theme.palette.primary.main}`,
		minWidth: '200px',
		fontWeight: '600',
		color: theme.palette.primary.main,
	},
	deleteBtn: {
		backgroundColor: 'unset',
		border: `1px solid ${DANGER_COLOR}`,
		minWidth: '200px',
		fontWeight: '600',
		color: DANGER_COLOR,
	},
});

export default UploadUserAvatar;
