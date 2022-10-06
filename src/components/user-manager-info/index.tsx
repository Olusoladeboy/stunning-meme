import React from 'react';
import { Box, Avatar, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { LIGHT_GRAY } from '../../utilities/constant';
import InfoList from './info-list';
import { ManagerDetailsData } from '../../utilities/types';
import Button from '../button';

interface ManagerDetails extends ManagerDetailsData {}

type Props = {
	manager: ManagerDetails;
	changeManager?: () => void;
};

const ManagerInfo = ({ manager, changeManager }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<Box sx={{ maxWidth: '600px' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: '1rem',
				}}
			>
				<Box style={styles.AvatarWrapper}>
					<Avatar
						sx={{
							backgroundSize: '400%',
							backgroundPosition: 'center',
							color: theme.palette.primary.main,
						}}
						style={styles.avatar}
					/>
					<Typography variant={'h5'}>Manager name</Typography>
				</Box>
				<Button
					onClick={() => {
						typeof changeManager !== 'undefined' && changeManager();
					}}
					style={styles.btn}
				>
					Change Manager
				</Button>
			</Box>
			<Box style={styles.form as any} component={'form'}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							md: 'repeat(2, 1fr)',
							gap: '15px',
						},
					}}
				>
					<Box>
						<Typography
							style={styles.label}
							component={'label'}
							variant={'body1'}
						>
							First name
						</Typography>
						<InfoList text={manager.firstname} />
					</Box>
					<Box>
						<Typography
							style={styles.label}
							component={'label'}
							variant={'body1'}
						>
							Last name
						</Typography>
						<InfoList text={manager.lastname} />
					</Box>
				</Box>
				<Box>
					<Typography
						style={styles.label}
						component={'label'}
						variant={'body1'}
					>
						Email address
					</Typography>
					<InfoList text={manager.email} />
				</Box>
				<Box>
					<Typography
						style={styles.label}
						component={'label'}
						variant={'body1'}
					>
						Phone number
					</Typography>
					<InfoList text={manager.phone} />
				</Box>
			</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	AvatarWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	avatar: {
		borderRadius: '5px',
		backgroundColor: LIGHT_GRAY,
		height: '50px',
		width: '50px',
		border: `1px solid ${theme.palette.primary.main}`,
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	label: {
		marginBottom: theme.spacing(2),
		display: 'inline-block',
		fontWeight: '600',
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		paddingLeft: '30px',
		paddingRight: '30px',
		fontWeight: '600',
		color: grey[50],
	},
	applyBtn: {
		color: theme.palette.secondary.main,
		fontWeight: '600',
		fontSize: '12px',
		padding: '0px',
		minWidth: 'unset',
	},
});

export default ManagerInfo;
