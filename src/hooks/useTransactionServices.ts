import { useState } from 'react';
import { useQuery } from 'react-query';
import {
	ENDPOINTS,
	QueryKeys,
	Metadata,
	Bundle,
	IEpin,
	IFunding,
	ITransfer,
} from 'utilities';
import {
	dataSubscriptions,
	dataTypes,
	networks,
	dataPlans,
	airtimeTransactions,
	convertAirtimes,
	walletWithdrawal,
	ePinTransactions,
	walletFunding,
	walletTransfers,
	autoConvertAirtimeGroups,
} from 'api';
import { cableTransactions } from 'api/cable';
import { billBundles, billProviders, billTransactions } from 'api/bill';

export const useQueryAirtimeNetwork = (queryKey?: string) => {
	const [isEnable, setIsEnable] = useState<boolean>(false);

	const { isLoading, data: airtimeNetworks } = useQuery(
		[QueryKeys.AirtimeNetwork, queryKey],
		() => networks({ url: ENDPOINTS.AirtimeNetwork }),
		{
			enabled: isEnable,
			refetchOnWindowFocus: false,
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
			refetchOnWindowFocus: false,
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
			refetchOnWindowFocus: false,
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
export const useQueryConvertAirtimes = (
	callback?: (data: any, metadata: Metadata) => void
) => {
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
				typeof callback === 'function' &&
					callback(response.payload, response.metadata);
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

export const useQueryAutoConvertAirtimes = (
	callback?: (data: any, matadata?: Metadata) => void
) => {
	const [dataAutoConvertAirtimes, setDataAutoConvertAirtime] = useState<
		{ [key: string]: any }[] | null
	>(null);
	const [isLoading, setLoading] = useState<boolean>(false);

	const queryAutoConvertAirtimes = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await autoConvertAirtimeGroups(params);
			setLoading(false);

			if (response && response.success) {
				setDataAutoConvertAirtime(response.payload);
				typeof callback === 'function' &&
					callback(response.payload, response?.metadata);
				return response.payload;
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return {
		isLoadingAutoConvertAirtime: isLoading,
		convertAutoAirtimes: dataAutoConvertAirtimes,
		queryAutoConvertAirtimes,
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
			refetchOnWindowFocus: false,
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
			refetchOnWindowFocus: false,
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
export const useQueryDataSubscriptions = (
	callback?: (data: any, metadata?: Metadata) => void
) => {
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
				typeof callback === 'function' &&
					callback(response.payload, response?.metadata);
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
export const useQueryAirtimeTransactions = (
	callback?: (data: any, metadata?: Metadata) => void
) => {
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
				const metadata = response.metadata;
				typeof callback === 'function' && callback(response.payload, metadata);
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

// Query Education providerss
export const useQueryCableProviders = () => {
	const [isEnable, setSetEnable] = useState<boolean>(false);
	const { isLoading, data: dataCableProviders } = useQuery(
		'cable-providers',
		() => billProviders(`${ENDPOINTS.Bills}/cable-providers`),
		{
			enabled: isEnable,
			onSettled: (data) => {
				setSetEnable(false);
			},
		}
	);

	const queryCableProviders = () => {
		setSetEnable(true);
	};

	return {
		isLoadingCableProviders: isLoading,
		dataCableProviders,
		queryCableProviders,
	};
};

// Cablee Bundle

export const useCableBundles = () => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [payload, setPayload] = useState<Bundle[] | null>(null);

	const queryCableBundles = async (params: { [key: string]: any }) => {
		setLoading(true);
		try {
			const res = await billBundles({
				url: `${ENDPOINTS.Bills}/cable-providers`,
				params,
			});

			setLoading(false);

			if (res && res.payload) {
				setPayload(res.payload);
			}
		} catch (error) {
			console.log(`${error}`);
			setLoading(false);
		}
	};

	return {
		queryCableBundles,
		isLoadingCableBundles: isLoading,
		cableBundles: payload,
	};
};

export const useQueryCableTransactions = (
	callback?: (data: any, metadata?: Metadata) => void
) => {
	const [transactions, setTransactions] = useState<
		{ [key: string]: any }[] | null
	>(null);

	const [isLoading, setLoading] = useState<boolean>(false);

	// const query = async (params: Record<string, any>) => {
	const queryCableTransactions = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await cableTransactions(params);
			setLoading(false);

			if (response && response.success) {
				setTransactions(response.payload);
				typeof callback === 'function' &&
					callback(response.payload, response?.metadata);
				// return response.payload;
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return {
		isLoadingCableTransactions: isLoading,
		cableTransactions: transactions,
		queryCableTransactions,
	};
};

export const useQueryBillTransactions = (
	callback?: ({
		data,
		metadata,
		service,
	}: {
		data: any;
		metadata?: Metadata;
		service: string;
	}) => void
) => {
	const [transactions, setTransactions] = useState<
		{ [key: string]: any }[] | null
	>(null);

	const [isLoading, setLoading] = useState<boolean>(false);

	// const query = async (params: Record<string, any>) => {
	const queryBillTransactions = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await billTransactions(params);
			setLoading(false);

			if (response && response.success) {
				setTransactions(response.payload);
				typeof callback === 'function' &&
					callback({
						data: response.payload,
						metadata: response?.metadata,
						service: params.type,
					});
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return {
		isLoadingBillTransactions: isLoading,
		billTransactions: transactions,
		queryBillTransactions,
	};
};

export const useQueryEducationTransactions = (
	callback?: (data: any, metadata?: Metadata) => void
) => {
	const [transactions, setTransactions] = useState<
		{ [key: string]: any }[] | null
	>(null);

	const [isLoading, setLoading] = useState<boolean>(false);

	// const query = async (params: Record<string, any>) => {
	const queryEducationTransactions = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await billTransactions(params);
			setLoading(false);

			if (response && response.success) {
				setTransactions(response.payload);
				typeof callback === 'function' &&
					callback(response.payload, response?.metadata);
				// return response.payload;
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return {
		isLoadingEducationTransactions: isLoading,
		educationTransactions: transactions,
		queryEducationTransactions,
	};
};

// Wallet Transaction Query Hooks

export const useQueryWalletWithdrawals = (
	callback?: (data: any, metadata?: Metadata) => void
) => {
	const [withdrawals, setWithdrawals] = useState<
		{ [key: string]: any }[] | null
	>(null);

	const [isLoading, setLoading] = useState<boolean>(false);

	// const query = async (params: Record<string, any>) => {
	const queryWalletWithdrawals = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await walletWithdrawal(params);
			setLoading(false);

			if (response && response.success) {
				setWithdrawals(response.payload);
				typeof callback === 'function' &&
					callback(response.payload, response?.metadata);
				// return response.payload;
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return {
		isLoadingWalletWithdrawals: isLoading,
		walletWithdrawal: withdrawals,
		queryWalletWithdrawals,
	};
};

// Wallet Funding hooks

export const useQueryWalletFundings = (
	callback?: (data: any, metadata?: Metadata) => void
) => {
	const [dataWalletFundings, setDataWalletFundings] = useState<
		IFunding[] | null
	>(null);

	const [isLoading, setLoading] = useState<boolean>(false);
	const queryWalletFundings = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await walletFunding(params);
			setLoading(false);

			if (response && response.success) {
				setDataWalletFundings(response.payload);
				typeof callback === 'function' &&
					callback(response.payload, response?.metadata);
				// return response.payload;
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return {
		isLoadingWalletFundings: isLoading,
		walletFundings: dataWalletFundings,
		queryWalletFundings,
	};
};

// Wallet Transfer hooks
export const useQueryWalletTransfers = (
	callback?: (data: any, metadata?: Metadata) => void
) => {
	const [dataWalletTransfers, setDataWalletTransfers] = useState<
		ITransfer[] | null
	>(null);

	const [isLoading, setLoading] = useState<boolean>(false);
	const queryWalletTransfers = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await walletTransfers(params);
			setLoading(false);

			if (response && response.success) {
				setDataWalletTransfers(response.payload);
				typeof callback === 'function' &&
					callback(response.payload, response?.metadata);
				// return response.payload;
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return {
		isLoadingWalletTransfers: isLoading,
		walletTransfers: dataWalletTransfers,
		queryWalletTransfers,
	};
};

// Epin Transaction Hooks

export const useQueryEPinTransactions = (
	callback?: (data: any, metadata?: Metadata) => void
) => {
	const [dataEPinTransactions, setDataEPinTransactions] = useState<
		IEpin[] | null
	>(null);

	const [isLoading, setLoading] = useState<boolean>(false);

	// const query = async (params: Record<string, any>) => {
	const queryEPinTransactions = async (params: Record<string, any>) => {
		setLoading(true);
		try {
			const response = await ePinTransactions(params);
			setLoading(false);

			if (response && response.success) {
				setDataEPinTransactions(response.payload);
				typeof callback === 'function' &&
					callback(response.payload, response?.metadata);
			}
		} catch (error) {
			setLoading(false);
		}
	};

	return {
		isLoadingEPinTransactions: isLoading,
		walletWithdrawal: dataEPinTransactions,
		queryEPinTransactions,
	};
};
