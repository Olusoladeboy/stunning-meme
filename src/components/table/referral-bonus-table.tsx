import React, { useState, MouseEvent } from 'react';
import {
	useTheme,
	List,
	ListItemButton,
	IconButton,
	Popper,
	Table,
	Box,
	TableHead,
	TableBody,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { MoreHoriz } from '@mui/icons-material';
import {
	SUCCESS_COLOR,
	BOX_SHADOW,
	DANGER_COLOR,
	Settings,
	formatNumberToCurrency,
} from 'utilities';
import ModalWrapper from '../modal/Wrapper';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Empty from '../empty';
import ReferralForm from '../forms/referral-bonus-form';
import CustomTableCell from './components/custom-table-cell';
import Loader from '../loader/table-loader';

interface Props {
	data: Settings[] | undefined | null;
	isLoading?: boolean;
}

const ReferralBonusTable: React.FC<Props> = ({ data, isLoading }) => {
	const [isDisplayForm, setDisplayForm] = useState<boolean>(false);

	const theme = useTheme();
	const styles = useStyles(theme);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [currentRow, setCurrentRow] = useState<null | Settings>(null);

	const handleClickAction = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(
			anchorEl && anchorEl === event.currentTarget ? null : event.currentTarget
		);
	};
	const callback = () => {
		setCurrentRow(null);
		setDisplayForm(false);
	};

	return (
		<>
			{currentRow && (
				<ModalWrapper
					hasCloseButton
					closeModal={callback}
					title={'Edit Referral'}
				>
					<ReferralForm data={currentRow} callback={callback} />
				</ModalWrapper>
			)}

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
						<CustomTableCell label={'Referral Bonus'} />
						<CustomTableCell label={'Transaction Limit'} />
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
						<Loader />
					) : (
						data && (
							<>
								{data.length > 0 ? (
									data.map((row: Settings, key: number) => (
										<TableRow key={key}>
											<TableCell
												sx={{ paddingLeft: '30px !important' }}
												style={styles.tableText}
											>
												{formatNumberToCurrency(row.value as string)}
											</TableCell>
											<TableCell style={styles.tableText}>{row.name}</TableCell>
											<TableCell>
												<Box>
													<IconButton
														onClick={(event) => handleClickAction(event)}
														size={'small'}
													>
														<MoreHoriz />
													</IconButton>
													<Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
														<List style={styles.editDeleteWrapper}>
															<ListItemButton
																onClick={() => {
																	setAnchorEl(null);
																	setCurrentRow(row);
																}}
																style={styles.editBtn}
															>
																Edit
															</ListItemButton>

															<ListItemButton style={styles.declineBtn}>
																Delete
															</ListItemButton>
														</List>
													</Popper>
												</Box>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={6}>
											<Empty text={'No Referral Bonus'} />
										</TableCell>
									</TableRow>
								)}
							</>
						)
					)}
				</TableBody>
			</Table>
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
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		color: theme.palette.secondary.main,
		textTransform: 'uppercase',
		// fontWeight: '600',
	},
	editDeleteWrapper: {
		backgroundColor: grey[50],
		boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.03)',
	},
	editBtn: {
		// minWidth: '120px',
		color: grey[600],
		paddingLeft: '30px',
		paddingRight: '30px',
	},
	declineBtn: {
		// minWidth: '120px',
		color: DANGER_COLOR,
		paddingLeft: '30px',
		paddingRight: '30px',
	},
	approveBtn: {
		color: SUCCESS_COLOR,
		paddingLeft: '30px',
		paddingRight: '30px',
	},
});

export default ReferralBonusTable;
