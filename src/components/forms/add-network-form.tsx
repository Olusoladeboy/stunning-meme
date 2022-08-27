import React, { CSSProperties } from 'react';
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
import { useAppSelector } from '../../store/hooks';
import { useAlert } from '../../utilities/hooks';

interface NetworkData extends NetworkDataTypes {
	id?: string;
}

type Props = {
	type:
		| NetworkPageTypes.DATA_NETWORK
		| NetworkPageTypes.AIRTIME_NETWORK
		| NetworkPageTypes.CONVERSION_NETWORK;
	handleContinue?: () => void;
	network?: NetworkData;
	isEdit?: boolean;
};

const AddNetworkForm = ({ type, handleContinue, network, isEdit }: Props) => {
	const theme = useTheme();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const { token } = useAppSelector((store) => store.authState);

	const initialValues: NetworkData = {
		name: '',
		ussd: '',
		rate: '',
		number: '',
	};

	const { isLoading, mutate: createNetwork } = useMutation(
		Api.Network.CreateNetwork,
		{
			onSettled: (data, error) => {
				if (error) {
					setAlert({ data: error, type: 'error' });
				}

				if (data && data.success) {
					setAlert({
						data: data.message,
						type: 'success',
					});
					queryClient.invalidateQueries(QueryKeyTypes.DataNetwork);
					queryClient.invalidateQueries(QueryKeyTypes.AirtimeNetwork);
					queryClient.invalidateQueries(QueryKeyTypes.ConvertNetwork);
					typeof handleContinue !== 'undefined' && handleContinue();
				}
			},
		}
	);

	const handleMutateNetwork = (values: NetworkData) => {
		const { name, rate, ussd, number } = values;
		const url =
			type === NetworkPageTypes.DATA_NETWORK
				? API_ENDPOINTS.DataNetwork
				: type === NetworkPageTypes.AIRTIME_NETWORK
				? API_ENDPOINTS.AirtimeNetwork
				: API_ENDPOINTS.ConvertNetworks;

		const createDataPayload =
			type === NetworkPageTypes.DATA_NETWORK
				? {
						name,
				  }
				: type === NetworkPageTypes.AIRTIME_NETWORK
				? {
						name,
						rate,
						ussd,
				  }
				: {
						name,
						rate,
						number,
				  };

		const updateDataPayload =
			type === NetworkPageTypes.DATA_NETWORK
				? {
						name,
				  }
				: type === NetworkPageTypes.AIRTIME_NETWORK
				? {
						rate,
						ussd,
				  }
				: {
						rate,
						number,
				  };

		if (isEdit && network) {
			return updateNetwork({
				url,
				data: updateDataPayload,
				token: token as string,
				id: network.id as string,
			});
		}

		createNetwork({
			url,
			data: createDataPayload,
			token: token as string,
		});
	};

	const { isLoading: isUpdating, mutate: updateNetwork } = useMutation(
		Api.Network.UpdateNetwork,
		{
			onSettled: (data, error) => {
				if (error) {
					setAlert({ data: error, type: 'error' });
				}

				if (data && data.success) {
					setAlert({
						data: data.message,
						type: 'success',
					});
					queryClient.invalidateQueries(QueryKeyTypes.AirtimeNetwork);
					queryClient.invalidateQueries(QueryKeyTypes.ConvertNetwork);
					queryClient.invalidateQueries(QueryKeyTypes.DataNetwork);
					typeof handleContinue !== 'undefined' && handleContinue();
				}
			},
		}
	);

	const validationSchema =
		type === NetworkPageTypes.DATA_NETWORK
			? ValidationSchema.DataNetwork
			: type === NetworkPageTypes.AIRTIME_NETWORK
			? ValidationSchema.AirtimeNetwork
			: ValidationSchema.ConvertNetwork;

	const { errors, touched, values, handleChange, handleSubmit } = useFormik({
		initialValues: network ? network : initialValues,
		validationSchema,
		onSubmit: (values) => {
			handleMutateNetwork(values);
		},
	});

	const { name, ussd, rate, number } = values;

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
								type === NetworkPageTypes.CONVERSION_NETWORK ? 'block' : 'none',
						}}
					>
						<Typography variant={'body1'} style={styles.label}>
							Phone number
						</Typography>
						<TextInput
							fullWidth
							placeholder={'Number'}
							error={errors && touched.number && errors.number ? true : false}
							helperText={errors && touched.number && errors.number}
							value={number}
							onChange={handleChange('number')}
						/>
					</Box>
					<Box
						sx={{
							display:
								type === NetworkPageTypes.AIRTIME_NETWORK ||
								type === NetworkPageTypes.CONVERSION_NETWORK
									? 'block'
									: 'none',
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
