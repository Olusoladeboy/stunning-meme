import React, { CSSProperties, useEffect } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import TextInput from '../form-components/TextInput';
import { grey } from '@mui/material/colors';
import {
	NetworkPageTypes,
	NetworkDataTypes,
	QueryKeyTypes,
	API_ENDPOINTS,
} from '../../utilities/types';
import ValidationSchema from '../../utilities/validationSchema';
import Button from '../button/custom-button';
import Api from '../../utilities/api';
import handleResponse from '../../utilities/helpers/handleResponse';
import { useAppSelector } from '../../store/hooks';

interface NetworkData extends NetworkDataTypes {
	id?: string;
}

type Props = {
	type: NetworkPageTypes.DATA_NETWORK | NetworkPageTypes.AIRTIME_NETWORK;
	handleContinue?: () => void;
	network?: NetworkData;
	isEdit?: boolean;
};

const AddNetworkForm = ({ type, handleContinue, network, isEdit }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();
	const { token } = useAppSelector((store) => store.authState);

	const initialValues: NetworkData = {
		name: '',
		ussd: '',
		rate: '',
	};

	const { isLoading, mutate: createNetwork } = useMutation(
		Api.Network.CreateNetwork,
		{
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}

				if (data && data.success) {
					enqueueSnackbar(data.message, { variant: 'success' });
					queryClient.invalidateQueries(QueryKeyTypes.DataNetwork);
					queryClient.invalidateQueries(QueryKeyTypes.AirtimeNetwork);
					typeof handleContinue !== 'undefined' && handleContinue();
				}
			},
		}
	);

	const { isLoading: isUpdating, mutate: updateNetwork } = useMutation(
		Api.Network.UpdateNetwork,
		{
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}

				if (data && data.success) {
					enqueueSnackbar(data.message, { variant: 'success' });
					queryClient.invalidateQueries(QueryKeyTypes.DataNetwork);
					queryClient.invalidateQueries(QueryKeyTypes.AirtimeNetwork);
					typeof handleContinue !== 'undefined' && handleContinue();
				}
			},
		}
	);

	const { errors, touched, values, handleChange, handleSubmit, setValues } =
		useFormik({
			initialValues,
			validationSchema:
				type === NetworkPageTypes.DATA_NETWORK
					? ValidationSchema.DataNetwork
					: ValidationSchema.AirtimeNetwork,
			onSubmit: (values) => {
				if (isEdit && network) {
					return updateNetwork({
						url:
							type === NetworkPageTypes.DATA_NETWORK
								? API_ENDPOINTS.DataNetwork
								: API_ENDPOINTS.AirtimeNetwork,
						data:
							type === NetworkPageTypes.DATA_NETWORK
								? {
										name: values.name,
								  }
								: {
										rate: values.rate,
										ussd: values.ussd,
								  },
						token: token as string,
						id: network.id as string,
					});
				}
				createNetwork({
					url:
						type === NetworkPageTypes.DATA_NETWORK
							? API_ENDPOINTS.DataNetwork
							: API_ENDPOINTS.AirtimeNetwork,
					data:
						type === NetworkPageTypes.DATA_NETWORK
							? {
									name: values.name,
							  }
							: {
									name: values.name,
									rate: values.rate,
									ussd: values.ussd,
							  },
					token: token || '',
				});
			},
		});

	useEffect(
		() => {
			if (network) {
				if (type === NetworkPageTypes.DATA_NETWORK) {
					setValues({
						...values,
						name: network?.name,
					});
				} else if (type === NetworkPageTypes.AIRTIME_NETWORK) {
					setValues({
						...values,
						name: network?.name,
						rate: network.rate,
						ussd: network.ussd,
					});
				}
			}
		},
		// eslint-disable-next-line
		[]
	);

	const { name, ussd, rate } = values;

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr',
					gap: theme.spacing(4),
				}}
			>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
						gap: theme.spacing(4),
					}}
				>
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							Network Name
						</Typography>
						<TextInput
							disabled={isEdit}
							fullWidth
							placeholder={'Network name'}
							error={errors && touched.name && errors.name ? true : false}
							helperText={errors && touched.name && errors.name}
							value={name}
							onChange={handleChange('name')}
						/>
					</Box>
					<Box
						sx={{
							display:
								type === NetworkPageTypes.AIRTIME_NETWORK ? 'block' : 'none',
						}}
					>
						<Typography variant={'body1'} style={styles.label}>
							USSD code
						</Typography>
						<TextInput
							fullWidth
							placeholder={'ussd code'}
							error={errors && touched.ussd && errors.ussd ? true : false}
							helperText={errors && touched.ussd && errors.ussd}
							value={ussd}
							onChange={handleChange('ussd')}
						/>
					</Box>
					<Box
						sx={{
							display:
								type === NetworkPageTypes.AIRTIME_NETWORK ? 'block' : 'none',
						}}
					>
						<Typography variant={'body1'} style={styles.label}>
							Rate
						</Typography>
						<TextInput
							fullWidth
							placeholder={'rate'}
							error={errors && touched.rate && errors.rate ? true : false}
							helperText={errors && touched.rate && errors.rate}
							value={rate}
							onChange={handleChange('rate')}
						/>
					</Box>
				</Box>
			</Box>
			<Button
				loading={isLoading || isUpdating}
				buttonProps={{
					size: 'large',
					style: styles.btn,
					onClick: (e) => {
						e.preventDefault();
						handleSubmit();
					},
				}}
			>
				Save
			</Button>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
		height: '320px',
		justifyContent: 'space-between',
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
});

export default AddNetworkForm;
