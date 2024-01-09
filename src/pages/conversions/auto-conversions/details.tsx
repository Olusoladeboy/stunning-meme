import React from 'react';
import { Box, Card as MuiCard, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Layout, AutoConversionTaskTable } from 'components';
import { useQuery } from 'react-query';
import { BOX_SHADOW, formatNumberToCurrency } from 'utilities';
import { grey } from '@mui/material/colors';
import { QueryKeys } from 'utilities';
import { autoConvertAirtimeGroups } from 'api';
import { useHandleError, useAlert } from 'hooks';

interface ICard {
	title: string;
	description: string;
}

const Card = ({ title, description }: ICard) => {
	return (
		<MuiCard
			sx={{
				flex: 1,
				padding: '10px 15px',
			}}
		>
			<Typography>{title}:</Typography>
			<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
				{description}
			</Typography>
		</MuiCard>
	);
};

const AutoConversionDetails = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const handleResponse = useHandleError();
	const alert = useAlert();

	const { id } = useParams();

	const { isLoading, data: dataAutoAirtimeConvert } = useQuery(
		[QueryKeys.AutoAirtimeConvertGroup],
		() => autoConvertAirtimeGroups(),
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleResponse({ error });
					if (response && response.message) {
						alert({
							type: 'error',
							message: response.message,
						});
					}
				}

				if (data && data.success) {
					console.log(data);
				}
			},
		}
	);

	return (
		<Layout>
			<Box style={styles.container}>
				<Box
					sx={{
						display: 'grid',
						gap: '30px',
						gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(5, 1fr)'],
						marginBottom: '3rem',
						padding: ['0px 15px', '0px 2rem'],
					}}
				>
					<Card title='Network' description='MTN (Airtime)' />
					<Card title='Sender' description='08109022197' />
					<Card title='Beneficiary' description='08109022197' />
					<Card title='Amount' description={formatNumberToCurrency('50000')} />
					<Card
						title='Amount Sent'
						description={formatNumberToCurrency('50000')}
					/>
				</Box>

				<Typography
					variant='h6'
					sx={{
						fontWeight: 'bold',
						marginBottom: '20px',
						padding: ['0px 15px', '0px 2rem'],
					}}
				>
					Tasks
				</Typography>
				<AutoConversionTaskTable />
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `0.5px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
});

export default AutoConversionDetails;
