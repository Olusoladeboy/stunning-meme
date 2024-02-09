import { useState } from 'react';
import { useQuery } from 'react-query';
import { ENDPOINTS, QueryKeys } from 'utilities';
import {
	dataSubscriptions,
	dataTypes,
	networks,
	dataPlans,
	airtimeTransactions,
	convertAirtimes,
} from 'api';
import { cableProviders, cableTransactions } from 'api/cable';

export const useQueryAirtimeNetwork = (queryKey?: string) => {
	const [isEnable, setIsEnable] = useState<boolean>(false);

	const { isLoading, data: airtimeNetworks } = useQuery(
		[QueryKeys.AirtimeNetwork, queryKey],
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
export const useQueryDateNetwork = (queryKey?: string) => {
	const [isEnable, setIsEnable] = useState<boolean>(false);

	const { isLoading, data: dataDataNetwork } = useQuery(
		[QueryKeys.DataNetwork, queryKey],
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

// Query Airtime convert Networks
export const useQueryConvertAirtimeNetworks = (queryKey?: string) => {
	const [isEnable, setIsEnable] = useState<boolean>(false);

	const { isLoading, data: convertAirtimeNetworks } = useQuery(
		[QueryKeys.ConvertAirtime, queryKey],
		() => networks({ url: ENDPOINTS.ConvertNetworks }),
		{
			enabled: isEnable,
			onSettled: (data) => {
				setIsEnable(false);
			},
		}
	);

	const queryConvertAirtimeNetwork = () => setIsEnable(true);

	return {
		isLoadingConvertAirtimeNetwork: isLoading,
		convertAirtimeNetworks,
		queryConvertAirtimeNetwork,
	};
};

// Query Convert Airtimes
export const useQueryConvertAirtimes = (callback?: (data: any) => void) => {
	const [dataConvertAirtimes, setDataConvertAirtime] = useState<
		{ [key: string]: any }[] | null
	>(null);
	const [isLoading, setLoading] = useState<boolean>(false);

	const queryConvertAirtimes = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await convertAirtimes({ params });
			setLoading(false);

			if (response && response.success) {
				setDataConvertAirtime(response.payload);
				typeof callback === 'function' && callback(response.payload);
				return response.payload;
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return {
		isLoadingConvertAirtime: isLoading,
		convertAirtimes: dataConvertAirtimes,
		queryConvertAirtimes,
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

// Query Data Types
export const useQueryDataPlans = () => {
	const [isEnable, setIsEnable] = useState<boolean>(false);
	const [params, setParams] = useState<{ [key: string]: any }>({});

	const { isLoading, data: dataDataPlans } = useQuery(
		'statistics-data-plans',
		() => dataPlans(params),
		{
			enabled: !!(isEnable && Object.keys(params).length > 0),
			onSettled: (data) => {
				setIsEnable(false);
			},
		}
	);

	const queryDataPlans = async (params: Record<string, any> = {}) => {
		setParams({}); // Clear State
		setIsEnable(true);
		setParams(params);
	};

	return {
		isLoadingDataPlans: isLoading,
		dataDataPlans,
		queryDataPlans,
	};
};

// Query Data Subscription
export const useQueryDataSubscriptions = (callback?: (data: any) => void) => {
	const [dataDataSubscriptions, setDataDataSubscriptions] = useState<
		{ [key: string]: any }[] | null
	>(null);
	const [isLoading, setLoading] = useState<boolean>(false);

	const queryDataSubscriptions = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await dataSubscriptions(params);
			setLoading(false);

			if (response && response.success) {
				setDataDataSubscriptions(response.payload);
				typeof callback === 'function' && callback(response.payload);
				return response.payload;
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return {
		isLoadingDataSubscriptions: isLoading,
		dataSubscriptions: dataDataSubscriptions,
		queryDataSubscriptions,
	};
};

// Query Airtime Transactiion
export const useQueryAirtimeTransactions = (callback?: (data: any) => void) => {
	const [dataAirtimeTransactions, setDataAirtimeTransactions] = useState<
		{ [key: string]: any }[] | null
	>(null);

	const [isLoading, setLoading] = useState<boolean>(false);

	const queryAirtimeTransactions = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await airtimeTransactions(params);
			setLoading(false);

			if (response && response.success) {
				setDataAirtimeTransactions(response.payload);
				typeof callback === 'function' && callback(response.payload);
				return response.payload;
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return {
		isLoadingAirtimeTransactions: isLoading,
		dataAirtimeTransactions: dataAirtimeTransactions,
		queryAirtimeTransactions,
	};
};

// Query Cable
export const useQueryCableProviders = () => {
	const [isEnable, setIsEnable] = useState<boolean>(false);

	const { isLoading, data: dataCableProviders } = useQuery(
		'statistics-cable-providers',
		() => cableProviders(),
		{
			enabled: isEnable,
			onSettled: (data) => {
				setIsEnable(false);
			},
		}
	);

	const queryCableProviders = () => {
		setIsEnable(true);
	};

	return {
		isLoadingCableProviders: isLoading,
		dataCableProviders,
		queryCableProviders,
	};
};

export const useQueryCableTransactions = (callback?: (data: any) => void) => {
  const [dataCableTransactions, setDataCableTransactions] = useState<
    { [key: string]: any }[] | null
  >(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  const queryCableTransactions = async (params: Record<string, any>) => {
    setLoading(true);
    try {
      const response = await cableTransactions(params);
      setLoading(false);

      if (response && response.success) {
        setDataCableTransactions(response.payload);
        typeof callback === "function" && callback(response.payload);
        return response.payload;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    isLoadingCableTransactions: isLoading,
    dataCableTransactions: dataCableTransactions,
    queryCableTransactions,
  };
};