import { useState } from "react";
import { useQuery } from "react-query";
import { ENDPOINTS, QueryKeys } from "utilities";
import {
  dataSubscriptions,
  dataTypes,
  networks,
  dataPlans,
  airtimeTransactions,
  convertAirtimes,
} from "api";
import { cableAdmin } from "api/cable";
import { internetAdmin } from "api/internet";
import { educationAdmin } from "api/education";
import { electricityAdmin } from "api/electricity";

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
        typeof callback === "function" && callback(response.payload);
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
    "statistics-data-types",
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
    "statistics-data-plans",
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
        typeof callback === "function" && callback(response.payload);
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
        typeof callback === "function" && callback(response.payload);
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
export const useQueryCableAdmin = () => {
  const [isEnable, setIsEnable] = useState<boolean>(false);

  const { isLoading, data: dataCableAdmin } = useQuery(
    "statistics-cable-admin",
    () => cableAdmin(),
    {
      enabled: isEnable,
      onSettled: (data) => {
        setIsEnable(false);
      },
    }
  );

  const queryCableAdmin = () => {
    setIsEnable(true);
  };

  return {
    isLoadingCableAdmin: isLoading,
    dataCableAdmin,
    queryCableAdmin,
  };
};

export const useQueryCableAdminTransactions = (
  callback?: (data: any) => void
) => {
  const [dataCableAdminTransactions, setDataCableAdminTransactions] = useState<
    { [key: string]: any }[] | null
  >(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  // const queryCableAdminTransactions = async (params: Record<string, any>) => {
  const queryCableAdminTransactions = async () => {
    setLoading(true);
    try {
      // const response = await cableAdmin(params);
      const response = await cableAdmin();
      setLoading(false);

      if (response && response.success) {
        setDataCableAdminTransactions(response.payload);
        typeof callback === "function" && callback(response.payload);
        return response.payload;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    isLoadingCableAdminTransactions: isLoading,
    dataCableAdminTransactions,
    queryCableAdminTransactions,
  };
};

// Query Internet
export const useQueryInternetAdmin = () => {
  const [isEnable, setIsEnable] = useState<boolean>(false);

  const { isLoading, data: dataInternetAdmin } = useQuery(
    "statistics-internet-admin",
    () => internetAdmin(),
    {
      enabled: isEnable,
      onSettled: (data) => {
        setIsEnable(false);
      },
    }
  );

  const queryInternetAdmin = () => {
    setIsEnable(true);
  };

  return {
    isLoadingInternetAdmin: isLoading,
    dataInternetAdmin,
    queryInternetAdmin,
  };
};

export const useQueryInternetAdminTransactions = (
  callback?: (data: any) => void
) => {
  const [dataInternetAdminTransactions, setDataInternetAdminTransactions] =
    useState<{ [key: string]: any }[] | null>(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  // const queryInternetAdminTransactions = async (params: Record<string, any>) => {
  const queryInternetAdminTransactions = async () => {
    setLoading(true);
    try {
      // const response = await internetAdmin(params);
      const response = await internetAdmin();
      setLoading(false);

      if (response && response.success) {
        setDataInternetAdminTransactions(response.payload);
        typeof callback === "function" && callback(response.payload);
        return response.payload;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    isLoadingInternetAdminTransactions: isLoading,
    dataInternetAdminTransactions,
    queryInternetAdminTransactions,
  };
};

// Query Education
export const useQueryEducationAdmin = () => {
  const [isEnable, setIsEnable] = useState<boolean>(false);

  const { isLoading, data: dataEducationAdmin } = useQuery(
    "statistics-education-admin",
    () => educationAdmin(),
    {
      enabled: isEnable,
      onSettled: (data) => {
        setIsEnable(false);
      },
    }
  );

  const queryEducationAdmin = () => {
    setIsEnable(true);
  };

  return {
    isLoadingEducationAdmin: isLoading,
    dataEducationAdmin,
    queryEducationAdmin,
  };
};

export const useQueryEducationAdminTransactions = (
  callback?: (data: any) => void
) => {
  const [dataEducationAdminTransactions, setDataEducationAdminTransactions] =
    useState<{ [key: string]: any }[] | null>(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  // const queryEducationAdminTransactions = async (params: Record<string, any>) => {
  const queryEducationAdminTransactions = async () => {
    setLoading(true);
    try {
      // const response = await educationAdmin(params);
      const response = await educationAdmin();
      setLoading(false);

      if (response && response.success) {
        setDataEducationAdminTransactions(response.payload);
        typeof callback === "function" && callback(response.payload);
        return response.payload;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    isLoadingEducationAdminTransactions: isLoading,
    dataEducationAdminTransactions,
    queryEducationAdminTransactions,
  };
};

// Query Electricity
export const useQueryElectricityAdmin = () => {
  const [isEnable, setIsEnable] = useState<boolean>(false);

  const { isLoading, data: dataElectricityAdmin } = useQuery(
    "statistics-electricity-admin",
    () => electricityAdmin(),
    {
      enabled: isEnable,
      onSettled: (data) => {
        setIsEnable(false);
      },
    }
  );

  const queryElectricityAdmin = () => {
    setIsEnable(true);
  };

  return {
    isLoadingElectricityAdmin: isLoading,
    dataElectricityAdmin,
    queryElectricityAdmin,
  };
};

export const useQueryElectricityAdminTransactions = (
  callback?: (data: any) => void
) => {
  const [
    dataElectricityAdminTransactions,
    setDataElectricityAdminTransactions,
  ] = useState<{ [key: string]: any }[] | null>(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  // const queryElectricityAdminTransactions = async (params: Record<string, any>) => {
  const queryElectricityAdminTransactions = async () => {
    setLoading(true);
    try {
      // const response = await electricityAdmin(params);
      const response = await electricityAdmin();
      setLoading(false);

      if (response && response.success) {
        setDataElectricityAdminTransactions(response.payload);
        typeof callback === "function" && callback(response.payload);
        return response.payload;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    isLoadingElectricityAdminTransactions: isLoading,
    dataElectricityAdminTransactions,
    queryElectricityAdminTransactions,
  };
};
