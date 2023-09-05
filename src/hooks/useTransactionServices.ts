import { useState } from 'react';
import { useQuery } from 'react-query';
import { NetworkData, ENDPOINTS, QueryKeys } from 'utilities';
import { dataSubscriptions, dataTypes, networks } from 'api';
import useToastAlert from './useToastAlert';
import useHandleError from './useHandleError';

export const useQueryAirtimeNetwork = () => {
	const alert = useToastAlert();
	const handleError = useHandleError();

	const [isEnable, setIsEnable] = useState<boolean>(false);

	const { isLoading, data: airtimeNetworks } = useQuery(
		QueryKeys.AirtimeNetwork,
		() => networks({ url: ENDPOINTS.AirtimeNetwork }),
		{
			enabled: isEnable,
			onSettled: (data) => {
				setIsEnable(false);
			},
		}
	);

	const queryAirtimeNetworks = () => setIsEnable(true);

	return {
		queryAirtimeNetworks,
		isLoadingAirtimeNetworks: isLoading,
		airtimeNetworks,
	};
};

// Query Data Networks
export const useQueryDateNetwork = () => {
	const alert = useToastAlert();
	const handleError = useHandleError();

	const [isEnable, setIsEnable] = useState<boolean>(false);

	const { isLoading, data: dataDataNetwork } = useQuery(
		QueryKeys.DataNetwork,
		() => networks({ url: ENDPOINTS.DataNetwork }),
		{
			enabled: isEnable,
			onSettled: (data) => {
				setIsEnable(false);
			},
		}
	);

	const queryDataNetwork = () => setIsEnable(true);

	return {
		isLoadingDataNetwork: isLoading,
		dataDataNetwork,
		queryDataNetwork,
	};
};

// Query Data Types
export const useQueryDataTypes = () => {
	const [isEnable, setIsEnable] = useState<boolean>(false);
	const [params, setParams] = useState<{ [key: string]: any }>({});

	const { isLoading, data: dataDataTypes } = useQuery(
		'statistics-data-types',
		() => dataTypes(params),
		{
			enabled: !!(isEnable && Object.keys(params).length > 0),
			onSettled: (data) => {
				setIsEnable(false);
			},
		}
	);

	const queryDataTypes = (params: Record<string, any> = {}) => {
		setParams({}); // Clear State
		setIsEnable(true);
		setParams(params);
	};

	return {
		isLoadingDataTypes: isLoading,
		dataDataTypes,
		queryDataTypes,
	};
};

// Query Data Networks
export const useQueryDataSubscription = () => {
	const alert = useToastAlert();
	const handleError = useHandleError();

	const [isEnable, setIsEnable] = useState<boolean>(false);
	const [params, setParams] = useState<{ [key: string]: any }>({});

	const { isLoading, data: dataDataNetwork } = useQuery(
		'statistics-data-subscriptions',
		() => dataSubscriptions(params),
		{
			enabled: isEnable,
			onSettled: (data) => {
				setIsEnable(false);
			},
		}
	);

	const queryDataSubscriptions = (params?: Record<string, any>) => {
		setIsEnable(true);
	};

	return {
		isLoadingDataNetwork: isLoading,
		dataDataNetwork,
		queryDataSubscriptions,
	};
};

// Query Cable
export const useQueryCableProviders = () => {
	const alert = useToastAlert();
	const handleError = useHandleError();

	const [isEnable, setIsEnable] = useState<boolean>(false);
	const [params, setParams] = useState<{ [key: string]: any }>({});

	const { isLoading, data: dataDataNetwork } = useQuery(
		'statistics-cable-providers',
		() => dataSubscriptions(params),
		{
			enabled: isEnable,
			onSettled: (data) => {
				setIsEnable(false);
			},
		}
	);

	const queryDataSubscriptions = (params?: Record<string, any>) => {
		setIsEnable(true);
	};

	return {
		isLoadingDataNetwork: isLoading,
		dataDataNetwork,
		queryDataSubscriptions,
	};
};
