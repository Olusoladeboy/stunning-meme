import { useSnackbar, VariantType, SnackbarMessage } from 'notistack';

export interface SnackBar {
	message: SnackbarMessage;
	type: VariantType;
}

const useToastAlert = () => {
	const { enqueueSnackbar } = useSnackbar();

	return ({ message, type }: SnackBar) => {
		enqueueSnackbar(message, { variant: type });
	};
};

export default useToastAlert;
