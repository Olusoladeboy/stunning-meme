import React, { CSSProperties } from 'react';
import { Box, Avatar, Typography, useTheme } from '@mui/material';
import { DANGER_COLOR, IBusiness, SUCCESS_COLOR } from 'utilities';

type Props = {
	business?: IBusiness;
};

const BusinessAvatarWithDetails = ({ business }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container}>
			<Avatar style={styles.avatar} />
			<Box style={styles.detailsWrapper as CSSProperties}>
				<Typography style={styles.nameText} variant={'body1'}>
					{business?.businessName}
				</Typography>
				<Typography style={styles.text} variant={'body1'}>
					{typeof business?.businessOwner === 'object' &&
						business.businessOwner.email}
				</Typography>
				<Typography
					style={{
						...styles.text,
						textTransform: 'uppercase',
						color:
							business?.status?.toLocaleLowerCase() === 'active'
								? SUCCESS_COLOR
								: DANGER_COLOR,
					}}
					variant={'body1'}
				>
					{business?.status}
				</Typography>
			</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(3),
	},
	avatar: {
		height: '120px',
		width: '120px',
	},
	detailsWrapper: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(2),
	},
	nameText: {
		fontSize: '18px',
		fontWeight: '600',
	},
	text: {
		fontWeight: '600',
	},
});

export default BusinessAvatarWithDetails;
