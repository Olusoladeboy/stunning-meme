import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { QueryKeys, MAX_RECORDS, IBusiness, ICommission } from 'utilities';
import { businessCommissions } from 'api';
import { useHandleError, useAlert, useSearchTransaction } from 'hooks';
import { useAppSelector } from 'store/hooks';
import Pagination from '../pagination';
import BusinessCommissionsTable from 'components/table/business-commissions-table';
import Button from 'components/button';
import ModalWrapper from 'components/modal/Wrapper';
import CommissionForm from 'components/forms/commission-form';

type Props = {
	business: IBusiness;
};

const BusinessCommissions = ({ business }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	const [commission, setCommission] = useState<ICommission | null>(null);

	const [isDisplayCreateCommissionModal, setDisplayCreateCommissionModal] =
		useState<Boolean>(false);

	const location = useLocation();
	const query = queryString.parse(location.search);

	const { isSearching, search, clearSearch, searchTransaction } =
		useSearchTransaction();

	const closeModal = () => {
		setDisplayCreateCommissionModal(false);
		setCommission(null);
	};

	// const isEnabledRequest = false;

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	const token = useAppSelector((store) => store.authState.token);

	const { isLoading, data } = useQuery(
		[QueryKeys.Commissions, business?.id, page],
		() =>
			businessCommissions({
				business: business?.id,
				sort: '-createdAt',
				limit: MAX_RECORDS,
				skip: (page - 1) * MAX_RECORDS,
			}),
		{
			enabled: !!(token && business),
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						setAlert({ message: response.message, type: 'error' });
				}

				if (data && data.success) {
					const total = Number(data?.metadata?.total);
					setTotal(total);
					const count = Math.ceil(total / MAX_RECORDS);
					setCount(count);
				}
			},
		}
	);

	const handlePageChange = (page: number) => {
		// if (page !== 1) {
		// 	setPage(page);
		// 	navigate(
		// 		`${LINKS.Users}/${user?.id}?tab=${UserNavList.Transaction}&page=${page}`
		// 	);
		// } else {
		// 	navigate(`${LINKS.Users}/${user?.id}?tab=${UserNavList.Transaction}`);
		// 	setPage(page);
		// }
	};

	const handleSelectCommission = (commission: ICommission) => {
		setCommission(commission);
		setDisplayCreateCommissionModal(true);
	};

	return (
		<>
			{isDisplayCreateCommissionModal && (
				<ModalWrapper
					title={`${commission ? 'Update' : 'Create'} Commission`}
					closeModal={closeModal}
				>
					<CommissionForm
						formData={commission as ICommission}
						callback={closeModal}
					/>
				</ModalWrapper>
			)}
			<Box>
				<Box sx={{ marginTop: theme.spacing(4) }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							marginRight: '20px',
							marginBottom: '20px',
						}}
					>
						<Button
							onClick={() => setDisplayCreateCommissionModal(true)}
							variant='outlined'
						>
							Create Commission
						</Button>
					</Box>
					<BusinessCommissionsTable
						isLoading={isLoading || isSearching}
						searchTransaction={searchTransaction}
						data={data && data.payload}
						clearSearch={clearSearch}
						handleSelectCommission={handleSelectCommission}
					/>
					{!search && total > MAX_RECORDS && (
						<Pagination
							sx={{ marginLeft: '20px', marginTop: '2rem' }}
							size={'large'}
							variant={'outlined'}
							shape={'rounded'}
							page={page}
							count={count}
							onChange={(e, number) =>
								typeof handlePageChange !== 'undefined' &&
								handlePageChange(number)
							}
						/>
					)}
				</Box>
			</Box>
		</>
	);
};

export default BusinessCommissions;
