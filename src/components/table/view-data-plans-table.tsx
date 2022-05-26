import React, { CSSProperties, MouseEvent, useState } from 'react';
import Table from '@mui/material/Table';
import {
	Box,
	IconButton,
	Typography,
	Popper,
	ClickAwayListener,
	List,
	ListItemButton,
	TableBody,
	TableCell,
	TableHead,
	useTheme,
	styled,
	TableRow,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { MoreHoriz } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import {
	BOX_SHADOW,
	DANGER_COLOR,
	LIGHT_GRAY,
	SUCCESS_COLOR,
} from '../../utilities/constant';
import FilterIcon from '../icons/filter';
import TableHeader from '../header/table-header';
import DataPlanForm from '../forms/data-plan-form';
import ModalWrapper from '../modal/Wrapper';
import RegularAlert from '../modal/regular-modal';

type Props = {
	data: {
		[key: string]: any;
	}[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// backgroundColor: LIGHT_GRAY,
		backgroundSize: 'cover',
		'& p': {
			fontWeight: '600',
		},

		backgroundPosition: 'top-left',
		fontSize: '14px',
		color: theme.palette.primary.main,
		fontWeight: '600',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: '14px',
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	color: theme.palette.primary.main,
	'&:nth-of-type(odd)': {
		backgroundColor: '#FDF8F1',
	},
	'&:nth-of-type(even)': {
		backgroundColor: grey[50],
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const ViewDataPlansTable = ({ data }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const [alert, setAlert] = useState<{ [key: string]: any } | null>(null);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [currentRow, setCurrentRow] = useState<null | { [key: string]: any }>(
		null
	);

	const handleClickAction = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(
			anchorEl && anchorEl === event.currentTarget ? null : event.currentTarget
		);
	};

	const handleDelete = (data: { [key: string]: any }) => {
		setAlert({
			title: `Delete ${data.plan_name}`,
			btnText: 'Delete plan',
			message: `Are you sure you want to delete ${data.plan_name}`,
			alertType: 'failed',
		});
	};

	return (
		<>
			{currentRow && (
				<ModalWrapper
					close={() => setCurrentRow(null)}
					title={'EDIT DATA PLAN'}
				>
					<DataPlanForm data={currentRow} />
				</ModalWrapper>
			)}
			{alert && (
				<RegularAlert
					close={() => setAlert(null)}
					width={'480px'}
					title={alert.title}
					btnText={alert.btnText}
					message={alert.message}
					alertType={alert.alertType}
				/>
			)}
			<ClickAwayListener onClickAway={() => setAnchorEl(null)}>
				<Box
					style={styles.container as CSSProperties}
					sx={{ overflow: 'auto' }}
				>
					<TableHeader style={styles.tableHeader} />
					<Table sx={{ overflow: 'auto' }} stickyHeader>
						<TableHead
							sx={{
								'& tr': {
									backgroundColor: LIGHT_GRAY,
									color: theme.palette.primary.main,
								},
							}}
						>
							<TableRow>
								<StyledTableCell sx={{ paddingLeft: '40px' }}>
									<Box style={styles.filterWrapper}>
										<Typography>Plan name</Typography>
										<FilterIcon />
									</Box>
								</StyledTableCell>
								<StyledTableCell>
									<Box style={styles.filterWrapper}>
										<Typography>Amount</Typography>
										<FilterIcon />
									</Box>
								</StyledTableCell>
								<StyledTableCell>
									<Box style={styles.filterWrapper}>
										<Typography>Code</Typography>
										<FilterIcon />
									</Box>
								</StyledTableCell>
								<StyledTableCell>
									<Box style={styles.filterWrapper}>
										<Typography>Shortcode</Typography>
										<FilterIcon />
									</Box>
								</StyledTableCell>

								<StyledTableCell>
									<Box style={styles.filterWrapper}>
										<Typography>Shortcode sms</Typography>
										<FilterIcon />
									</Box>
								</StyledTableCell>
								<StyledTableCell sx={{ paddingRight: '40px' }}>
									Action
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody
							sx={{
								'& tr': {
									color: theme.palette.primary.main,
								},
							}}
						>
							{data.map((row, key) => (
								<StyledTableRow key={key}>
									<StyledTableCell
										sx={{ paddingLeft: '40px' }}
										style={styles.text}
									>
										{row.plan_name}
									</StyledTableCell>
									<StyledTableCell style={styles.text}>
										{row.amount}
									</StyledTableCell>
									<StyledTableCell style={styles.text}>
										{row.code}
									</StyledTableCell>
									<StyledTableCell style={styles.text}>
										{row.shortcode}
									</StyledTableCell>
									<StyledTableCell style={styles.text}>
										{row.shortcode_sms}
									</StyledTableCell>

									<StyledTableCell sx={{ paddingRight: '40px' }}>
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
													<ListItemButton
														onClick={() => {
															setAnchorEl(null);
															handleDelete(row);
														}}
														style={styles.deleteBtn}
													>
														Delete
													</ListItemButton>
												</List>
											</Popper>
										</Box>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</ClickAwayListener>
		</>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	tableHeader: {
		padding: '0px 32px',
		marginBottom: theme.spacing(3),
	},
	headerText: {
		fontWeight: '600',
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	text: {
		color: theme.palette.primary.main,
	},
	link: {
		color: theme.palette.secondary.main,
	},
	editDeleteWrapper: {
		backgroundColor: grey[50],
		boxShadow: BOX_SHADOW,
	},
	editBtn: {
		// minWidth: '120px',
		color: SUCCESS_COLOR,
		paddingLeft: '40px',
		paddingRight: '40px',
	},
	deleteBtn: {
		// minWidth: '120px',
		color: DANGER_COLOR,
		paddingLeft: '40px',
		paddingRight: '40px',
	},
});

export default ViewDataPlansTable;
