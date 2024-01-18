import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
	styled,
	Box,
	Typography,
	FormHelperText,
	FormControl as MuiFormControl,
	MenuItem,
	ListItem,
	List,
	IconButton,
	Tooltip,
	FormLabel as MuiFormLabel,
} from '@mui/material';
import { ImageOutlined, Close } from '@mui/icons-material';
import * as yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import UploadImage from '../form-components/upload-image';
import { createNotification } from 'api';
import { useHandleError, useAlert, useSearchUser } from 'hooks';
import Select from '../form-components/select';
import TextInput from '../form-components/TextInput';
import {
	QueryKeys,
	Notification,
	DISPATCH_USER,
	DEVICE,
	User,
	NOTIFICATION_TYPE,
	SECOUNDARY_COLOR,
	ENDPOINTS,
	TOOL_BAR_OPTIONS,
} from 'utilities';
import Button from '../button';
import Image from '../image';
import SearchInput from '../form-components/search-input';
import Modal from '../modal/Wrapper';
import { grey } from '@mui/material/colors';
import { useAppSelector } from 'store/hooks';
import CircularProgress from '../loader/circular-progress';

const SELECT_NOTIFICATION_TYPE = 'Select notification type';
const SELECT_TARGET_DEVICE = 'Select target device';
const SELECT_DISPATCH_TYPE = 'Select dispatch user';

const BASE_URL = process.env.REACT_APP_API_URI as string;

interface SelectedUserItemProps {
	user: User;
	removeUser: (user: User) => void;
}

const NotificationLists = [
	NOTIFICATION_TYPE.PUSH_NOTIFICATION,
	NOTIFICATION_TYPE.EMAIL_NOTIFICATION,
];

const SelectedUserItem: React.FC<SelectedUserItemProps> = ({
	user,
	removeUser,
}) => {
	return (
		<ListItem
			disablePadding
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Typography>
				{user.username}
			</Typography>
			<Tooltip title={'Remove user'}>
				<IconButton onClick={() => removeUser(user)}>
					<Close />
				</IconButton>
			</Tooltip>
		</ListItem>
	);
};

interface Props {
	notification?: Notification;
}

const NotificationForm: React.FC<Props> = ({ notification }) => {
	const alert = useAlert();
	const { searchUser, search, clearSearch, isSearching } = useSearchUser();
	const [users, setUsers] = useState<string[]>([]);
	const [selectedUser, setSelectedUser] = useState<User[]>([]);
	const { token } = useAppSelector((store) => store.authState);
	const handleError = useHandleError();

	const notificationSchema = yup.object().shape({
		subject: yup.string().required('Enter notification title'),
		message: yup.string().required('Enter notification message'),
		imageUrl: yup
			.string()
			.required('Upload a notification image')
			.url('Provide image url'),
	});

	// Select User
	const handleSelectUser = (user: User) => {
		const filter_user = users.find((id) => id === user.id);
		if (filter_user) {
			return alert({ message: 'User is already select', type: 'info' });
		}

		setUsers([...users, user.id as string]);
		setSelectedUser([...selectedUser, user]);

		//Close Modal
		clearSearch();
	};

	// Remove User
	const removeUser = (user: User) => {
		setSelectedUser(selectedUser.filter((value: User) => value.id !== user.id));
		setUsers(users.filter((id: string) => id !== user.id));
	};

	const queryClient = useQueryClient();
	const handleResponse = useHandleError();

	const initialValues: Notification = {
		message: '',
		subject: '',
		imageUrl: '',
		type: SELECT_NOTIFICATION_TYPE,
		devices: SELECT_TARGET_DEVICE,
		dispatchUserType: SELECT_DISPATCH_TYPE,
		users: [],
	};

	const { isLoading, mutate } = useMutation(createNotification, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleResponse({ error });
				if (response?.message) {
					alert({ message: response.message, type: 'error' });
				}
			}

			if (data && data.success) {
				alert({ message: data.message, type: 'success' });
				queryClient.invalidateQueries([QueryKeys.Notifications]);
				resetForm();
				setUsers([]);
			}
		},
	});

	const {
		touched,
		errors,
		values,
		handleChange,
		handleSubmit,
		resetForm,
		setFieldValue,
	} = useFormik({
		initialValues,
		validationSchema: notificationSchema,
		onSubmit: (values) => {
			const {
				type,
				message,
				subject,
				imageUrl,
				dispatchUserType,
				devices,
				// users,
			} = values;
			const payload: Notification = {
				subject,
				imageUrl,
				message,
				type,
				dispatchUserType,
			};

			if (NotificationLists.includes(type as string)) {
			}

			if (dispatchUserType === DISPATCH_USER.SELECTED) payload.users = users;
			if (devices && devices !== SELECT_TARGET_DEVICE) payload.devices = devices;

			mutate(payload);
		},
	});

	const { message, subject, imageUrl, type, devices, dispatchUserType } = values;

	/*
	 *Save Image
	 */
	const [isUploading, setUploading] = useState(false);

	const saveImage = async (file: any) => {
		const formData = new FormData();
		formData.append('file-upload', file);
		setUploading(true);

		try {
			const res = await axios.post(
				`${BASE_URL}/${ENDPOINTS.Notification}/upload-media`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = res.data;
			if (data && data.success) {
				setFieldValue('imageUrl', data.payload.url);
				alert({ message: data.message, type: 'success' });
			}
		} catch (error) {
			const res = handleError({ error });
			if (res?.message) {
				alert({ message: res.message, type: 'error' });
			}
		}

		setUploading(false);
	};

	const handleSelectNotificationType = (type: string) => {
		setFieldValue('dispatchUserType', SELECT_DISPATCH_TYPE);
		setFieldValue('type', type);
		setUsers([]);
		setSelectedUser([]);
		setFieldValue('subject', '');
		setFieldValue('message', '');
	};

	return (
		<>
			{search && (
				<Modal hasCloseButton closeModal={() => clearSearch()}>
					<ModalTitle variant={'h6'}>Found User</ModalTitle>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Typography>
							{search && search[0].username}
						</Typography>
						<AddUserButton onClick={() => handleSelectUser(search[0])}>
							Add user
						</AddUserButton>
					</Box>
				</Modal>
			)}
			<Form component={'form'}>
				<MuiFormControl
					error={touched.imageUrl && errors.imageUrl ? true : false}
				>
					<ImageContainer
						sx={{
							alignItems: imageUrl ? 'flex-start' : 'unset',
						}}
					>
						<UploadImage setFile={(file: string) => saveImage(file)} />
						<ImagePreview>
							{isUploading && (
								<CircularProgress
									sx={{
										position: 'absolute',
										zIndex: (theme) => theme.zIndex.modal,
									}}
								/>
							)}
							{imageUrl ? (
								<Image src={imageUrl} alt={'Preview'} />
							) : (
								<>
									<ImageOutlined />
									<Typography variant={'body1'}>Image Preview</Typography>
								</>
							)}
						</ImagePreview>
					</ImageContainer>
					{touched.imageUrl && errors.imageUrl && (
						<FormHelperText>{errors.imageUrl}</FormHelperText>
					)}
				</MuiFormControl>
				<Grid sx={{ marginTop: '15px' }}>
					<FormControl>
						<FormLabel>Notification Type</FormLabel>
						<Select
							fullWidth
							value={type}
							onChange={(e) =>
								handleSelectNotificationType(e.target.value as string) as never
							}
						>
							<MenuItem disabled value={SELECT_NOTIFICATION_TYPE}>
								{SELECT_NOTIFICATION_TYPE}
							</MenuItem>
							{Object.values(NOTIFICATION_TYPE).map((value) => (
								<MenuItem key={value} value={value}>
									{value}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{NotificationLists.includes(type as string) && (
						<>
							{type === NOTIFICATION_TYPE.PUSH_NOTIFICATION && (
								<FormControl>
									<FormLabel>Target Device</FormLabel>
									<Select
										fullWidth
										value={devices}
										onChange={handleChange('devices') as never}
									>
										<MenuItem disabled value={SELECT_TARGET_DEVICE}>
											{SELECT_TARGET_DEVICE}
										</MenuItem>
										{Object.values(DEVICE).map((value) => (
											<MenuItem key={value} value={value}>
												{value}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
							<FormControl>
								<FormLabel>Dispatch Type</FormLabel>
								<Select
									fullWidth
									value={dispatchUserType}
									onChange={handleChange('dispatchUserType') as never}
								>
									<MenuItem disabled value={SELECT_DISPATCH_TYPE}>
										{SELECT_DISPATCH_TYPE}
									</MenuItem>
									{Object.values(DISPATCH_USER).map((value) => (
										<MenuItem key={value} value={value}>
											{value}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</>
					)}
					{dispatchUserType === DISPATCH_USER.SELECTED && (
						<FormControl>
							<FormLabel>Select User</FormLabel>
							<SearchInput
								isLoading={isSearching}
								fullWidth
								sx={{
									'& .MuiOutlinedInput-root': {
										paddingRight: '0px',
										borderRadius: '6px !important',
									},
								}}
								placeholder={'Search users by email'}
								clearSearch={clearSearch}
								handleSearch={searchUser}
							/>
						</FormControl>
					)}
					{selectedUser.length > 0 && (
						<Box>
							<FormLabel>Selected User</FormLabel>
							<Box
								sx={{
									display: 'grid',
									gap: '8px',
									gridTemplateColumns: [
										'1fr',
										'repeat(2, 1fr)',
										'repeat(4, 1fr)',
									],
								}}
							>
								<List disablePadding>
									{selectedUser.map((user: User) => (
										<SelectedUserItem
											key={user.id}
											removeUser={() => removeUser(user)}
											user={user}
										/>
									))}
								</List>
							</Box>
						</Box>
					)}
				</Grid>
				<Grid sx={{ marginTop: '15px' }}>
					<FormControl>
						<FormLabel>Title</FormLabel>
						<TextInput
							fullWidth
							placeholder={'Enter Message Title'}
							error={touched.subject && errors.subject ? true : false}
							helperText={touched.subject && errors.subject}
							value={subject}
							onChange={handleChange('subject')}
						/>
					</FormControl>

					<FormControl>
						<FormLabel>Body</FormLabel>
						{/* <TextInput
							multiline
							rows={5}
							fullWidth
							placeholder={'Enter message body'}
							error={touched.message && errors.message ? true : false}
							helperText={touched.message && errors.message}
							value={message}
							onChange={handleChange('message')}
						/> */}
						<ReactQuill
							style={{
								height: '240px',
								position: 'relative',
							}}
							// formats={QUILL_FORMAT}
							modules={{
								toolbar: TOOL_BAR_OPTIONS,
								clipboard: {
									// toggle to add extra line breaks when pasting HTML:
									matchVisual: true,
								},
							}}
							theme='snow'
							value={message}
							onChange={(value) => setFieldValue('message', value)}
						/>
					</FormControl>
				</Grid>
				<SubmitButton
					size={'large'}
					loading={isLoading}
					onClick={(e: React.FormEvent<HTMLButtonElement>) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					Send Notification
				</SubmitButton>
			</Form>
		</>
	);
};

export const FormLabel = styled(MuiFormLabel)(({ theme }) => ({
	display: 'inline-block',
	color: grey['700'],
	marginBottom: theme.spacing(2),
	fontWeight: '600',
}));

export const FormControl = styled(MuiFormControl)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
}));

export const Form = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(3),
	maxWidth: '720px',
	width: '100%',
}));

const Grid = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: '1fr',
	columnGap: '3rem',
	rowGap: '1.5rem',
	// [theme.breakpoints.up('md')]: {
	// 	gridTemplateColumns: 'repeat(2, 1fr)',
	// },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
	minWidth: '120px',
	textTransform: 'uppercase',
	borderRadius: theme.spacing(2),
	fontWeight: '600',
	backgroundColor: `${SECOUNDARY_COLOR} !important`,
	color: 'white',
	alignSelf: 'flex-end',
	marginTop: '4.2rem',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '15px',
	// alignItems: 'flex-start',
}));

const ImagePreview = styled(Box)(({ theme }) => ({
	border: `1.5px solid #000`,
	position: 'relative',
	borderRadius: theme.spacing(1),
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '15px',
	alignItems: 'center',
	justifyContent: 'center',
	maxWidth: '280px',
	height: '100%',
	maxHeight: '160px',
	overflow: 'hidden',
	width: '100%',
	'& img': {
		width: '100%',
	},
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
	marginBottom: theme.spacing(1),
	fontWeight: '600',
}));

const AddUserButton = styled(Button)({
	backgroundColor: `${SECOUNDARY_COLOR} !important`,
	color: 'white',
	alignSelf: 'flex-end',
	marginTop: '5rem',
});

export default NotificationForm;
