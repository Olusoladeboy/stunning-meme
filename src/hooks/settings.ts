import { settings, updateSettings } from 'api';
import { useMutation, useQuery, QueryKey } from 'react-query';
import useHandleError from './useHandleError';
import useToastAlert from './useToastAlert';
import { useState } from 'react';

export const useUpdateSettings = (props?: { callback?: () => void }) => {
	const callback = props?.callback;
	const errorHandler = useHandleError();
	const toastAlert = useToastAlert();

	const { isLoading, mutate } = useMutation(updateSettings, {
		onSettled: (data, error) => {
			if (error) {
				const response = errorHandler({ error });
				if (response?.message) {
					toastAlert({
						message: response.message,
						type: 'error',
					});
				}
			}

			if (data) {
				toastAlert({
					message: 'Settings updated successfully',
					type: 'success',
				});
				callback?.();
			}
		},
	});

	return {
		isUpdatingSettings: isLoading,
		updateSettings: mutate,
	};
};

export const useSettings = (props?: {
	queryKey?: QueryKey;
	params?: { [key: string]: any };
}) => {
	const queryKey = props?.queryKey;
	const params = props?.params;
	const errorHandler = useHandleError();
	const toastAlert = useToastAlert();

	const [settingsError, setSettingsError] = useState<string>('');

	const { isLoading, data, refetch } = useQuery(
		[queryKey],
		() => settings(params as any),
		{
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				if (error) {
					const response = errorHandler({ error });
					if (response?.message) {
						setSettingsError(response.message);
						toastAlert({
							message: response.message,
							type: 'error',
						});
					}
				}
			},
		}
	);

	const refetchSettings = () => {
		// Clear error state
		setSettingsError('');
		// refetch settings
		refetch();
	};

	return {
		isLoadingSettings: isLoading,
		settings: data?.payload,
		refetchSettings,
		settingsError,
	};
};
