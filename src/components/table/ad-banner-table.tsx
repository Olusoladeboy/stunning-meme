import React, { CSSProperties, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
	Table,
	TableHead,
	TableBody,
	Avatar,
	Typography,
	useTheme,
	Box,
	styled,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import moment from 'moment';
import { SUCCESS_COLOR, BOX_SHADOW, IAdBanner, QueryKeys } from 'utilities';
import ModalWrapper from '../modal/Wrapper';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Empty from '../empty';
import Button from '../button';
import AdBannerForm from '../forms/ad-banner-form';
import TableLoader from '../loader/table-loader';
import CustomTableCell from './components/custom-table-cell';
import { deleteBanner, updateBanner } from 'api';
import { useHandleError, useAlert } from 'hooks';
import Loader from 'components/loader';

type Props = {
	data: IAdBanner[] | null | undefined;
	isLoading: boolean;
};

const AdBannerTable = ({ data, isLoading }: Props) => {
	const queryClient = useQueryClient();
	const handleError = useHandleError();
	const alert = useAlert();
	const theme = useTheme();
	const styles = useStyles(theme);

	const [selectedBanner, setSelectedBanner] = useState<IAdBanner | null>(null);
	const [isViewBanner, setViewBanner] = useState<boolean>(false);

	const [isDisplayForm, setDisplayForm] = useState<boolean>(false);

	const handleViewBanner = (data: IAdBanner) => {
		setSelectedBanner(data);
		setViewBanner(true);
	};

	const closeModal = () => {
		setSelectedBanner(null);
		setDisplayForm(false);
		setViewBanner(false);
	};

	// Delete Mutation
	const { isLoading: isDeleting, mutate: handleMutateDelete } = useMutation(
		deleteBanner,
		{
			onSuccess: () => {
				queryClient.invalidateQueries([QueryKeys.AdBanner]);
			},
			onError: (error) => {
				const errorResponse = handleError({ error });
				if (errorResponse && errorResponse.message)
					alert({ message: errorResponse.message, type: 'error' });
			},
		}
	);

	// Update Ad-banner
	const { isLoading: isUpdating, mutate: handleMutateUpdate } = useMutation(
		updateBanner,
		{
			onError: (error) => {
				const errorResponse = handleError({ error });
				if (errorResponse?.message)
					alert({ message: errorResponse.message, type: 'error' });
			},
			onSuccess: (data) => {
				queryClient.invalidateQueries([QueryKeys.AdBanner]);
			},
		}
	);

	const handleUpdataBanner = (adBanner: IAdBanner) => {
		const isActive = !adBanner.isActive;
		handleMutateUpdate({
			id: adBanner?.id,
			payload: {
				isActive,
			},
		});
	};

	return (
		<>
			{(isDeleting || isUpdating) && <Loader />}
			{isDisplayForm && (
				<ModalWrapper
					title={'Create Banner'}
					hasCloseButton
					closeModal={closeModal}
				>
					<AdBannerForm adBanner={selectedBanner} callback={closeModal} />
				</ModalWrapper>
			)}
			{selectedBanner && isViewBanner && (
				<ModalWrapper hasCloseButton closeModal={closeModal} title={'Banner'}>
					<Box
						sx={{
							marginBottom: '20px',
							img: {
								width: '100%',
							},
						}}
					>
						<img src={selectedBanner.imageUrl} alt={selectedBanner?.url} />
					</Box>
					<Typography>
						URL: <span>{selectedBanner.url}</span>
					</Typography>
				</ModalWrapper>
			)}
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<Typography sx={{ fontWeight: 'bold' }} variant='h5'>
						Ad Banners
					</Typography>

					<Button
						onClick={() => setDisplayForm(true)}
						startIcon={<AddCircle />}
						style={styles.btnOutline as CSSProperties}
					>
						Add Banner
					</Button>
				</Box>

				<Table sx={{ overflow: 'auto' }}>
					<TableHead
						sx={{
							'& tr': {
								backgroundColor: `${grey[50]} !important`,
								color: theme.palette.primary.main,
							},
						}}
					>
						<TableRow>
							<CustomTableCell label={'Image'} />
							<CustomTableCell label={'Url'} />
							<CustomTableCell label={'Service'} />
							<CustomTableCell label={'Status'} />
							<CustomTableCell label={'Created'} />
							<CustomTableCell label={'Actions'} />
						</TableRow>
					</TableHead>
					<TableBody
						sx={{
							'& tr': {
								color: theme.palette.primary.main,
							},
						}}
					>
						{isLoading ? (
							<TableLoader colSpan={6} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((data) => (
											<TableRow
												onClick={() => handleViewBanner(data)}
												key={data.id}
											>
												<TableCell style={styles.tableText}>
													<Avatar src={data.imageUrl as string} />
												</TableCell>

												<TableCell style={styles.tableText}>
													{data.url}
												</TableCell>

												<TableCell style={styles.tableText}>
													{data.service}
												</TableCell>

												<TableCell style={styles.tableText}>
													{moment.utc(data.createdAt).format('l')}
												</TableCell>

												<TableCell style={styles.tableText}>
													{data?.isActive ? 'Active' : 'No Active'}
												</TableCell>
												<TableCell sx={{ display: 'flex', gap: '15px' }}>
													<CustomButton
														onClick={(e) => {
															e.stopPropagation();
															handleUpdataBanner(data);
														}}
														bgColor={theme.palette.primary.main}
													>
														{data.isActive ? 'Deactivate' : 'Activate'}
													</CustomButton>
													<CustomButton
														onClick={(e) => {
															e.stopPropagation();
															setSelectedBanner(data);
															setDisplayForm(true);
														}}
														bgColor={theme.palette.primary.main}
													>
														Edit
													</CustomButton>
													<CustomButton
														onClick={(e) => {
															e.stopPropagation();
															handleMutateDelete(data.id);
														}}
														sx={{ color: red['600'] }}
														bgColor={red['600']}
													>
														Delete
													</CustomButton>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={6}>
												<Empty text={'No ad-banner(s)'} />
											</TableCell>
										</TableRow>
									)}
								</>
							)
						)}
					</TableBody>
				</Table>
				{/* 	<Pagination
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						marginTop: theme.spacing(4),
						marginRight: '1rem',
					}}
					size={'large'}
					shape={'rounded'}
					variant={'outlined'}
				/> */}
			</Box>
		</>
	);
};

const CustomButton = styled(Button)<{
	bgColor?: string;
}>(({ theme, bgColor, color }) => ({
	border: `1px solid ${bgColor || theme.palette.primary.main}`,
	padding: '6px 15px',
}));

const useStyles = (theme: any) => ({
	container: {
		display: 'grid',
		gridTemplateColumn: '1fr',
		gap: theme.spacing(4),
		border: `0.5px solid ${theme.palette.secondary.main}`,
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
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: theme.spacing(3),
	},
	tableHeaderText: {
		fontWeight: '600',
	},
	tableText: {
		color: theme.palette.primary.main,
	},
	transactionItemText: {
		color: SUCCESS_COLOR,
	},
	btnOutline: {
		border: `1px solid ${theme.palette.secondary.main}`,
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		color: theme.palette.secondary.main,
		textTransform: 'uppercase',
		// fontWeight: '600',
	},
});

export default AdBannerTable;
