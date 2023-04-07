import React from 'react';
import { Box } from '@mui/material';
import { Layout, ManagersTable } from '../../components';
import { QueryKeys } from '../../utilities';
import { useQueryHook } from '../../hooks';
import { managers } from '../../api';

const Managers = () => {
	const { data, isLoading } = useQueryHook({
		queryKey: QueryKeys.AllManagers,
		queryFn: () =>
			managers({
				params: {
					sort: '-createdAt',
				},
			}),
	});

	return (
		<Layout>
			<Box>
				<ManagersTable isLoading={isLoading} managers={data && data.payload} />
			</Box>
		</Layout>
	);
};

export default Managers;
