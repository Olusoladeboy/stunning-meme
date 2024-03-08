import React, { useState, useRef } from "react";
import { Box, styled, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../button";
import Select from "../form-components/select";
import { SECOUNDARY_COLOR, SERVICES, MAX_RECORDS } from "utilities";
import {
  useQueryAirtimeNetwork,
  useQueryDateNetwork,
  useQueryDataTypes,
  useQueryDataPlans,
  useQueryDataSubscriptions,
  useQueryAirtimeTransactions,
  useQueryConvertAirtimeNetworks,
  useQueryConvertAirtimes,
  useQueryCableAdmin,
  useQueryCableAdminTransactions,
  useQueryInternetAdmin,
  useQueryInternetAdminTransactions,
  useQueryEducationAdmin,
  useQueryEducationAdminTransactions,
  useQueryElectricityAdmin,
  useQueryElectricityAdminTransactions,
  useQueryWithdrawalAdminTransactions,
  useQueryAutoAirtimeConversionAdminTransactions,
  useQueryCardTopUpAdminTransactions,
  useQueryBettingAdminTransactions,
  useQueryBankFundingAdminTransactions,
  useQueryEPinAdminTransactions,
  useQueryReversalAdminTransactions,
  useQueryWalletTransferAdminTransactions,
  useQueryWithdrawalAdmin,
  useQueryAutoAirtimeConversionAdmin,
  useQueryCardTopUpAdmin,
  useQueryBettingAdmin,
  useQueryBankFundingAdmin,
  useQueryEPinAdmin,
  useQueryReversalAdmin,
  useQueryWalletTransferAdmin,
} from "hooks";

const SELECT_SERVICE = "Select service";
const SELECT_TYPE = "Select type";
const SELECT_PLAN = "Select plan";
const SELECT_PROVIDER = "Select service provider";

interface ISearchStatistics {
  setDataStatistics?: (data: {
    service: string;
    data: { [key: string]: any }[];
  }) => void;
}

const SearchStatistics = ({ setDataStatistics }: ISearchStatistics) => {
  const [schema, setSchema] = useState<any>();
  const [providerType, setProviderType] = useState<string>("");

  const maxRecordRef = useRef<number>(MAX_RECORDS);

  const { isLoadingAirtimeNetworks, queryAirtimeNetworks, airtimeNetworks } =
    useQueryAirtimeNetwork();
  const { isLoadingDataNetwork, queryDataNetwork, dataDataNetwork } =
    useQueryDateNetwork();
  const { isLoadingDataTypes, queryDataTypes, dataDataTypes } =
    useQueryDataTypes();

  const { dataDataPlans, isLoadingDataPlans, queryDataPlans } =
    useQueryDataPlans();

  const {
    isLoadingConvertAirtimeNetwork,
    convertAirtimeNetworks,
    queryConvertAirtimeNetwork,
  } = useQueryConvertAirtimeNetworks();

  const {
    isLoadingDataSubscriptions,
    dataSubscriptions,
    queryDataSubscriptions,
  } = useQueryDataSubscriptions((data) => {
    typeof setDataStatistics === "function" &&
      setDataStatistics({
        service: SERVICES.DATA_SUBSCRIPTION,
        data,
      });
  });

  const { queryAirtimeTransactions, isLoadingAirtimeTransactions } =
    useQueryAirtimeTransactions((data) => {
      typeof setDataStatistics === "function" &&
        setDataStatistics({
          service: SERVICES.AIRTIME_TOP_UP,
          data,
        });
    });

  const { queryConvertAirtimes, isLoadingConvertAirtime } =
    useQueryConvertAirtimes((data) => {
      typeof setDataStatistics === "function" &&
        setDataStatistics({
          service: SERVICES.AIRTIME_CONVERSION,
          data,
        });
    });

  const { isLoadingCableAdmin, dataCableAdmin, queryCableAdmin } =
    useQueryCableAdmin();

  const { isLoadingCableAdminTransactions, queryCableAdminTransactions } =
    useQueryCableAdminTransactions((data) => {
      typeof setDataStatistics === "function" &&
        setDataStatistics({
          service: SERVICES.CABLE,
          data,
        });
    });

  const { isLoadingInternetAdmin, dataInternetAdmin, queryInternetAdmin } =
    useQueryInternetAdmin();

  const { isLoadingInternetAdminTransactions, queryInternetAdminTransactions } =
    useQueryInternetAdminTransactions((data) => {
      typeof setDataStatistics === "function" &&
        setDataStatistics({
          service: SERVICES.INTERNET,
          data,
        });
    });

  const { isLoadingEducationAdmin, dataEducationAdmin, queryEducationAdmin } =
    useQueryEducationAdmin();

  const {
    isLoadingEducationAdminTransactions,
    queryEducationAdminTransactions,
  } = useQueryEducationAdminTransactions((data) => {
    typeof setDataStatistics === "function" &&
      setDataStatistics({
        service: SERVICES.EDUCATION,
        data,
      });
  });

  const {
    isLoadingElectricityAdmin,
    dataElectricityAdmin,
    queryElectricityAdmin,
  } = useQueryElectricityAdmin();

  const {
    isLoadingElectricityAdminTransactions,
    queryElectricityAdminTransactions,
  } = useQueryElectricityAdminTransactions((data) => {
    typeof setDataStatistics === "function" &&
      setDataStatistics({
        service: SERVICES.ELECTRICITY,
        data,
      });
  });

  const {
    isLoadingWithdrawalAdmin,
    dataWithdrawalAdmin,
    queryWithdrawalAdmin,
  } = useQueryWithdrawalAdmin();

  const {
    isLoadingWithdrawalAdminTransactions,
    queryWithdrawalAdminTransactions,
  } = useQueryWithdrawalAdminTransactions((data) => {
    typeof setDataStatistics === "function" &&
      setDataStatistics({
        service: SERVICES.WITHDRAWAL,
        data,
      });
  });

  const {
    isLoadingAutoAirtimeConversionAdmin,
    dataAutoAirtimeConversionAdmin,
    queryAutoAirtimeConversionAdmin,
  } = useQueryAutoAirtimeConversionAdmin();

  const {
    isLoadingAutoAirtimeConversionAdminTransactions,
    queryAutoAirtimeConversionAdminTransactions,
  } = useQueryAutoAirtimeConversionAdminTransactions((data) => {
    typeof setDataStatistics === "function" &&
      setDataStatistics({
        service: SERVICES.AUTO_AIRTIME_CONVERSION,
        data,
      });
  });

  const { isLoadingCardTopUpAdmin, dataCardTopUpAdmin, queryCardTopUpAdmin } =
    useQueryCardTopUpAdmin();

  const {
    isLoadingCardTopUpAdminTransactions,
    queryCardTopUpAdminTransactions,
  } = useQueryCardTopUpAdminTransactions((data) => {
    typeof setDataStatistics === "function" &&
      setDataStatistics({
        service: SERVICES.CARD_TOP_UP,
        data,
      });
  });

  const { isLoadingBettingAdmin, dataBettingAdmin, queryBettingAdmin } =
    useQueryBettingAdmin();

  const { isLoadingBettingAdminTransactions, queryBettingAdminTransactions } =
    useQueryBettingAdminTransactions((data) => {
      typeof setDataStatistics === "function" &&
        setDataStatistics({
          service: SERVICES.BETTING,
          data,
        });
    });

  const {
    isLoadingBankFundingAdmin,
    dataBankFundingAdmin,
    queryBankFundingAdmin,
  } = useQueryBankFundingAdmin();

  const {
    isLoadingBankFundingAdminTransactions,
    queryBankFundingAdminTransactions,
  } = useQueryBankFundingAdminTransactions((data) => {
    typeof setDataStatistics === "function" &&
      setDataStatistics({
        service: SERVICES.BANK_FUNDING,
        data,
      });
  });

  const { isLoadingEPinAdmin, dataEPinAdmin, queryEPinAdmin } =
    useQueryEPinAdmin();

  const { isLoadingEPinAdminTransactions, queryEPinAdminTransactions } =
    useQueryEPinAdminTransactions((data) => {
      typeof setDataStatistics === "function" &&
        setDataStatistics({
          service: SERVICES.EPIN,
          data,
        });
    });

  const { isLoadingReversalAdmin, dataReversalAdmin, queryReversalAdmin } =
    useQueryReversalAdmin();

  const { isLoadingReversalAdminTransactions, queryReversalAdminTransactions } =
    useQueryReversalAdminTransactions((data) => {
      typeof setDataStatistics === "function" &&
        setDataStatistics({
          service: SERVICES.REVERSAL,
          data,
        });
    });

  const {
    isLoadingWalletTransferAdmin,
    dataWalletTransferAdmin,
    queryWalletTransferAdmin,
  } = useQueryWalletTransferAdmin();

  const {
    isLoadingWalletTransferAdminTransactions,
    queryWalletTransferAdminTransactions,
  } = useQueryWalletTransferAdminTransactions((data) => {
    typeof setDataStatistics === "function" &&
      setDataStatistics({
        service: SERVICES.WALLET_TRANSFER,
        data,
      });
  });

  const initialValues = {
    service: SELECT_SERVICE,
    type: SELECT_TYPE,
    plan: SELECT_PLAN,
    provider: SELECT_PROVIDER,
  };

  // validation Schema
  const validationSchema = yup.object().shape({
    service: yup
      .string()
      .notOneOf([SELECT_SERVICE], SELECT_SERVICE)
      .required(SELECT_SERVICE),
  });
  const validationSchemaProvider = yup.object().shape({
    service: yup
      .string()
      .notOneOf([SELECT_SERVICE], SELECT_SERVICE)
      .required(SELECT_SERVICE),
    provider: yup
      .string()
      .notOneOf([SELECT_PROVIDER], SELECT_PROVIDER)
      .required(SELECT_PROVIDER),
  });

  const validationSchemaProviderWithPlan = yup.object().shape({
    service: yup
      .string()
      .notOneOf([SELECT_SERVICE], SELECT_SERVICE)
      .required(SELECT_SERVICE),
    provider: yup
      .string()
      .notOneOf([SELECT_PROVIDER], SELECT_PROVIDER)
      .required(SELECT_PROVIDER),
    plan: yup
      .string()
      .notOneOf([SELECT_PLAN], SELECT_PLAN)
      .required(SELECT_PLAN),
  });

  const dataSubscriptionSchema = yup.object().shape({
    service: yup
      .string()
      .notOneOf([SELECT_SERVICE], SELECT_SERVICE)
      .required(SELECT_SERVICE),
    provider: yup
      .string()
      .notOneOf([SELECT_PROVIDER], SELECT_PROVIDER)
      .required(SELECT_PROVIDER),
    plan: yup
      .string()
      .notOneOf([SELECT_PLAN], SELECT_PLAN)
      .required(SELECT_PLAN),
    type: yup
      .string()
      .notOneOf([SELECT_TYPE], SELECT_TYPE)
      .required(SELECT_TYPE),
  });

  // const switchProvider = (provider: string) => {
  // 	setFieldValue('provider', SELECT_PROVIDER);
  // 	switch (service) {
  // 		case SERVICES.AIRTIME_TOP_UP:
  // 			queryAirtimeNetworks();
  // 			break;

  // 		default:
  // 			break;
  // 	}
  // };

  const switchHandleSubmit = (values: Record<string, any>) => {
    let payload: { [key: string]: any } = {
      populate: "user,plan,dataType,network",
      limit: maxRecordRef.current,
    };

    if (values.service === SERVICES.DATA_SUBSCRIPTION) {
      // if (values.provider) payload.network = values.provider;
      if (values.plan && values.plan !== SELECT_PLAN)
        payload.plan = values.plan;
      if (values.type && values.type !== SELECT_TYPE)
        payload.dataType = values.type;
      queryDataSubscriptions(payload);
      return;
    }

    if (values.service === SERVICES.AIRTIME_TOP_UP) {
      if (values.provider && values.provider !== SELECT_PROVIDER)
        payload.network = values.provider;
      queryAirtimeTransactions(payload);
      return;
    }

    if (values.service === SERVICES.AIRTIME_CONVERSION) {
      if (values.provider && values.provider !== SELECT_PROVIDER)
        payload.network = values.provider;
      queryConvertAirtimes(payload);
      return;
    }

    // if (values.service === SERVICES.CABLE) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryCableAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.CABLE) {
      queryCableAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.INTERNET) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryInternetAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.INTERNET) {
      queryInternetAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.EDUCATION) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryEducationAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.EDUCATION) {
      queryEducationAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.ELECTRICITY) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryElectricityAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.ELECTRICITY) {
      queryElectricityAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.WITHDRAWAL) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryWithdrawalAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.WITHDRAWAL) {
      queryWithdrawalAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.AUTO_AIRTIME_CONVERSION) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryAutoAirtimeConversionAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.AUTO_AIRTIME_CONVERSION) {
      queryAutoAirtimeConversionAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.CARD_TOP_UP) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryCardTopUpAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.CARD_TOP_UP) {
      queryCardTopUpAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.BETTING) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryBettingAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.BETTING) {
      queryBettingAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.BANK_FUNDING) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryBankFundingAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.BANK_FUNDING) {
      queryBankFundingAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.EPIN) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryEPinAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.EPIN) {
      queryEPinAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.REVERSAL) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryReversalAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.REVERSAL) {
      queryReversalAdminTransactions();
      return;
    }

    // if (values.service === SERVICES.WALLET_TRANSFER) {
    //   if (values.provider && values.provider !== SELECT_PROVIDER)
    //     payload.provider = values.provider;
    //   queryWalletTransferAdminTransactions(payload);
    //   return;
    // }

    if (values.service === SERVICES.WALLET_TRANSFER) {
      queryWalletTransferAdminTransactions();
      return;
    }
  };

  const { values, handleChange, setFieldValue, handleSubmit, touched, errors } =
    useFormik({
      initialValues,
      // validationSchema: schema || validationSchema,
      onSubmit: (values) => {
        switchHandleSubmit(values);
      },
    });

  const { service, type, provider, plan } = values;

  const switchService = (service: string) => {
    setFieldValue("provider", SELECT_PROVIDER);
    setFieldValue("type", SELECT_TYPE);
    setFieldValue("plan", SELECT_PLAN);

    switch (service) {
      case SERVICES.AIRTIME_TOP_UP:
        queryAirtimeNetworks();
        break;
      case SERVICES.DATA_SUBSCRIPTION:
        queryDataNetwork();
        break;

      case SERVICES.AIRTIME_CONVERSION:
        queryConvertAirtimeNetwork();
        break;

      case SERVICES.CABLE:
        queryCableAdmin();
        break;

      case SERVICES.INTERNET:
        queryInternetAdmin();
        break;

      case SERVICES.EDUCATION:
        queryEducationAdmin();
        break;

      case SERVICES.ELECTRICITY:
        queryElectricityAdmin();
        break;

      case SERVICES.WITHDRAWAL:
        queryWithdrawalAdmin();
        break;

      case SERVICES.AUTO_AIRTIME_CONVERSION:
        queryAutoAirtimeConversionAdmin();
        break;

      case SERVICES.CARD_TOP_UP:
        queryCardTopUpAdmin();
        break;

      case SERVICES.BETTING:
        queryBettingAdmin();
        break;

      case SERVICES.BANK_FUNDING:
        queryBankFundingAdmin();
        break;

      case SERVICES.EPIN:
        queryEPinAdmin();
        break;

      case SERVICES.REVERSAL:
        queryReversalAdmin();
        break;

      case SERVICES.WALLET_TRANSFER:
        queryWalletTransferAdmin();
        break;

      default:
        break;
    }
  };

  const handleSelectProvider = (provider: string) => {
    setFieldValue("provider", provider);
    setFieldValue("type", SELECT_TYPE);
    setFieldValue("plan", SELECT_PLAN);

    switch (service) {
      case SERVICES.DATA_SUBSCRIPTION:
        setProviderType(SERVICES.DATA_SUBSCRIPTION);
        queryDataTypes({
          network: provider,
        });
        break;

      default:
        break;
    }
  };

  const handleSelectType = (type: string) => {
    setFieldValue("type", type);
    setFieldValue("plan", SELECT_PLAN);
    switch (service) {
      case SERVICES.DATA_SUBSCRIPTION:
        setProviderType(SERVICES.DATA_SUBSCRIPTION);
        queryDataPlans({
          network: provider,
          dataType: type,
        });
        break;

      default:
        break;
    }
  };

  return (
    <Container>
      <SelectContainer>
        <Select
          value={service}
          fullWidth
          error={touched.service && Boolean(errors.service)}
          helpertext={touched.service && errors.service}
          onChange={(e) => {
            const value = e.target.value as string;
            setFieldValue("service", value);
            switchService(value);
          }}
        >
          <MenuItem disabled value={SELECT_SERVICE}>
            {SELECT_SERVICE}
          </MenuItem>
          {Object.values(SERVICES).map((service) => (
            <MenuItem key={service} value={service}>
              {service}
            </MenuItem>
          ))}
        </Select>
      </SelectContainer>
      {/* 
				===== NOTE!!! =====
				Network Field
			*/}
      {service === SERVICES.AIRTIME_TOP_UP && (
        <>
          <SelectContainer>
            <Select
              fullWidth
              error={touched.provider && Boolean(errors.provider)}
              helpertext={touched.provider && errors.provider}
              value={provider}
              onChange={handleChange("provider") as never}
            >
              <MenuItem disabled value={SELECT_PROVIDER}>
                {isLoadingAirtimeNetworks
                  ? "Loading..."
                  : airtimeNetworks && airtimeNetworks.payload.length === 0
                  ? "No  available provider"
                  : "Select Airtime provider"}
              </MenuItem>
              {airtimeNetworks &&
                airtimeNetworks.payload.length > 0 &&
                airtimeNetworks.payload.map((network) => (
                  <MenuItem key={network.id} value={network.id}>
                    {network.name}
                  </MenuItem>
                ))}
            </Select>
          </SelectContainer>
        </>
      )}

      {service === SERVICES.DATA_SUBSCRIPTION && (
        <>
          <SelectContainer>
            <Select
              fullWidth
              value={provider}
              onChange={(e) => handleSelectProvider(e.target.value as string)}
            >
              <MenuItem disabled value={SELECT_PROVIDER}>
                {isLoadingDataNetwork
                  ? "Loading..."
                  : dataDataNetwork && dataDataNetwork.payload.length === 0
                  ? "No  available provider"
                  : "Select data network"}
              </MenuItem>
              {dataDataNetwork &&
                dataDataNetwork.payload.map((network) => (
                  <MenuItem key={network.id} value={network.id}>
                    {network.name}
                  </MenuItem>
                ))}
            </Select>
          </SelectContainer>

          <SelectContainer>
            <Select
              disabled={Boolean(provider === SELECT_PROVIDER)}
              fullWidth
              value={type}
              onChange={(e) => handleSelectType(e.target.value as string)}
            >
              <MenuItem disabled value={SELECT_TYPE}>
                {isLoadingDataTypes
                  ? "Loading..."
                  : dataDataTypes && dataDataTypes.payload.length === 0
                  ? "No  available data types"
                  : "Select data type"}
              </MenuItem>
              {dataDataTypes &&
                dataDataTypes.payload.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
            </Select>
          </SelectContainer>
          <SelectContainer>
            <Select
              disabled={Boolean(type === SELECT_TYPE)}
              fullWidth
              value={plan}
              onChange={(e) => setFieldValue("plan", e.target.value as string)}
            >
              <MenuItem disabled value={SELECT_PLAN}>
                {isLoadingDataPlans
                  ? "Loading..."
                  : dataDataTypes && dataDataTypes.payload.length === 0
                  ? "No  available data plans"
                  : "Select data plan"}
              </MenuItem>
              {dataDataPlans &&
                dataDataPlans.payload.map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </MenuItem>
                ))}
            </Select>
          </SelectContainer>
        </>
      )}

      {service === SERVICES.AIRTIME_CONVERSION && (
        <>
          <SelectContainer>
            <Select
              fullWidth
              error={touched.provider && Boolean(errors.provider)}
              helpertext={touched.provider && errors.provider}
              value={provider}
              onChange={handleChange("provider") as never}
            >
              <MenuItem disabled value={SELECT_PROVIDER}>
                {isLoadingConvertAirtimeNetwork
                  ? "Loading..."
                  : convertAirtimeNetworks &&
                    convertAirtimeNetworks.payload.length === 0
                  ? "No  available provider"
                  : "Select Airtime provider"}
              </MenuItem>
              {convertAirtimeNetworks &&
                convertAirtimeNetworks.payload.length > 0 &&
                convertAirtimeNetworks.payload.map((network) => (
                  <MenuItem key={network.id} value={network.id}>
                    {network.name}
                  </MenuItem>
                ))}
            </Select>
          </SelectContainer>
        </>
      )}

      {/* {service === SERVICES.CABLE && (
        <>
          <SelectContainer>
            <Select
              fullWidth
              error={touched.provider && Boolean(errors.provider)}
              helpertext={touched.provider && errors.provider}
              value={provider}
              onChange={handleChange("provider") as never}
            >
              <MenuItem disabled value={SELECT_PROVIDER}>
                {isLoadingCableAdmin
                  ? "Loading..."
                  : dataCableAdmin && dataCableAdmin.payload.length === 0
                  ? "No available provider"
                  : "Select cable provider"}
              </MenuItem>
              {dataCableAdmin &&
                dataCableAdmin.payload.length > 0 &&
                dataCableAdmin.payload.map((admin) => (
                  <MenuItem key={admin.billerid} value={admin.service_type}>
                    {admin.service_type}
                  </MenuItem>
                ))}
            </Select>
          </SelectContainer>
        </>
      )} */}

      {/* {service === SERVICES.INTERNET && (
        <>
          <SelectContainer>
            <Select
              fullWidth
              error={touched.provider && Boolean(errors.provider)}
              helpertext={touched.provider && errors.provider}
              value={provider}
              onChange={handleChange("provider") as never}
            >
              <MenuItem disabled value={SELECT_PROVIDER}>
                {isLoadingInternetProviders
                  ? "Loading..."
                  : dataInternetProviders &&
                    dataInternetProviders.payload.length === 0
                  ? "No available provider"
                  : "Select internet provider"}
              </MenuItem>
              {dataInternetProviders &&
                dataInternetProviders.payload.length > 0 &&
                dataInternetProviders.payload.map((provider) => (
                  <MenuItem
                    key={provider.billerid}
                    value={provider.service_type}
                  >
                    {provider.service_type}
                  </MenuItem>
                ))}
            </Select>
          </SelectContainer>
        </>
      )}

      {service === SERVICES.EDUCATION && (
        <>
          <SelectContainer>
            <Select
              fullWidth
              error={touched.provider && Boolean(errors.provider)}
              helpertext={touched.provider && errors.provider}
              value={provider}
              onChange={handleChange("provider") as never}
            >
              <MenuItem disabled value={SELECT_PROVIDER}>
                {isLoadingEducationProviders
                  ? "Loading..."
                  : dataEducationProviders &&
                    dataEducationProviders.payload.length === 0
                  ? "No available provider"
                  : "Select education provider"}
              </MenuItem>
              {dataEducationProviders &&
                dataEducationProviders.payload.length > 0 &&
                dataEducationProviders.payload.map((provider) => (
                  <MenuItem
                    key={provider.billerid}
                    value={provider.service_type}
                  >
                    {provider.service_type}
                  </MenuItem>
                ))}
            </Select>
          </SelectContainer>
        </>
      )} 

      {service === SERVICES.ELECTRICITY && (
        <>
          <SelectContainer>
            <Select
              fullWidth
              error={touched.provider && Boolean(errors.provider)}
              helpertext={touched.provider && errors.provider}
              value={provider}
              onChange={handleChange("provider") as never}
            >
              <MenuItem disabled value={SELECT_PROVIDER}>
                {isLoadingElectricityProviders
                  ? "Loading..."
                  : dataElectricityProviders &&
                    dataElectricityProviders.payload.length === 0
                  ? "No available provider"
                  : "Select electricity provider"}
              </MenuItem>
              {dataElectricityProviders &&
                dataElectricityProviders.payload.length > 0 &&
                dataElectricityProviders.payload.map((provider) => (
                  <MenuItem
                    key={provider.billerid}
                    value={provider.service_type}
                  >
                    {provider.service_type}
                  </MenuItem>
                ))}
            </Select>
          </SelectContainer>
        </>
      )} 
      
      */}

      <Button
        loading={
          isLoadingDataSubscriptions ||
          isLoadingAirtimeTransactions ||
          isLoadingConvertAirtime ||
          isLoadingCableAdminTransactions ||
          isLoadingInternetAdminTransactions ||
          isLoadingEducationAdminTransactions ||
          isLoadingElectricityAdminTransactions ||
          isLoadingWithdrawalAdminTransactions ||
          isLoadingAutoAirtimeConversionAdminTransactions ||
          isLoadingCardTopUpAdminTransactions ||
          isLoadingBettingAdminTransactions ||
          isLoadingBankFundingAdminTransactions ||
          isLoadingEPinAdminTransactions ||
          isLoadingReversalAdminTransactions ||
          isLoadingWalletTransferAdminTransactions
        }
        size={"large"}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{
          backgroundColor: `${SECOUNDARY_COLOR} !important`,
          color: "white",
          textTransform: "uppercase",
          // fontWeight: 'bold',
          minWidth: "140px",
        }}
      >
        Search
      </Button>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
}));

const SelectContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "240px",
  flex: "1",
}));

export default SearchStatistics;
