import React, { CSSProperties } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Box, useTheme, CircularProgress, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Button from '../button';
import AvaliableNetworkItem from './available-network-item';
import Api from '../../utilities/api';
import { QueryKey, API_ENDPOINTS } from '../../utilities/types';
import { useAppSelector } from '../../store/hooks';
import LINKS from '../../utilities/links';
import { useAlert } from '../../utilities/hooks';

const AvailableNetwork = () => {
	const theme = useTheme();
	const setAlert = useAlert();
	const navigate = useNavigate();
	const styles = useStyles(theme);
	const { token } = useAppSelector((store) => store.authState);

	const { isLoading, data } = useQuery(
		QueryKey.ConvertNetwork,
		() =>
			Api.Network.GetNetwork({
				token: token || '',
				url: API_ENDPOINTS.ConvertNetworks,
			}),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					setAlert({ data: error, type: 'error' });
				}
			},
		}
	);

	const handleClick = () => {
		if (data && data.payload.length > 0) {
			navigate(LINKS.ConversionNetwork);
		} else {
			console.log('Add network');
		}
	};

	return (
		<>
			{isLoading ? (
				<Box style={styles.circularProgress as CSSProperties}>
					<CircularProgress sx={{ color: theme.palette.secondary.main }} />
					<Typography
						sx={{ color: theme.palette.secondary.main }}
						variant={'body2'}
					>
						Loading...
					</Typography>
				</Box>
			) : (
				<Box style={styles.container}>
					{data && data.payload.length > 0 ? (
						<Box style={styles.main}>
							{data.payload.map(
								(network: { [key: string]: any }, key: number) => (
									<AvaliableNetworkItem
										key={key}
										name={network.name || ''}
										rate={network.rate || ''}
									/>
								)
							)}
						</Box>
					) : (
						<Typography>No available network</Typography>
					)}
					<Button
						onClick={() => handleClick()}
						style={styles.editBtn as CSSProperties}
					>
						{data && data.payload.length > 0 ? 'View Networks' : 'Add network'}
					</Button>
				</Box>
			)}
		</>
	);
};

const useStyles = (theme: any) => ({
	container: {
		backgroundColor: '#3D3D3D',
		padding: `1.5rem 1rem`,
		borderRadius: theme.spacing(2),
		color: grey[50],
		display: 'flex',
		gap: theme.spacing(2),
		justifyContent: 'space-between',
		// alignItems: 'flex-end',
	},
	main: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		// alignItems: 'center',
		justifyContent: 'space-between',
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(3),
	},
	verticalLine: {
		width: '3px',
		minHeight: '100%',
		backgroundColor: grey[50],
	},
	editBtn: {
		backgroundColor: 'unset',
		border: `1px solid ${grey[50]}`,
		whiteSpace: 'nowrap',
		color: grey[50],
		fontSize: '12px',
		textTransform: 'uppercase',
		alignSelf: 'flex-end',
	},
	circularProgress: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '8px',
	},
});

export default AvailableNetwork;
