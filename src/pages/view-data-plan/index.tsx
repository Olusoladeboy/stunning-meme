import React, { CSSProperties, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import {
	Layout,
	BackButton,
	Button,
	ModalLayout,
	DataPlanForm,
} from '../../components';
import { BOX_SHADOW } from '../../utilities/constant';
import ViewDataPlansTable from '../../components/table/data-plans-table';

const ViewDataPlan = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [isDisplayModal, setDisplayModal] = useState<boolean>(false);
	return (
		<Layout>
			{isDisplayModal && (
				<ModalLayout
					closeModal={() => setDisplayModal(false)}
					title={'Add new plan'}
				>
					<DataPlanForm handleOnSubmit={() => setDisplayModal(false)} />
				</ModalLayout>
			)}
			<Box style={styles.container as CSSProperties}>
				<Box style={styles.header}>
					<BackButton />
					<Button
						onClick={() => setDisplayModal(true)}
						startIcon={<AddCircle />}
						style={styles.addPlanBtn as CSSProperties}
					>
						Add new plan
					</Button>
				</Box>
				<ViewDataPlansTable />
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(4),
		border: `1px solid ${theme.palette.secondary.main}`,
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

export default ViewDataPlan;
