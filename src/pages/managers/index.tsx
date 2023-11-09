import React from 'react';
import { Layout, ManagersTable } from 'components';
import { QueryKeys } from 'utilities';
import { usePageTitle, useQueryHook, useSearchManager } from 'hooks';
import { managers } from 'api';

const Managers = () => {
	usePageTitle('Managers');
	const { isSearching, search, searchManager, clearSearch } =
		useSearchManager();
	const { data, isLoading } = useQueryHook({
		queryKey: QueryKeys.Managers,
		queryFn: () =>
			managers({
				params: {
					sort: '-createdAt',
				},
			}),
	});

	return (
		<Layout>
			<ManagersTable
				clearSearch={clearSearch}
				searchManager={searchManager}
				isLoading={isLoading || isSearching}
				managers={search ? search : data && data.payload}
			/>
		</Layout>
	);
};

export default Managers;
