import React, { CSSProperties, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
	Layout,
	BackButton,
	Button,
	ModalLayout,
	DataTypesTable,
	DataTypeForm,
} from 'components';
import { BOX_SHADOW, QueryKeys } from 'utilities';
import { dataTypes } from 'api';

const DataTypes = () => {
	const theme = useTheme();
	const { network, dataTypeName } = useParams();
	const styles = useStyles(theme);
	const [isDisplayModal, setDisplayModal] = useState<boolean>(false);

	const { isLoading, data } = useQuery(
		[QueryKeys.DataTypes, network],
		() =>
			dataTypes({
				sort: '-createdAt',
				network,
			}),
		{
			enabled: !!network,
		}
	);

	return (
		<Layout>
			{isDisplayModal && (
				<ModalLayout
					closeModal={() => setDisplayModal(false)}
					title={'Add new type'}
				>
					<DataTypeForm callback={() => setDisplayModal(false)} />
				</ModalLayout>
			)}
			<Box style={styles.container as CSSProperties}>
				<Box style={styles.header}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: ['15px', '30px'],
						}}
					>
						<BackButton />
						<Typography
							sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
							variant={'h5'}
						>
							{dataTypeName} Data Type
						</Typography>
					</Box>
					<Button
						onClick={() => setDisplayModal(true)}
						startIcon={<AddCircle />}
						style={styles.addPlanBtn as CSSProperties}
					>
						Add new type
					</Button>
				</Box>
				<DataTypesTable isLoading={isLoading} data={data && data.payload} />
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(4),
		border: `0.5px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
		minHeight: '80vh',
	},
	header: {
		padding: '0px 1.5rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	addPlanBtn: {
		color: theme.palette.secondary.main,
		border: `1px solid ${theme.palette.secondary.main}`,
		fontSize: '12px',
		textTransform: 'uppercase',
		paddingLeft: '20px',
		paddingRight: '20px',
	},
});

export default DataTypes;
