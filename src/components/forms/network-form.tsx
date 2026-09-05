import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import TextInput from '../form-components/TextInput';
import { grey } from '@mui/material/colors';
import {
	NetworkPage,
	NetworkData as INetworkData,
	QueryKey,
	API_ENDPOINTS,
	validationSchema,
} from 'utilities';
import Button from '../button/custom-button';
import { useAlert, useHandleError } from 'hooks';
import { createNetwork, updateNetwork } from 'api';

interface NetworkData extends INetworkData {
	id?: string;
}

type Props = {
	type:
		| NetworkPage.DATA_NETWORK
		| NetworkPage.AIRTIME_NETWORK
		| NetworkPage.CONVERSION_NETWORK
		| NetworkPage.AUTO_CONVERSION_NETWORK;
	callback?: () => void;
	network?: NetworkData;
	isEdit?: boolean;
};

const NetworkForm = ({ type, callback, network, isEdit }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();

	const initialValues: NetworkData = {
		name: '',
		ussd: '',
		rate: '',
		number: '',
	};

	const { isLoading, mutate: mutateCreateNetwork } = useMutation(
		createNetwork,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					setAlert({
						message: data.message,
						type: 'success',
					});
					queryClient.invalidateQueries(QueryKey.DataNetwork);
					queryClient.invalidateQueries(QueryKey.AirtimeNetwork);
					queryClient.invalidateQueries(QueryKey.ConvertNetwork);
					queryClient.invalidateQueries(QueryKey.AutoConvertNetwork);
					typeof callback !== 'undefined' && callback();
				}
			},
		}
	);

	const url =
		type === NetworkPage.DATA_NETWORK
			? API_ENDPOINTS.DataNetwork
			: type === NetworkPage.AIRTIME_NETWORK
			? API_ENDPOINTS.AirtimeNetwork
			: type === NetworkPage.AUTO_CONVERSION_NETWORK
			? API_ENDPOINTS.AutoConvertNetwork
			: API_ENDPOINTS.ConvertNetworks;

	const handleCreateNetwork = (values: NetworkData) => {
		const { name, rate, ussd, number } = values;

		let data = {} as Partial<NetworkData>;

		if (type === NetworkPage.DATA_NETWORK) data.name = name;
		if (type === NetworkPage.AIRTIME_NETWORK) {
			data = { ...data, name, rate, ussd };
		}
		if (type === NetworkPage.CONVERSION_NETWORK) {
			data = { ...data, name, rate, number };
		}

		if (type === NetworkPage.AUTO_CONVERSION_NETWORK) {
			data = { ...data, name, rate };
		}

		mutateCreateNetwork({
			url,
			data,
		});
	};

	const { isLoading: isUpdating, mutate: mutateUpdateNetwork } = useMutation(
		updateNetwork,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					setAlert({
						message: data.message,
						type: 'success',
					});
					queryClient.invalidateQueries(QueryKey.AirtimeNetwork);
					queryClient.invalidateQueries(QueryKey.ConvertNetwork);
					queryClient.invalidateQueries(QueryKey.DataNetwork);
					typeof callback !== 'undefined' && callback();
				}
			},
		}
	);

	const handleUpdateNetwork = (values: NetworkData) => {
		const { name, rate, ussd, number } = values;

		let data = {} as Partial<NetworkData>;

		if (type === NetworkPage.DATA_NETWORK) data.name = name;
		if (type === NetworkPage.AIRTIME_NETWORK) {
			data = { ...data, rate, ussd };
		}
		if (type === NetworkPage.CONVERSION_NETWORK) {
			data = { ...data, rate, number };
		}

		if (type === NetworkPage.AUTO_CONVERSION_NETWORK) {
			data = { ...data, rate };
		}

		return mutateUpdateNetwork({
			url,
			data,
			id: network?.id as string,
		});
	};

	const $validationSchema =
		type === NetworkPage.DATA_NETWORK
			? validationSchema.DataNetwork
			: type === NetworkPage.AIRTIME_NETWORK
			? validationSchema.AirtimeNetwork
			: type === NetworkPage.AUTO_CONVERSION_NETWORK
			? validationSchema.AutoConvertNetwork
			: validationSchema.ConvertNetwork;

	const { errors, touched, values, handleChange, handleSubmit } = useFormik({
		initialValues: network ? network : initialValues,
		validationSchema: $validationSchema,
		onSubmit: (values) => {
			if (network && Object.keys(network).length > 0) {
				return handleUpdateNetwork(values);
			}
			handleCreateNetwork(values);
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
						gridTemplateColumns: {
							xs: '1fr',
							md:
								type === NetworkPage.AIRTIME_NETWORK ? 'repeat(2, 1fr)' : '1fr',
						},
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
							display: type === NetworkPage.AIRTIME_NETWORK ? 'block' : 'none',
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
								type === NetworkPage.CONVERSION_NETWORK ? 'block' : 'none',
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
								type === NetworkPage.AIRTIME_NETWORK ||
								type === NetworkPage.CONVERSION_NETWORK ||
								type === NetworkPage.AUTO_CONVERSION_NETWORK
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
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
				loading={isLoading || isUpdating}
				size={'large'}
				style={styles.btn}
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
		// height: '320px',
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

export default NetworkForm;
