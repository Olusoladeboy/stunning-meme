import React from 'react';
import { Box, styled, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import Button from '../button';
import Select from '../form-components/select';
import { SECOUNDARY_COLOR } from '../../utilities';

const SELECT_SERVICE = 'Select service';
const SELECT_TYPE = 'Select type';
const SELECT_DATA_NETWORK = 'Select data network';

const SearchStatistics = () => {
	const initialValues = {
		service: SELECT_SERVICE,
		type: SELECT_TYPE,
		data: SELECT_DATA_NETWORK,
	};
	const { values } = useFormik({
		initialValues,
		onSubmit: (values) => {},
	});

	const { service, type, data } = values;

	return (
		<Container>
			<Select value={service}>
				<MenuItem disabled value={SELECT_SERVICE}>
					{SELECT_SERVICE}
				</MenuItem>
			</Select>
			<Select value={data}>
				<MenuItem disabled value={SELECT_DATA_NETWORK}>
					{SELECT_DATA_NETWORK}
				</MenuItem>
			</Select>
			<Select value={type}>
				<MenuItem disabled value={SELECT_TYPE}>
					{SELECT_TYPE}
				</MenuItem>
			</Select>
			<Button
				sx={{
					backgroundColor: `${SECOUNDARY_COLOR} !important`,
					color: 'white',
					textTransform: 'uppercase',
					fontWeight: 'bold',
				}}
			>
				Search
			</Button>
		</Container>
	);
};

const Container = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: '1fr',
	// alignItems: 'center',
	gap: theme.spacing(3),
	[theme.breakpoints.up('md')]: {
		gridTemplateColumns: '2.8fr 2.8fr 2.8fr 1.6fr',
	},
}));

export default SearchStatistics;
