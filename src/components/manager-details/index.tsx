import React, { CSSProperties } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import UserAvatarWithDetails from '../avatar-with-details/manager';
import Button from '../button';
import { ManagerDetailsData, ManagerTypes } from '../../utilities';

type Props = {
	managerDetail: ManagerDetailsData;
	handleEdit?: () => void;
	type?: ManagerTypes.Manager | ManagerTypes.Admin;
};

const ManagerDetails = ({
	managerDetail,
	handleEdit,
	type = ManagerTypes.Manager,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box>
			<UserAvatarWithDetails user={managerDetail} />
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
				{managerDetail?.role !== 'SUPER_ADMIN' && (
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
							{type === ManagerTypes.Manager
								? 'Delete Manager'
								: 'Delete Admin'}
						</Button>
					</Box>
				)}
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
