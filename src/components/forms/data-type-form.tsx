import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import TextInput from '../form-components/TextInput';
import { grey } from '@mui/material/colors';
import {
	NetworkData as INetworkData,
	QueryKey,
	DataType,
} from '../../utilities';
import ValidationSchema from '../../utilities/validationSchema';
import Button from '../button/custom-button';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';
import { useAlert } from '../../utilities/hooks';

type Props = {
	isEdit?: boolean;
	callback?: () => void;
	type?: DataType;
};

const DataTypeForm: React.FC<Props> = ({ isEdit = false, callback, type }) => {
	const theme = useTheme();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const { token } = useAppSelector((store) => store.authState);

	const initialValues: DataType = {
		name: '',
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
					queryClient.invalidateQueries(QueryKey.DataNetwork);
					queryClient.invalidateQueries(QueryKey.AirtimeNetwork);
					queryClient.invalidateQueries(QueryKey.ConvertNetwork);
					typeof callback !== 'undefined' && callback();
				}
			},
		}
	);

	const handleMutateNetwork = (values: DataType) => {
		const { name } = values;

		// if (isEdit && network) {
		// 	return updateNetwork({
		// 		url,
		// 		data: updateDataPayload,
		// 		token: token as string,
		// 		id: network.id as string,
		// 	});
		// }

		// createNetwork({
		// 	url,
		// 	data: createDataPayload,
		// 	token: token as string,
		// });
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
					queryClient.invalidateQueries(QueryKey.AirtimeNetwork);
					queryClient.invalidateQueries(QueryKey.ConvertNetwork);
					queryClient.invalidateQueries(QueryKey.DataNetwork);
					typeof callback !== 'undefined' && callback();
				}
			},
		}
	);

	const { errors, touched, values, handleChange, handleSubmit } = useFormik({
		initialValues: type ? type : initialValues,
		// validationSchema,
		onSubmit: (values) => {
			// handleMutateNetwork(values);
		},
	});

	const { name } = values;

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr',
					gap: theme.spacing(4),
				}}
			>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Data type name
					</Typography>
					<TextInput
						disabled={isEdit}
						fullWidth
						placeholder={'Enter data type name'}
						error={touched.name && errors.name ? true : false}
						helperText={touched.name && errors.name}
						value={name}
						onChange={handleChange('name')}
					/>
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

export default DataTypeForm;
