import { Box, Switch, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSettings, useUpdateSettings } from 'hooks';
import { useCallback, useMemo } from 'react';
import { BOX_SHADOW, capitalize, removeSpecialChar, Settings } from 'utilities';

enum ServiceName {
	IS_INTERNET_AVAILABLE = 'IS_INTERNET_AVAILABLE',
	IS_EDUCATION_AVAILABLE = 'IS_EDUCATION_AVAILABLE',
	IS_ELECTRICITY_AVAILABLE = 'IS_ELECTRICITY_AVAILABLE',
	IS_BETTING_AVAILABLE = 'IS_BETTING_AVAILABLE',
	IS_ESIM_AVAILABLE = 'IS_ESIM_AVAILABLE',
	IS_GIFTCARD_AVAILABLE = 'IS_GIFTCARD_AVAILABLE',
	IS_INTERNATIONAL_AIRTIME_AVAILABLE = 'IS_INTERNATIONAL_AIRTIME_AVAILABLE',
	IS_INTERNATIONAL_DATA_AVAILABLE = 'IS_INTERNATIONAL_DATA_AVAILABLE',
}

const Services = () => {
	const { isLoadingSettings, settings, settingsError, refetchSettings } =
		useSettings({
			queryKey: 'dashboard-settings',
		});

	const filterSettings = useMemo(() => {
		return settings?.filter(
			(value) =>
				value.name === ServiceName.IS_BETTING_AVAILABLE ||
				value.name === ServiceName.IS_EDUCATION_AVAILABLE ||
				value.name === ServiceName.IS_ELECTRICITY_AVAILABLE ||
				value.name === ServiceName.IS_ESIM_AVAILABLE ||
				value.name === ServiceName.IS_GIFTCARD_AVAILABLE ||
				value.name === ServiceName.IS_INTERNATIONAL_AIRTIME_AVAILABLE ||
				value.name === ServiceName.IS_INTERNATIONAL_DATA_AVAILABLE ||
				value.name === ServiceName.IS_INTERNET_AVAILABLE
		);
	}, [settings]);

	const { updateSettings } = useUpdateSettings({
		callback: refetchSettings,
	});

	const toggleService = (service: Settings | undefined) => {
		let value = service?.value;

		updateSettings({
			data: {
				value: value === 'true' ? 'false' : 'true',
			},
			id: service?.id as string,
		});
	};

	const isChecked = useCallback((service: Settings) => {
		if (typeof service.value === 'string') {
			if (service.value === 'true') return true;
			if (service.value === 'false') return false;
		}

		return Boolean(service.value);
	}, []);

	return (
		<>
			{/* {isUpdatingSettings && <CircularProgress />} */}
			<Box
				sx={{
					border: (theme) => `0.5px solid ${theme.palette.secondary.main}`,
					padding: '1.5rem 0px',
					backgroundColor: grey[50],
					borderRadius: (theme) => theme.spacing(2),
					boxShadow: BOX_SHADOW,
				}}
			>
				<Typography
					sx={{
						fontSize: ['18px', '24px'],
						fontWeight: '600',
						padding: '0px 1rem',
					}}
					variant={'h1'}
				>
					Services
				</Typography>
				<Box
					sx={{
						height: '0.5px',
						width: '100%',
						backgroundColor: grey[200],
						margin: '15px 0px',
					}}
				/>
				{isLoadingSettings ? (
					<Typography sx={{ textAlign: 'center', padding: '15px' }}>
						Loading services...
					</Typography>
				) : settingsError ? (
					<Typography>{settingsError}</Typography>
				) : (
					filterSettings && (
						<>
							{filterSettings.length > 0 ? (
								<Box
									sx={{
										display: 'grid',
										gap: ['6px', '10px'],
										padding: '0px 1rem',
									}}
								>
									{filterSettings.map((settings) => (
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												gap: '6px',
											}}
											key={settings.id}
										>
											<Typography>
												{capitalize(
													removeSpecialChar(
														settings?.name?.match(/^IS_(.*)_AVAILABLE$/)?.[1] ||
															''
													)
												)}
											</Typography>
											<Switch
												checked={isChecked(settings)}
												onChange={() => toggleService(settings)}
											/>
										</Box>
									))}
								</Box>
							) : (
								<Typography sx={{ textAlign: 'center', padding: '15px' }}>
									No available service
								</Typography>
							)}
						</>
					)
				)}
			</Box>
		</>
	);
};

export default Services;
