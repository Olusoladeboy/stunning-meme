import React, { CSSProperties, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import Button from '../button';
import { NetworkPage } from 'utilities';
import AddNetworkForm from '../forms/network-form';
import ModalWrapper from '../modal/Wrapper';
import { useAppSelector } from 'store/hooks';

type Props = {
	message: string;
	type:
		| NetworkPage.AIRTIME_NETWORK
		| NetworkPage.DATA_NETWORK
		| NetworkPage.CONVERSION_NETWORK;
};

const NetworkDescriptiveMessageAndAddButton = ({ message, type }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { canCreateOrUpdateRecord } = useAppSelector(
		(store) => store.authState
	);

	const [isDisplayModal, setDisplayModal] = useState<boolean>(false);

	return (
		<>
			{isDisplayModal && (
				<ModalWrapper
					hasCloseButton
					closeModal={() => setDisplayModal(false)}
					title={`Add ${type}`}
				>
					<AddNetworkForm
						handleContinue={() => setDisplayModal(false)}
						type={type}
					/>
				</ModalWrapper>
			)}
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: 'repeat(2, 1fr)',
					},
					gap: theme.spacing(5),
					alignItems: 'flex-end',
				}}
			>
				<Box style={styles.descriptiveMessageContainer}>
					<Typography sx={{ marginBottom: theme.spacing(2) }} variant={'h6'}>
						{message}
					</Typography>
					<Typography variant={'h6'}>Set rate on each network</Typography>
				</Box>
				{canCreateOrUpdateRecord && (
					<Button
						onClick={() => setDisplayModal(true)}
						startIcon={<AddCircle />}
						size={'large'}
						style={styles.addBtn as CSSProperties}
					>
						add {type}
					</Button>
				)}
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	descriptiveMessageContainer: {
		backgroundColor: theme.palette.secondary.main,
		padding: `1.5rem 1rem`,
		borderRadius: theme.spacing(2),
		color: grey[50],
		gap: theme.spacing(2),
	},
	main: {
		display: 'flex',
		// alignItems: 'center',
		gap: theme.spacing(4),
	},
	verticalLine: {
		width: '3px',
		minHeight: '100%',
		backgroundColor: grey[50],
	},
	addBtn: {
		color: theme.palette.secondary.main,
		border: `1px solid ${theme.palette.secondary.main}`,
		justifySelf: 'flex-end',
		paddingLeft: '20px',
		paddingRight: '20px',
		textTransform: 'uppercase',
		// fontWeight: '600',
		fontSize: '12px',
	},
});

export default NetworkDescriptiveMessageAndAddButton;
