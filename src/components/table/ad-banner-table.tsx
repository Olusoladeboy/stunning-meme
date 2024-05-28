import React, { CSSProperties, useState } from 'react';
import {
	Table,
	TableHead,
	TableBody,
	Avatar,
	Typography,
	useTheme,
	Box,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import moment from 'moment';
import { SUCCESS_COLOR, BOX_SHADOW, IAdBanner } from 'utilities';
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

type Props = {
	data: IAdBanner[] | null | undefined;
	isLoading: boolean;
};

const AdBannerTable = ({ data, isLoading }: Props) => {
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
	};

	return (
		<>
			{isDisplayForm && (
				<ModalWrapper
					title={'Create Banner'}
					hasCloseButton
					closeModal={closeModal}
				>
					<AdBannerForm callback={closeModal} />
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
							<TableLoader colSpan={4} />
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
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={5}>
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
