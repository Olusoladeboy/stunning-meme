import React, {
	CSSProperties,
	ChangeEvent,
	useState,
	useRef,
	useCallback,
	useEffect,
} from 'react';
import {
	Box,
	useTheme,
	Typography,
	MenuItem,
	FormHelperText,
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { grey, red } from '@mui/material/colors';
import Button from '../button/custom-button';
import { QueryKeys, validationSchema, ENDPOINTS, IAdBanner } from 'utilities';
import Select from '../form-components/select';
import { useAlert, useHandleError } from 'hooks';
import { useAppSelector } from 'store/hooks';
import { updateBanner } from 'api';

const SELECT_SERVICES = 'Select service';
const baseUrl = process.env.REACT_APP_API_URI as string;

type Props = {
	callback?: () => void;
	adBanner?: IAdBanner | null;
};

export const SERVICES = {
	DATA_SUBSCRIPTION: 'DATA SUBSCRIPTION',
	AIRTIME_TOP_UP: 'AIRTIME TOP UP',
	AIRTIME_CONVERSION: 'AIRTIME CONVERSION',
	AUTO_AIRTIME_CONVERSION: 'AIRTIME AUTO CONVERSION',
	CABLE: 'CABLE',
	INTERNET: 'INTERNET',
	EDUCATION: 'EDUCATION',
	ELECTRICITY: 'ELECTRICITY',
	BETTING: 'BETTING',
	EPIN: 'EPIN',
	WITHDRAWAL: 'WITHDRAWAL',
	CARD_FUNDING: 'CARD FUNDING',
	WALLET_TRANSFER: 'WALLET TRANSFER',
};

export const LINKS = {
	DATA_SUBSCRIPTION: 'https://airtimeflip.com/data-subscription',
	AIRTIME_TOP_UP: 'https://airtimeflip.com/airtime-topup',
	AIRTIME_CONVERSION: 'https://airtimeflip.com/airtime-conversion',
	AUTO_AIRTIME_CONVERSION: 'https://airtimeflip.com/auto-airtime-convert',
	CABLE: 'https://airtimeflip.com/cable',
	INTERNET: 'https://airtimeflip.com/internet',
	EDUCATION: 'https://airtimeflip.com/education',
	ELECTRICITY: 'https://airtimeflip.com/electricity',
	BETTING: 'https://airtimeflip.com/betting',
	EPIN: 'https://airtimeflip.com/epin',
	WITHDRAWAL: 'https://airtimeflip.com/withdrawal',
	CARD_FUNDING: 'https://airtimeflip.com/card-funding',
	WALLET_TRANSFER: 'https://airtimeflip.com/wallet-transfer',
};

const mapServiceToLink = (service: string) => {
	let $key = '';
	Object.entries(SERVICES).filter((value) => {
		if (value[1] === service) $key = value[0];
		return value;
	});

	const link = (LINKS as any)[$key];
	return link;
};

const updateBannerController = async ({
	formData,
	token,
	id,
}: {
	formData: any;
	token: string;
	id: string;
}) => {
	return await axios.put(`${baseUrl}${ENDPOINTS.Adverts}/${id}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const createBannerController = async ({
	formData,
	token,
}: {
	formData: any;
	token: string;
}) => {
	return await axios.post(`${baseUrl}${ENDPOINTS.Adverts}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const AdBannerForm = ({ callback, adBanner }: Props) => {
	const theme = useTheme();
	const alert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const [isLoading, setLoading] = useState<boolean>(false);
	const [file, setFile] = useState<any>(null);
	const [previewImage, setPreviewImage] = useState<string>('');

	const isEdit = Boolean(adBanner && Object.keys(adBanner).length > 0);

	const inputEl = useRef<HTMLInputElement>(null);

	const token = useAppSelector((store) => store.authState.token);

	const initialValues = {
		service: SELECT_SERVICES,
		image: '',
	};

	const validationSchema = yup.object().shape({
		image: yup.string().required('Select a banner image'),
		service: yup
			.string()
			.notOneOf([SELECT_SERVICES], SELECT_SERVICES)
			.required(SELECT_SERVICES),
	});

	const updateValidationSchema = yup.object().shape({
		service: yup
			.string()
			.notOneOf([SELECT_SERVICES], SELECT_SERVICES)
			.required(SELECT_SERVICES),
	});

	const { isLoading: isUpdating, mutate } = useMutation(updateBanner, {
		onError: (error) => {
			const errorResponse = handleError({ error });
			if (errorResponse?.message)
				alert({ message: errorResponse.message, type: 'error' });
		},
		onSuccess: (data) => {
			typeof callback === 'function' && callback();
			queryClient.invalidateQueries([QueryKeys.AdBanner]);
		},
	});

	const adBannerService = async (formData: any) => {
		try {
			let res;

			if (isEdit) {
				res = await updateBannerController({
					formData,
					token: token as string,
					id: `${adBanner?.id}`,
				});
			} else {
				res = await createBannerController({
					formData,
					token: token as string,
				});
			}

			const data = res.data;
			if (data && data.success) {
				queryClient.invalidateQueries(QueryKeys.AdBanner);
				setLoading(false);
				alert({ message: data.message, type: 'success' });
				setFile(null);
				setPreviewImage('');
				typeof callback === 'function' && callback();
			}
		} catch (error) {
			setLoading(false);
			const res = handleError({ error });
			if (res?.message) {
				alert({ message: res.message, type: 'error' });
			}
		}
	};

	const onSubmit = async (values: typeof initialValues) => {
		const service = values.service;

		const link = mapServiceToLink(service);

		const formData = new FormData();
		formData.append('file-upload', file);
		formData.append('url', link);
		formData.append('service', service);

		setLoading(true);

		if (isEdit) {
			if (file) {
				adBannerService(formData);
			} else {
				mutate({
					id: `${adBanner?.id}`,
					payload: {
						service,
						url: link,
					},
				});
			}

			return;
		}

		adBannerService(formData);
	};

	const {
		values,
		handleSubmit,
		handleChange,
		errors,
		touched,
		resetForm,
		setFieldValue,
	} = useFormik({
		initialValues,
		validationSchema: isEdit ? updateValidationSchema : validationSchema,
		onSubmit,
	});

	const { service } = values;

	const onClick = useCallback(
		() => {
			if (inputEl.current) {
				inputEl.current.click();
			}
		},
		// eslint-disable-next-line
		[]
	);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files) {
			let reader = new FileReader();
			let file = e.target.files[0];
			if (file.size > 1048576) {
				alert({ message: 'Image Size must not exceed 1MB', type: 'error' });
				return;
			}
			if (file) {
				reader.readAsDataURL(file);
			}
			reader.onloadend = () => {
				setFile(file);
				setFieldValue('image', reader.result);
				setPreviewImage(reader.result as string);
			};
		}
	};

	// Update Initial Values
	useEffect(() => {
		if (adBanner && Object.keys(adBanner).length > 0) {
			const { imageUrl, service } = adBanner;
			setFieldValue('service', service);
			setPreviewImage(imageUrl);
		}
	}, [adBanner, setFieldValue]);

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box>
				<Box
					onClick={onClick}
					sx={{
						border: `1px solid ${
							Boolean(touched.image && errors.image)
								? red['600']
								: theme.palette.primary.main
						}`,
						borderRadius: '6px',
						width: '100%',
						height: '240px',
						cursor: 'pointer',
						backgroundImage: `url(${previewImage})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						':before': {
							content: '""',
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							bottom: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							visibility: 'hidden',
						},
						'&:hover button': {
							display: 'block',
						},
						'&:hover:before': {
							visibility: previewImage && 'visible',
						},
					}}
				>
					{!previewImage && <Typography>Select image</Typography>}

					{previewImage && (
						<Button
							sx={{
								backgroundColor: `${theme.palette.secondary.main} !important`,
								color: 'white',
								display: 'none',
							}}
						>
							Change Image
						</Button>
					)}

					<input
						onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e)}
						ref={inputEl}
						type={'file'}
						style={{ display: 'none' }}
						accept={'image/*'}
					/>
				</Box>
				{touched.image && errors.image && (
					<FormHelperText style={styles.helperText}>
						{errors.image}
					</FormHelperText>
				)}
			</Box>

			<Box>
				<Typography variant={'body1'} style={styles.label}>
					Select Service
				</Typography>
				<Select
					fullWidth
					error={Boolean(touched.service && errors.service)}
					value={service}
					onChange={handleChange('service') as any}
				>
					<MenuItem value={SELECT_SERVICES}>{SELECT_SERVICES}</MenuItem>
					{Object.values(SERVICES).map((value) => (
						<MenuItem value={value} key={value}>
							{value}
						</MenuItem>
					))}
				</Select>
				{touched.service && errors.service && (
					<FormHelperText style={styles.helperText}>
						{errors.service}
					</FormHelperText>
				)}
			</Box>
			<Button
				loading={isLoading || isUpdating}
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
				type={'submit'}
				size={'large'}
				style={styles.btn}
			>
				Submit
			</Button>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},

	label: {
		display: 'block',
		marginBottom: theme.spacing(1),
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		minWidth: '140px',
	},
	endAdornmentBtn: {
		color: theme.palette.secondary.main,
		fontWeight: '600',
		fontSize: '12px',
		padding: '0px',
		minWidth: 'unset',
	},
	link: {
		color: theme.palette.secondary.main,
	},
	helperText: {
		color: red['600'],
	},
});

export default AdBannerForm;
