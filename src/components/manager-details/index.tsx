import React, { CSSProperties } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import UserAvatarWithDetails from '../user-avatar-with-details';
import Button from '../button';
import { ManagerDetailsDataTypes } from '../../utilities/types';

interface ManagerDetailsTypes extends ManagerDetailsDataTypes {}

type Props = {
	managerDetail: ManagerDetailsTypes;
	handleEdit?: () => void;
};

const ManagerDetails = ({ managerDetail, handleEdit }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box>
			<UserAvatarWithDetails details={managerDetail} />
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%',
					marginTop: theme.spacing(3),
				}}
			>
				<Box>
					<Box sx={{ marginBottom: theme.spacing(3) }} style={styles.grid}>
						<Typography variant={'body1'}>Total Users</Typography>
						<Typography
							variant={'body1'}
						>{`${managerDetail.firstname} ${managerDetail.lastname}`}</Typography>
					</Box>
					<Box style={styles.grid}>
						<Typography variant={'body1'}>Phone number</Typography>
						<Typography variant={'body1'}>{managerDetail.phone}</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: theme.spacing(3),
					}}
				>
					<Button
						onClick={() => typeof handleEdit !== 'undefined' && handleEdit()}
						style={styles.editBtn as CSSProperties}
					>
						Edit profile
					</Button>
					<Button style={styles.deleteBtn as CSSProperties}>
						Delete Admin
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	grid: {
		display: 'grid',
		gap: theme.spacing(3),
		gridTemplateColumns: '4fr 6fr',
	},
	deleteBtn: {
		border: `1px solid ${red[900]}`,
		color: red[900],
		textTransform: 'uppercase',
	},
	editBtn: {
		border: `1px solid ${theme.palette.secondary.main}`,
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		textTransform: 'uppercase',
	},
});

export default ManagerDetails;
