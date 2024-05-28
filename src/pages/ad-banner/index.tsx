import React from 'react';
import { Layout, AdBannerTable, Button } from 'components';
import { QueryKeys } from 'utilities';
import { usePageTitle, useQueryHook } from 'hooks';
import { adBanners } from 'api';

const AdBanner = () => {
	usePageTitle('Ad Banners');

	const { data, isLoading } = useQueryHook({
		queryKey: QueryKeys.AdBanner,
		queryFn: () =>
			adBanners({
				sort: '-createdAt',
			}),
	});

	return (
		<Layout>
			<AdBannerTable isLoading={isLoading} data={data && data.payload} />
		</Layout>
	);
};

export default AdBanner;
