import React, { useRef, useCallback, ChangeEvent } from 'react';
import { ButtonProps, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

interface Props extends ButtonProps {
	setFile?: (file: any) => void;
	setPreviewImage?: (preview: any) => void;
}

const UploadImageButton = ({
	setFile,
	setPreviewImage,
	children,
	...rest
}: Props) => {
	const { enqueueSnackbar } = useSnackbar();
	const inputEl = useRef<HTMLInputElement>(null);
	const onClick = useCallback(
		() => {
			if (inputEl.current) {
				inputEl.current.click();
			}
		},
		// eslint-disable-next-line
		[]
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files) {
			let reader = new FileReader();
			let file = e.target.files[0];
			console.log(file);
			if (file.size > 1048576) {
				enqueueSnackbar('Image Size must not exceed 1MB', { variant: 'info' });
				return;
			}
			if (file) {
				reader.readAsDataURL(file);
			}
			reader.onloadend = () => {
				typeof setFile !== 'undefined' && setFile(file);
				typeof setPreviewImage !== 'undefined' &&
					setPreviewImage(reader.result);
				// setImagePreviewUrl(reader.result);
			};
		}
	};

	return (
		<Button onClick={() => onClick()} {...rest}>
			<input
				onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
				ref={inputEl}
				type={'file'}
				style={{ display: 'none' }}
				accept={'image/*'}
			/>
			{children}
		</Button>
	);
};

export default UploadImageButton;
