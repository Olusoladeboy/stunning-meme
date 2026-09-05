import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
	Avatar,
	useTheme,
	TableBody,
	TableHead,
	Table,
	Box,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import {
	IBusiness,
	SUCCESS_COLOR,
	BOX_SHADOW,
	LINKS,
	QueryKeys,
} from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import TableLoader from '../loader/table-loader';
import CustomTableCell from './components/custom-table-cell';
import Button from 'components/button';
import { useMutation, useQueryClient } from 'react-query';
import { deleteBusiness } from 'api';
import Loader from 'components/loader';
import { useAlert, useHandleError } from 'hooks';
import UpdateBusinessStatusForm from 'components/forms/update-business-status-form';
import ModalWrapper from 'components/modal/Wrapper';

type Props = {
	isLoading?: boolean;
	businesses?: IBusiness[] | null;
	changeUserType?: (type?: string) => void;
	currentTab?: string;
	searchUser?: (value: string) => void;
	clearSearch?: () => void;
	isDisplayTab?: boolean;
	changeSearchDeletedUser?: (state: boolean) => void;
};

const BusinessTable = ({
	isLoading,
	businesses = null,
	searchUser,
	clearSearch,
}: Props) => {
	const handleError = useHandleError();
	const alert = useAlert();
	const navigate = useNavigate();
	const theme = useTheme();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();

	const [selectedBusiness, setSelectedBusiness] = useState<IBusiness | null>(
		null
	);
	const [isDisplayEditModal, setDisplayEditModal] = useState<boolean>(false);

	const handleClickRow = (business: IBusiness) => {
		navigate(`${LINKS.Business}/${business.id}`);
	};

	// Handle Delete Business
	const { isLoading: isDeletingBusiness, mutate: mutateDeleteBusiness } =
		useMutation(deleteBusiness, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });

					return;
				}

				queryClient.invalidateQueries([QueryKeys.Businesses]);
			},
		});

	const handleDeleteBusiness = (id: string) => {
		mutateDeleteBusiness(id);
	};

	const closeModal = () => {
		setDisplayEditModal(false);
		setSelectedBusiness(null);
	};

	return (
		<>
			{Boolean(isDisplayEditModal && selectedBusiness) && (
				<ModalWrapper title={'Update Business'} closeModal={closeModal}>
					<UpdateBusinessStatusForm
						callback={closeModal}
						formData={selectedBusiness as IBusiness}
					/>
				</ModalWrapper>
			)}
			{isDeletingBusiness && <Loader />}
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<TableHeader
					placeholder={'Search business with email/phone'}
					sx={{ padding: '0px 1rem' }}
					title={'Business'}
					handleSearch={searchUser}
					clearSearch={clearSearch}
				/>

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
							<CustomTableCell label={'Business Name'} isSortable />
							<CustomTableCell label={'Email'} isSortable />
							<CustomTableCell label={'Phone Number'} isSortable />
							<CustomTableCell label={'Date'} />
							<CustomTableCell label={'Status'} />
							<CustomTableCell label={'Action'} />
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
						) : businesses && businesses.length > 0 ? (
							businesses.map((business: IBusiness, key: number) => (
								<TableRow
									onClick={(e) => {
										e.stopPropagation();
										handleClickRow(business);
									}}
									key={key}
								>
									<TableCell style={styles.tableText}>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: '10px',
											}}
										>
											{/* <Avatar src={user.photoUrl as string} /> */}
											<span>{business.businessName}</span>
										</Box>
									</TableCell>
									<TableCell style={styles.tableText}>
										{typeof business.businessOwner === 'object' &&
											business.businessOwner.email}
									</TableCell>
									<TableCell style={styles.tableText}>
										{typeof business.businessOwner === 'object' &&
											business.businessOwner?.phone}
									</TableCell>
									<TableCell style={styles.tableText}>
										{moment(business.createdAt).format('l')}
									</TableCell>

									<TableCell
										sx={{
											textTransform: 'uppercase',
											fontWeight: '600',
											// color: user.verified
											// 	? SUCCESS_COLOR
											// 	: user.verified === false
											// 	? DANGER_COLOR
											// 	: user.suspended
											// 	? grey[800]
											// 	: grey[500],
										}}
									>
										{business.status}
									</TableCell>
									<TableCell
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: '5px',
										}}
									>
										<Button
											onClick={(e) => {
												e.stopPropagation();
												setDisplayEditModal(true);
												setSelectedBusiness(business);
											}}
											style={styles.updateButton}
										>
											Update
										</Button>
										<Button
											onClick={(e) => {
												e.stopPropagation();
												handleDeleteBusiness(business.id);
											}}
											style={styles.deleteButton}
										>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={6}>
									<Empty text={'No available business'} />
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
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
	tableHeaderText: {
		fontWeight: '600',
	},
	tableText: {
		color: theme.palette.primary.main,
	},
	transactionItemText: {
		color: SUCCESS_COLOR,
	},
	deleteButton: {
		backgroundColor: red['600'],
		color: 'white',
		borderColor: red['600'],
		minWidth: '120px',
	},
	updateButton: {
		backgroundColor: theme.palette.secondary.main,
		color: 'white',
		borderColor: theme.palette.secondary.main,
		minWidth: '120px',
	},
});

export default BusinessTable;
