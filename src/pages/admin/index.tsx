import React from 'react';
import { useQuery } from 'react-query';
import { Layout, AdminUserTable } from 'components';
import { useAppSelector } from 'store/hooks';
import { QueryKeys } from 'utilities';
import { useAlert, useHandleError } from 'hooks';
import { staffs } from 'api';

const Admin = () => {
	const setAlert = useAlert();
	const handleError = useHandleError();

	const { token } = useAppSelector((store) => store.authState);
	const { data, isLoading } = useQuery(
		QueryKeys.Staffs,
		() =>
			staffs({
				sort: '-createdAt',
			}),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						setAlert({ message: response.message, type: 'error' });
				}
			},
		}
	);

	return (
		<Layout>
			<AdminUserTable isLoading={isLoading} managers={data && data.payload} />
		</Layout>
	);
};

export default Admin;
