import { CSSProperties, useState } from 'react';
import moment from 'moment';
import { BOX_SHADOW, IBlacklistedNumber, QueryKeys } from 'utilities';
import AppTable from './components/table';
import TransactionDetailsModal from 'components/modal/transaction-details-modal';
import { deleteBlacklistedNumber } from 'api';
import { useHandleError } from 'hooks';
import { useMutation, useQueryClient } from 'react-query';
import Loader from 'components/loader';
import { Box, Typography, useTheme } from '@mui/material';
import Button from 'components/button';
import { grey, red } from '@mui/material/colors';
import useToastAlert from 'hooks/useToastAlert';
import { useAppSelector } from 'store/hooks';
import TableHeader from 'components/header/table-header';
import ModalWrapper from 'components/modal/Wrapper';
import BlacklistNumberForm from 'components/forms/blacklist-number-form';

interface Props {
	data: IBlacklistedNumber[] | null;
	isLoading?: boolean;
	reloadTransactions?: () => void;
	transactionType?: string;
	search?: (value: string) => void;
	clearSearch?: () => void;
}

const BlacklistedNumbersTable = ({
	data,
	isLoading,
	reloadTransactions,
	transactionType,
	search,
	clearSearch,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const handleError = useHandleError();
	const alert = useToastAlert();

	const queryClient = useQueryClient();

	const isSupperAdmin = useAppSelector(
		(store) => store.authState.isSupperAdmin,
	);
	const [selectedBlacklistedNumber, setSelectedBlacklistedNumber] =
		useState<null | IBlacklistedNumber>(null);

	const [isDisplayBlacklistNumberModal, setDisplayBlacklistModal] =
		useState<boolean>(false);

	const { isLoading: isUpdatingTransaction, mutate: mutateDelete } =
		useMutation(deleteBlacklistedNumber, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}

				if (data && data?.success) {
					queryClient.invalidateQueries({
						queryKey: [QueryKeys.BlacklistedNumbers],
					});
					alert({
						message:
							data?.message || 'Blacklisted number removed successfully!',
						type: 'success',
					});
				}
			},
		});

	const onDelete = (id: string) => {
		if (!isSupperAdmin) {
			alert({
				message: 'You are not authorized to perform this action',
				type: 'error',
			});
			return;
		}
		mutateDelete(id);
	};

	return (
		<>
			{isUpdatingTransaction && <Loader />}

			{isDisplayBlacklistNumberModal && (
				<ModalWrapper
					sx={{ maxWidth: '760px' }}
					hasCloseButton
					closeModal={() => setDisplayBlacklistModal(false)}
				>
					<Typography
						sx={{ marginBottom: '2rem', fontSize: ['24px', '28px'] }}
						variant={'h4'}
					>
						Blacklist Number
					</Typography>
					<BlacklistNumberForm
						callback={() => setDisplayBlacklistModal(false)}
					/>
				</ModalWrapper>
			)}

			{selectedBlacklistedNumber && (
				<TransactionDetailsModal
					closeModal={() => setSelectedBlacklistedNumber(null)}
					transaction={selectedBlacklistedNumber as any}
					isDisplayButtons
				/>
			)}
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<TableHeader
						title={'Blacklisted Numbers'}
						placeholder='Search by phone..'
						handleSearch={search}
						clearSearch={clearSearch}
					>
						<Box>
							<Button
								onClick={() => setDisplayBlacklistModal(true)}
								size='large'
								sx={{
									textWrap: 'nowrap',
									backgroundColor: `${theme.palette.secondary.main} !important`,
									color: 'white',
								}}
							>
								Blacklist Number
							</Button>
						</Box>
					</TableHeader>
					<AppTable
						canClickRow
						numberOfColumns={5}
						isLoading={isLoading}
						header={[
							'Phone Number',
							'Reason',
							'Created At',
							'Status',
							'Action',
						]}
						emptyText='No available blacklisted number'
						body={
							data &&
							data.map((value) => {
								return {
									data: [
										value.phone_number,
										value?.reason,
										moment(value.createdAt).format('ll'),
										value.isActive ? 'Active' : 'Non-active',
										<Box sx={{ display: 'flex', gap: '10px' }}>
											<Button
												onClick={(e) => {
													e.stopPropagation();
													onDelete(value.id);
												}}
												sx={{
													backgroundColor: `${red['600']} !important`,
													color: 'white',
												}}
											>
												Remove
											</Button>
										</Box>,
									],
								};
							})
						}
					/>
				</Box>
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'grid',
		gridTemplateColumn: '1fr',
		gap: theme.spacing(4),
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	tableHeader: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(3),
	},
});

export default BlacklistedNumbersTable;
