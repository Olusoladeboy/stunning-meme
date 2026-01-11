import React from 'react';
import { Box, styled, MenuItem, SelectChangeEvent } from '@mui/material';
import { useFormik } from 'formik';
import Button from '../button';
import Select from '../form-components/select';
import {
	capitalize,
	removeSpecialChar,
	SECOUNDARY_COLOR,
	SERVICES,
} from 'utilities';
import {
	useQueryAirtimeNetwork,
	useQueryDateNetwork,
	useQueryDataTypes,
	useQueryConvertAirtimeNetworks,
	useQueryCableProviders,
	useCableBundles,
} from 'hooks';
import DateField from 'components/form-components/date-field';
import useToastAlert from 'hooks/useToastAlert';

const SELECT_SERVICE = 'Select service';
const SELECT_TYPE = 'Select type';
const SELECT_PLAN = 'Select plan';
const SELECT_PROVIDER = 'Select service provider';

interface ISearchStatistics {
	setDataStatistics?: (data: {
		service: string;
		data: { [key: string]: any }[];
	}) => void;
	switchHandleSubmit?: (values: { [key: string]: any }) => void;
	isLoading?: boolean;
}

const SearchStatistics = ({
	setDataStatistics,
	switchHandleSubmit,
	isLoading,
}: ISearchStatistics) => {
	const toastAlert = useToastAlert();
	const { isLoadingAirtimeNetworks, queryAirtimeNetworks, airtimeNetworks } =
		useQueryAirtimeNetwork();
	const { isLoadingDataNetwork, queryDataNetwork, dataDataNetwork } =
		useQueryDateNetwork();
	const { isLoadingDataTypes, queryDataTypes, dataDataTypes } =
		useQueryDataTypes();

	const { queryCableBundles } = useCableBundles();

	const { isLoadingCableProviders, dataCableProviders, queryCableProviders } =
		useQueryCableProviders();

	const {
		isLoadingConvertAirtimeNetwork,
		convertAirtimeNetworks,
		queryConvertAirtimeNetwork,
	} = useQueryConvertAirtimeNetworks();

	const initialValues = {
		service: SELECT_SERVICE,
		type: SELECT_TYPE,
		plan: SELECT_PLAN,
		provider: SELECT_PROVIDER,
		startDate: '',
		endDate: '',
	};

	const {
		values,
		handleChange,
		setFieldValue,
		handleSubmit,
		touched,
		errors,
		setFieldError,
	} = useFormik({
		initialValues,
		// validationSchema: schema || validationSchema,
		onSubmit: (values) => {
			const payload: any = {
				service: values.service,
				startDate: values.startDate,
				endDate: values.endDate,
			};

			if (!values.endDate || !values.startDate) {
				return;
			}

			if (new Date(values.startDate) > new Date(values.endDate)) {
				toastAlert({
					message: 'Start date cannot be after end date',
					type: 'info',
				});

				return;
			}

			if (values.service === SELECT_SERVICE) {
				setFieldError('service', 'Select a service');
				return;
			}

			setFieldError('service', '');

			if (values.type !== SELECT_TYPE) payload.type = values.type;
			if (values.plan !== SELECT_PLAN) payload.plan = values.plan;
			if (values.provider !== SELECT_PROVIDER)
				payload.provider = values.provider;

			typeof switchHandleSubmit === 'function' && switchHandleSubmit(payload);
		},
	});

	const { service, type, provider, plan } = values;

	const switchService = (service: string) => {
		setFieldValue('provider', SELECT_PROVIDER);
		setFieldValue('type', SELECT_TYPE);
		setFieldValue('plan', SELECT_PLAN);

		switch (service) {
			case SERVICES.AIRTIME_TOP_UP:
				queryAirtimeNetworks();
				break;
			case SERVICES.DATA_SUBSCRIPTION:
				queryDataNetwork();
				break;

			case SERVICES.AIRTIME_CONVERSION:
				queryConvertAirtimeNetwork();
				break;

			case SERVICES.CABLE:
				queryCableProviders();
				break;

			default:
				break;
		}
	};

	const handleSelectProvider = async (provider: string) => {
		setFieldValue('provider', provider);
		setFieldValue('type', SELECT_TYPE);
		setFieldValue('plan', SELECT_PLAN);

		switch (service) {
			case SERVICES.DATA_SUBSCRIPTION:
				queryDataTypes({
					network: provider,
				});
				break;

			case SERVICES.CABLE:
				await queryCableBundles({
					provider,
				});
				break;

			default:
				break;
		}
	};

	const handleSelectType = (type: string) => {
		setFieldValue('type', type);
		setFieldValue('plan', SELECT_PLAN);

		switch (service) {
			case SERVICES.CABLE:
				break;

			default:
				break;
		}
	};

	return (
		<Container>
			<SelectContainer>
				<Select
					value={service}
					fullWidth
					error={touched.service && Boolean(errors.service)}
					helpertext={touched.service && errors.service}
					onChange={(e: SelectChangeEvent<unknown>) => {
						const value = e.target.value as string;
						setFieldValue('service', value);
						switchService(value);
					}}
				>
					<MenuItem disabled value={SELECT_SERVICE}>
						{SELECT_SERVICE}
					</MenuItem>
					{Object.values(SERVICES).map((service) => (
						<MenuItem key={service} value={service}>
							{capitalize(removeSpecialChar(service))}
						</MenuItem>
					))}
				</Select>
			</SelectContainer>
			{/* 
				===== NOTE!!! =====
				Network Field
			*/}
			{service === SERVICES.AIRTIME_TOP_UP && (
				<>
					<SelectContainer>
						<Select
							fullWidth
							error={touched.provider && Boolean(errors.provider)}
							helpertext={touched.provider && errors.provider}
							value={provider}
							onChange={handleChange('provider') as never}
						>
							<MenuItem disabled value={SELECT_PROVIDER}>
								{isLoadingAirtimeNetworks
									? 'Loading...'
									: airtimeNetworks && airtimeNetworks.payload.length === 0
									? 'No  available provider'
									: 'Select Airtime provider'}
							</MenuItem>
							{airtimeNetworks &&
								airtimeNetworks.payload.length > 0 &&
								airtimeNetworks.payload.map((network) => (
									<MenuItem key={network.id} value={network.id}>
										{network.name}
									</MenuItem>
								))}
						</Select>
					</SelectContainer>
				</>
			)}

			{service === SERVICES.DATA_SUBSCRIPTION && (
				<>
					<SelectContainer>
						<Select
							fullWidth
							value={provider}
							onChange={(e: SelectChangeEvent<unknown>) =>
								handleSelectProvider(e.target.value as string)
							}
						>
							<MenuItem disabled value={SELECT_PROVIDER}>
								{isLoadingDataNetwork
									? 'Loading...'
									: dataDataNetwork && dataDataNetwork.payload.length === 0
									? 'No  available provider'
									: 'Select data network'}
							</MenuItem>
							{dataDataNetwork &&
								dataDataNetwork.payload.map((network) => (
									<MenuItem key={network.id} value={network.id}>
										{network.name}
									</MenuItem>
								))}
						</Select>
					</SelectContainer>

					<SelectContainer>
						<Select
							disabled={Boolean(provider === SELECT_PROVIDER)}
							fullWidth
							value={type}
							onChange={(e: SelectChangeEvent<unknown>) =>
								handleSelectType(e.target.value as string)
							}
						>
							<MenuItem disabled value={SELECT_TYPE}>
								{isLoadingDataTypes
									? 'Loading...'
									: dataDataTypes && dataDataTypes.payload.length === 0
									? 'No  available data types'
									: 'Select data type'}
							</MenuItem>
							{dataDataTypes &&
								dataDataTypes.payload.map((type) => (
									<MenuItem key={type.id} value={type.id}>
										{type.name}
									</MenuItem>
								))}
						</Select>
					</SelectContainer>
					{/* <SelectContainer>
						<Select
							disabled={Boolean(type === SELECT_TYPE)}
							fullWidth
							value={plan}
							onChange={(e: SelectChangeEvent<unknown>) =>
								setFieldValue('plan', e.target.value as string)
							}
						>
							<MenuItem disabled value={SELECT_PLAN}>
								{isLoadingDataPlans
									? 'Loading...'
									: dataDataTypes && dataDataTypes.payload.length === 0
									? 'No  available data plans'
									: 'Select data plan'}
							</MenuItem>
							{dataDataPlans &&
								dataDataPlans.payload.map((plan) => (
									<MenuItem key={plan.id} value={plan.id}>
										{plan.name}
									</MenuItem>
								))}
						</Select>
					</SelectContainer> */}
				</>
			)}

			{service === SERVICES.AIRTIME_CONVERSION && (
				<>
					<SelectContainer>
						<Select
							fullWidth
							error={touched.provider && Boolean(errors.provider)}
							helpertext={touched.provider && errors.provider}
							value={provider}
							onChange={handleChange('provider') as never}
						>
							<MenuItem disabled value={SELECT_PROVIDER}>
								{isLoadingConvertAirtimeNetwork
									? 'Loading...'
									: convertAirtimeNetworks &&
									  convertAirtimeNetworks.payload.length === 0
									? 'No  available provider'
									: 'Select Airtime provider'}
							</MenuItem>
							{convertAirtimeNetworks &&
								convertAirtimeNetworks.payload.length > 0 &&
								convertAirtimeNetworks.payload.map((network) => (
									<MenuItem key={network.id} value={network.id}>
										{network.name}
									</MenuItem>
								))}
						</Select>
					</SelectContainer>
				</>
			)}

			{service === SERVICES.CABLE && (
				<>
					<SelectContainer>
						<Select
							fullWidth
							error={touched.provider && Boolean(errors.provider)}
							helpertext={touched.provider && errors.provider}
							value={provider}
							onChange={(e: SelectChangeEvent<unknown>) => {
								const value = e.target.value;
								handleSelectProvider(`${value}`);
							}}
						>
							<MenuItem disabled value={SELECT_PROVIDER}>
								{isLoadingCableProviders
									? 'Loading...'
									: dataCableProviders &&
									  dataCableProviders.payload.length === 0
									? 'No available provider'
									: 'Select cable provider'}
							</MenuItem>
							{dataCableProviders &&
								dataCableProviders.payload.length > 0 &&
								dataCableProviders.payload.map((value, key) => (
									<MenuItem
										key={`${value.service_type}-${key}`}
										value={value.service_type}
									>
										{value.name}
									</MenuItem>
								))}
						</Select>
					</SelectContainer>
				</>
			)}

			{service !== SELECT_SERVICE && (
				<>
					<DateField
						placeholder='Start Date'
						value={values?.startDate as any}
						onChange={(value) => setFieldValue('startDate', value)}
					/>
					<DateField
						placeholder='End Date'
						value={values?.endDate as any}
						onChange={(value) => setFieldValue('endDate', value)}
					/>
				</>
			)}

			<Button
				loading={isLoading}
				size={'large'}
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
				sx={{
					backgroundColor: `${SECOUNDARY_COLOR} !important`,
					color: 'white',
					textTransform: 'uppercase',
					// fontWeight: 'bold',
					minWidth: '140px',
				}}
			>
				Search
			</Button>
		</Container>
	);
};

const Container = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-start',
	gap: theme.spacing(2),
}));

const SelectContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	maxWidth: '240px',
	flex: '1',
}));

export default SearchStatistics;
