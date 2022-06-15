import React from 'react';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import Layout from '../../components/layout';
import ManagersTable from '../../components/table/managers-table';
import { useAppSelector } from '../../store/hooks';
import { QueryKeyTypes } from '../../utilities/types';
import Api from '../../utilities/api';

const Managers = () => {
	const { token } = useAppSelector((store) => store.authState);
	const { data, isLoading } = useQuery(
		QueryKeyTypes.AllManagers,
		() => Api.Manager.AllManagers(token || ''),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (data && data.success) {
					// console.log(data);
				}
			},
		}
	);

	return (
		<Layout>
			<Box>
				<ManagersTable isLoading={isLoading} managers={data && data.payload} />
			</Box>
		</Layout>
	);
};

export default Managers;
