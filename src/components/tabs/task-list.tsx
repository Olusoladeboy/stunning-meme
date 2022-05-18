import React from 'react';
import { Tab } from '@mui/material';
import TabWrapper from './tab-wrapper';

type Props = {
	currentTab: string | number;
	handleChange: (e: any, value: number) => void;
};

const TaskListTab = ({ currentTab, handleChange }: Props) => {
	return (
		<TabWrapper currentTab={currentTab} handleChange={handleChange}>
			<Tab label='Today' />
			<Tab label='Tomorrow' />
		</TabWrapper>
	);
};

export default TaskListTab;
