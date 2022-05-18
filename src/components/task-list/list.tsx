import React from 'react';
import { Box, Typography } from '@mui/material';
import formatNumberToCurrency from '../../utilities/helpers/formatNumberToCurrency';
import { grey } from '@mui/material/colors';
import { DANGER_COLOR } from '../../utilities/constant';

type Props = {
	data: { [key: string]: any }[];
};

const List = ({ data }: Props) => {
	return (
		<Box
			sx={{
				'& > div': {
					marginBottom: '15px',
				},
				'& > div:last-child': {
					marginBottom: '0px',
				},
			}}
		>
			{data && data.length > 0 ? (
				data.map(({ status, amount, transaction_type }: any, key: number) => (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
						key={key}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
							<Box
								sx={{
									height: '40px',
									width: '40px',
									backgroundColor: '#FDD7D7',
									borderRadius: '5px',
								}}
							></Box>
							<Box>
								<Typography
									sx={{ color: DANGER_COLOR, fontWeight: '600' }}
									variant={'body1'}
								>
									{status}
								</Typography>
								<Typography
									sx={{ color: grey[500], fontSize: '12px' }}
									variant={'body1'}
								>
									{transaction_type}
								</Typography>
							</Box>
						</Box>
						<Typography sx={{ fontWeight: '600' }} variant={'body1'}>
							{formatNumberToCurrency(amount)}
						</Typography>
					</Box>
				))
			) : (
				<Typography>No data</Typography>
			)}
		</Box>
	);
};

export default List;
