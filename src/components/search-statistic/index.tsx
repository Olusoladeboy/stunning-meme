import React, { useState } from 'react';
import { Box, styled, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../button';
import Select from '../form-components/select';
import { SECOUNDARY_COLOR, SERVICES } from 'utilities';
import {
	useQueryAirtimeNetwork,
	useQueryDateNetwork,
	useQueryDataTypes,
} from 'hooks';

const SELECT_SERVICE = 'Select service';
const SELECT_TYPE = 'Select type';
const SELECT_PLAN = 'Select plan';
const SELECT_PROVIDER = 'Select service provider';

const SearchStatistics = () => {
	const [schema, setSchema] = useState<any>();
	const [providerType, setProviderType] = useState<string>('');

	const { isLoadingAirtimeNetworks, queryAirtimeNetworks, airtimeNetworks } =
		useQueryAirtimeNetwork();
	const { isLoadingDataNetwork, queryDataNetwork, dataDataNetwork } =
		useQueryDateNetwork();
	const { isLoadingDataTypes, queryDataTypes, dataDataTypes } =
		useQueryDataTypes();

	const initialValues = {
		service: SELECT_SERVICE,
		type: SELECT_TYPE,
		plan: SELECT_PLAN,
		provider: SELECT_PROVIDER,
	};

	// validation Schema
	const validationSchema = yup.object().shape({
		service: yup
			.string()
			.notOneOf([SELECT_SERVICE], SELECT_SERVICE)
			.required(SELECT_SERVICE),
	});
	const validationSchemaProvider = yup.object().shape({
		service: yup
			.string()
			.notOneOf([SELECT_SERVICE], SELECT_SERVICE)
			.required(SELECT_SERVICE),
		provider: yup
			.string()
			.notOneOf([SELECT_PROVIDER], SELECT_PROVIDER)
			.required(SELECT_PROVIDER),
	});
	const validationSchemaProviderWithPlan = yup.object().shape({
		service: yup
			.string()
			.notOneOf([SELECT_SERVICE], SELECT_SERVICE)
			.required(SELECT_SERVICE),
		provider: yup
			.string()
			.notOneOf([SELECT_PROVIDER], SELECT_PROVIDER)
			.required(SELECT_PROVIDER),
		plan: yup
			.string()
			.notOneOf([SELECT_PLAN], SELECT_PLAN)
			.required(SELECT_PLAN),
	});

	const validationSchemaProviderWithTypesAndPlan = yup.object().shape({
		service: yup
			.string()
			.notOneOf([SELECT_SERVICE], SELECT_SERVICE)
			.required(SELECT_SERVICE),
		provider: yup
			.string()
			.notOneOf([SELECT_PROVIDER], SELECT_PROVIDER)
			.required(SELECT_PROVIDER),
		plan: yup
			.string()
			.notOneOf([SELECT_PLAN], SELECT_PLAN)
			.required(SELECT_PLAN),
		type: yup
			.string()
			.notOneOf([SELECT_TYPE], SELECT_TYPE)
			.required(SELECT_TYPE),
	});

	const switchService = (service: string) => {
		setFieldValue('provider', SELECT_PROVIDER);
		switch (service) {
			case SERVICES.AIRTIME_TOP_UP:
				setSchema(validationSchemaProvider);
				queryAirtimeNetworks();
				break;
			case SERVICES.DATA_SUBSCRIPTION:
				setSchema(validationSchemaProviderWithTypesAndPlan);
				queryDataNetwork();
				break;

			default:
				break;
		}
	};

	// const switchProvider = (provider: string) => {
	// 	setFieldValue('provider', SELECT_PROVIDER);
	// 	switch (service) {
	// 		case SERVICES.AIRTIME_TOP_UP:
	// 			queryAirtimeNetworks();
	// 			break;

	// 		default:
	// 			break;
	// 	}
	// };

	const switchHandleSubmit = (values: Record<string, any>) => {
		switch (service) {
			case SERVICES.AIRTIME_TOP_UP:
				console.log('Load Airtime data', values);
				break;

			case SERVICES.DATA_SUBSCRIPTION:
				console.log('Load Sub data', values);

				break;

			default:
				break;
		}
	};

	const { values, handleChange, setFieldValue, handleSubmit, touched, errors } =
		useFormik({
			initialValues,
			validationSchema: schema || validationSchema,
			onSubmit: (values) => {
				switchHandleSubmit(values);
			},
		});

	const { service, type, provider } = values;

	const handleSelectProvider = (provider: string) => {
		setFieldValue('provider', provider);
		switch (service) {
			case SERVICES.DATA_SUBSCRIPTION:
				setProviderType(SERVICES.DATA_SUBSCRIPTION);
				queryDataTypes({
					network: provider,
				});
				break;

			default:
				break;
		}
	};

	const handleSelectType = (type: string) => {
		setFieldValue('type', type);
		switch (service) {
			case SERVICES.DATA_SUBSCRIPTION:
				setProviderType(SERVICES.DATA_SUBSCRIPTION);
				queryDataTypes({
					network: provider,
				});
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
					onChange={(e) => {
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
							{service}
						</MenuItem>
					))}
				</Select>
			</SelectContainer>
			{/* 
				===== NOTE!!! =====
				Network Field
			*/}
			{service === SERVICES.AIRTIME_TOP_UP && (
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
			)}
			{service === SERVICES.DATA_SUBSCRIPTION && (
				<>
					<SelectContainer>
						<Select
							fullWidth
							value={provider}
							onChange={(e) => handleSelectProvider(e.target.value as string)}
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
					{providerType === SERVICES.DATA_SUBSCRIPTION && (
						<SelectContainer>
							<Select
								fullWidth
								value={type}
								onChange={(e) => handleSelectType(e.target.value as string)}
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
					)}
				</>
			)}

			<Button
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
	gap: theme.spacing(3),
	[theme.breakpoints.up('md')]: {
		gridTemplateColumns: '2.8fr 2.8fr 2.8fr 1.6fr',
	},
}));

const SelectContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	maxWidth: '240px',
}));

export default SearchStatistics;
