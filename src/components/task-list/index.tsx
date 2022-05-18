import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import Button from '../button';
import { BOX_SHADOW, DANGER_COLOR } from '../../utilities/constant';
import TaskListTab from '../tabs/task-list';
import List from './list';
import { TODAY_LISTS, TOMORROW_LISTS } from './data';

const TaskList = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const [currentTab, setCurrentTab] = useState<number>(0);
	const handleChange = (e: any, value: number) => setCurrentTab(value);

	return (
		<Box style={styles.container}>
			<Box style={styles.header}>
				<Typography style={styles.headerText} variant={'body1'}>
					Task list
				</Typography>
				<Button
					style={styles.createBtn}
					startIcon={<AddCircle style={styles.addCircleIcon} />}
				>
					create
				</Button>
			</Box>
			<TaskListTab currentTab={currentTab} handleChange={handleChange} />
			<Box style={styles.listWrapper}>
				<Box hidden={currentTab !== 0}>
					<List data={TODAY_LISTS} />
				</Box>
				<Box hidden={currentTab !== 1}>
					<List data={TOMORROW_LISTS} />
				</Box>
			</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `1px solid ${theme.palette.secondary.main}`,
		// padding: '1.5rem 1rem',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '1rem 1rem 0px',
	},
	headerText: {
		fontWeight: '600',
	},
	createBtn: {
		color: DANGER_COLOR,
		border: `1px solid ${DANGER_COLOR}`,
		fontSize: '13px',
		padding: '5px 20px',
	},
	addCircleIcon: {
		fontSize: '14px',
	},
	listWrapper: {
		padding: '1rem',
	},
});

export default TaskList;
