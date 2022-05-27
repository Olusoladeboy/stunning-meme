import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';

type Props = {
	data?: { [key: string]: any };
};

const KycForm = ({ data }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: 'repeat(2, 1fr)',
					},
					gap: theme.spacing(4),
				}}
			>
				<Box>
					<Typography style={styles.title} variant={'h5'}>
						KYC Level 1
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								md: 'repeat(2, 1fr)',
							},
							gap: theme.spacing(4),
						}}
					>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Daily Limit
							</Typography>
							<TextInput fullWidth placeholder={'Daily limit'} />
						</Box>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Weekly limit
							</Typography>
							<TextInput fullWidth placeholder={'Weekly limit'} />
						</Box>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Monthly limit
							</Typography>
							<TextInput fullWidth placeholder={'Monthly limit'} />
						</Box>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Per Transaction limit
							</Typography>
							<TextInput fullWidth placeholder={'Per transaction limit'} />
						</Box>
					</Box>
				</Box>
				<Box>
					<Typography style={styles.title} variant={'h5'}>
						KYC Level 2
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								md: 'repeat(2, 1fr)',
							},
							gap: theme.spacing(4),
						}}
					>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Daily Limit
							</Typography>
							<TextInput fullWidth placeholder={'Daily limit'} />
						</Box>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Weekly limit
							</Typography>
							<TextInput fullWidth placeholder={'Weekly limit'} />
						</Box>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Monthly limit
							</Typography>
							<TextInput fullWidth placeholder={'Monthly limit'} />
						</Box>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Per Transaction limit
							</Typography>
							<TextInput fullWidth placeholder={'Per transaction limit'} />
						</Box>
					</Box>
				</Box>
				<Box>
					<Typography style={styles.title} variant={'h5'}>
						KYC Level 3
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								md: 'repeat(2, 1fr)',
							},
							gap: theme.spacing(4),
						}}
					>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Daily Limit
							</Typography>
							<TextInput fullWidth placeholder={'Daily limit'} />
						</Box>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Weekly limit
							</Typography>
							<TextInput fullWidth placeholder={'Weekly limit'} />
						</Box>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Monthly limit
							</Typography>
							<TextInput fullWidth placeholder={'Monthly limit'} />
						</Box>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Per Transaction limit
							</Typography>
							<TextInput fullWidth placeholder={'Per transaction limit'} />
						</Box>
					</Box>
				</Box>
			</Box>
			<Button size={'large'} style={styles.btn}>
				Save
			</Button>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	title: {
		marginBottom: theme.spacing(3),
	},
	label: {
		display: 'block',
		marginBottom: theme.spacing(1),
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		minWidth: '140px',
		marginTop: theme.spacing(4),
	},
});

export default KycForm;
