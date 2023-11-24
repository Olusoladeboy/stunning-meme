import { useQuery } from 'react-query';
import { statistic } from '../api';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { QueryKeys } from '../utilities';
import { setLoadingStatistics, setStatistics } from '../store/app';

const useLoadStatistics = () => {
	const { token } = useAppSelector((store) => store.authState);
	const dispatch = useAppDispatch();
	useQuery(QueryKeys.Statistics, () => statistic(), {
		enabled: !!token,
		onSettled: (data, error) => {
			if (error) {
				dispatch(setLoadingStatistics(false));
			}

			if (data && data.success) {
				dispatch(setStatistics(data.payload));
			}
		},
	});
};

export default useLoadStatistics;
