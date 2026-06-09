import { google2faLogin, google2faSetup, google2faVerifySetup } from 'api';
import { useAlert, useHandleError, useModalAlert } from 'hooks';
import { useMutation } from 'react-query';
import { IHookProps } from 'utilities';

type Setup2faResponse = Awaited<ReturnType<typeof google2faSetup>>;
type VerifySetup2faResponse = Awaited<ReturnType<typeof google2faVerifySetup>>;
type TwoFactorLoginResponse = Awaited<ReturnType<typeof google2faLogin>>;

export function useSetup2fa(props?: IHookProps<Setup2faResponse>) {
	const callback = props?.callback;
	const setAlert = useAlert();
	const handleError = useHandleError();
	const { isLoading, mutate } = useMutation(google2faSetup, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}
			if (data && data.success) {
				callback?.({
					success: true,
					data,
				});
			}
		},
	});

	return {
		isSettingup2fa: isLoading,
		setup2fa: mutate,
	};
}

export function useVerifySetup2fa(props?: IHookProps<VerifySetup2faResponse>) {
	const callback = props?.callback;
	const setAlert = useAlert();
	const handleError = useHandleError();
	const { isLoading, mutate } = useMutation(google2faVerifySetup, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}
			if (data && data.success) {
				callback?.({
					success: true,
					data,
				});
			}
		},
	});

	return {
		isVerifying2faSetup: isLoading,
		verify2faSetup: mutate,
	};
}

export function use2faLogin(props?: IHookProps<TwoFactorLoginResponse>) {
	const callback = props?.callback;
	const setAlert = useAlert();
	const handleError = useHandleError();
	const { isLoading, mutate } = useMutation(google2faLogin, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}

			if (data && data.success) {
				callback?.({
					success: true,
					data,
				});
			}
		},
	});

	return {
		isLogining: isLoading,
		login: mutate,
	};
}
