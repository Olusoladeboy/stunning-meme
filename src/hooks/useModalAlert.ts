import { setModalAlert } from '../store/app';
import { useAppDispatch } from '../store/hooks';
import { IModalAlert } from '../utilities';

const useModalAlert = () => {
	const dispatch = useAppDispatch();
	return (alert: IModalAlert | null) => dispatch(setModalAlert(alert));
};

export default useModalAlert;
