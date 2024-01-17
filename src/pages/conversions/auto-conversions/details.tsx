import React from 'react';
import { Box, Card as MuiCard, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Layout, AutoConversionTaskTable, CircularProgress } from 'components';
import { useQuery } from 'react-query';
import { BOX_SHADOW, checkAmount, formatNumberToCurrency } from 'utilities';
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
		[QueryKeys.AutoAirtimeConvertGroup, id],
		() =>
			autoConvertAirtimeGroups({
				reference: id,
			}),
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
			},
		}
	);

	return (
		<Layout>
			{isLoading ? (
				<CircularProgress
					spinnerSize={'20px'}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				/>
			) : (
				dataAutoAirtimeConvert && (
					<Box style={styles.container}>
						{dataAutoAirtimeConvert.payload &&
						Array.isArray(dataAutoAirtimeConvert.payload) &&
						dataAutoAirtimeConvert.payload.length > 0 ? (
							<>
								<Box
									sx={{
										display: 'grid',
										gap: '30px',
										gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(5, 1fr)'],
										marginBottom: '3rem',
										padding: ['0px 15px', '0px 2rem'],
									}}
								>
									<Card
										title='Network'
										description={`${dataAutoAirtimeConvert.payload[0].network.name}`}
									/>
									<Card
										title='Sender'
										description={dataAutoAirtimeConvert.payload[0].phone_number}
									/>
									<Card
										title='Beneficiary'
										description={dataAutoAirtimeConvert.payload[0].sentTo}
									/>
									<Card
										title='Amount'
										description={formatNumberToCurrency(
											checkAmount(dataAutoAirtimeConvert.payload[0].totalAmount)
										)}
									/>
									<Card
										title='Return Amount'
										description={formatNumberToCurrency(
											checkAmount(
												dataAutoAirtimeConvert.payload[0].totalReturnAmount
											)
										)}
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
								<AutoConversionTaskTable
									transactions={dataAutoAirtimeConvert.payload[0].transactions}
								/>
							</>
						) : (
							<Box>
								<Typography>No record for the reference {id} fouund</Typography>
							</Box>
						)}
					</Box>
				)
			)}
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
