import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQuery } from 'react-query';
import {
	Button,
	Layout,
	ModalWrapper,
	Pagination,
	RecipientForm,
} from 'components';
import {
	BOX_SHADOW,
	QueryKeys,
	MAX_RECORDS,
	LINKS,
	ErrorBoundary,
	SECOUNDARY_COLOR,
} from 'utilities';
import { useAppSelector } from 'store/hooks';
import {
	useAlert,
	useHandleError,
	usePageTitle,
	useSearchConversion,
} from 'hooks';
import { getRecipients } from 'api/recipient';
import AutoConversionRecipientsTable from 'components/table/auto-conversion-recipients-table';
import { Add } from '@mui/icons-material';

const AutoConversionRecipients = () => {
	usePageTitle('Auto Conversion');
	const routerParams = useParams();
	const network = routerParams?.network;

	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const [isReload, setReload] = useState<boolean>(false);
	const [isReloading, setReloading] = useState<boolean>(false);
	const navigate = useNavigate();
	const [count, setCount] = useState<number>(1);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	const [isDisplayAddRecipient, setDisplayAddRecipient] =
		useState<boolean>(false);

	const location = useLocation();
	const query = queryString.parse(location.search);
	const authState = useAppSelector((store) => store.authState);

	const token = authState.token;

	const { isSearching, search } = useSearchConversion({
		isAutoConvert: true,
	});

	useEffect(() => {
		if (query && query.page) {
			setPage(parseInt(query.page as string));
		}
	}, [query, query.page]);

	useEffect(() => {
		setReload(true);
	}, []);

	const params = {
		limit: MAX_RECORDS,
		skip: (page - 1) * MAX_RECORDS,
		sort: '-createdAt',
		populate: 'network,user',
		networkName: network?.toUpperCase(),
	};

	const { isLoading, data, refetch } = useQuery(
		[QueryKeys.AutoConversionRecipients, page, network],
		() => getRecipients(params),
		{
			enabled: !!(token || isReload),
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			onSettled: (data, error) => {
				setReload(false);
				setReloading(false);
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
		// setReload(true);
		if (page !== 1) {
			setPage(page);
			navigate(`${LINKS.AutoConversionRecipients}?page=${page}`);
		} else {
			navigate(LINKS.AutoConversionRecipients);
			setPage(page);
		}
		refetch();
	};

	return (
		<Layout>
			{isDisplayAddRecipient && (
				<ModalWrapper
					closeModal={() => setDisplayAddRecipient(false)}
					title={`ADD ${network?.toUpperCase()}  RECIPIENT`}
				>
					<RecipientForm callback={() => setDisplayAddRecipient(false)} />
				</ModalWrapper>
			)}
			<Box style={styles.container}>
				<Box
					sx={{
						padding: { xs: '0px 15px', md: '0px 2rem' },
						marginBottom: '2rem',
					}}
				>
					<Box
						sx={{
							marginBottom: theme.spacing(4),
							display: 'flex',
							gap: '15px',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Typography sx={{ fontWeight: 'bold' }} variant={'h5'}>
							Auto Conversion Recipients
						</Typography>
						<Button
							onClick={() => setDisplayAddRecipient(true)}
							sx={{
								backgroundColor: `${SECOUNDARY_COLOR} !important`,
								color: 'white',
								display: 'flex',
								gap: '4px',
							}}
						>
							<Add /> <span>Add Recipient</span>
						</Button>
					</Box>
				</Box>
				<ErrorBoundary>
					<AutoConversionRecipientsTable
						isLoading={isLoading || isReloading || isSearching}
						data={data?.payload}
					/>

					{!search && total > MAX_RECORDS && !isReloading && (
						<Pagination
							sx={{ marginTop: '2rem', marginLeft: ['15px', '30px'] }}
							size={'large'}
							variant={'outlined'}
							shape={'rounded'}
							page={page}
							count={count}
							onChange={(e, number) => handlePageChange(number)}
						/>
					)}
				</ErrorBoundary>
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `0.5px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
});

export default AutoConversionRecipients;
