import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import ManagersTable from '../../components/table/managers-table';
import { useAppSelector } from '../../store/hooks';
import { QueryKey } from '../../utilities/types';
import Api from '../../utilities/api';
import { useQueryHook } from '../../utilities/api/hooks';

const Managers = () => {
	const { token } = useAppSelector((store) => store.authState);
	const { data, isLoading } = useQueryHook({
		queryKey: QueryKey.AllManagers,
		queryFn: () =>
			Api.Manager.AllManagers({
				token: token as string,
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
