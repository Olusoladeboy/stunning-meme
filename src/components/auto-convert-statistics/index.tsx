import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { autoAirtimeConvertStatistics } from 'api';
import moment from 'moment';
import React, { useRef } from 'react';
import { useQuery } from 'react-query';

const AutoConversionStatistics = () => {
	const params = useRef({
		start_date: moment().startOf('day').format('yyyy-MM-DD'),
		end_date: moment().endOf('day').format('yyyy-MM-DD'),
	});
	const { isLoading, data } = useQuery({
		queryKey: ['auto-conversion-statistic-key'],
		queryFn: () => autoAirtimeConvertStatistics(params.current),
	});
	console.log(data);
	if (data && data.payload) {
		return (
			<Box
				sx={{
					display: 'grid',
					gap: ['15px', '15px'],
					gridTemplateColumns: ['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)'],
				}}
			>
				{(Object.keys(data.payload) as Array<keyof typeof data.payload>).map(
					(dataKey) => {
						const value = data.payload[dataKey];
						return (
							<Box
								sx={{
									border: `1px solid ${grey['300']}`,
									padding: ['10px', '15px 25px'],
									borderRadius: '8px',
								}}
								key={String(dataKey)}
							>
								<Typography
									sx={{
										textTransform: 'capitalize',
									}}
								>
									{String(dataKey).replace(/([a-z])([A-Z0-9])/g, '$1 $2')}
								</Typography>
								<Typography variant='h4'>{value}</Typography>
							</Box>
						);
					}
				)}
			</Box>
		);
	}
	return null;
};

export default AutoConversionStatistics;
