import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Avatar,
	Typography,
	useTheme,
	Table,
	Box,
	TableBody,
	TableHead,
} from '@mui/material';

import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import { SUCCESS_COLOR, LINKS } from '../../utilities';
import FilterIcon from '../icons/filter';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import Empty from '../empty';
import Button from '../button';
import { IReferral } from '../../utilities';
import TableLoader from '../loader/table-loader';

interface Props {
	data: IReferral[] | null;
	isLoading: boolean;
}

const ReferralTableWithAvatar: React.FC<Props> = ({ data, isLoading }) => {
	const navigate = useNavigate();

	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<>
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<TableHeader title={'Referrals'} />
					<Box
						sx={{
							alignSelf: 'flex-end',
							display: 'flex',
							alignItems: 'center',
							gap: theme.spacing(3),
						}}
					>
						<Button
							onClick={() => navigate(LINKS.AllReferrals)}
							startIcon={<AddCircle />}
							style={styles.btnViewReferrals as CSSProperties}
						>
							View Referrals Bonus
						</Button>
					</Box>
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
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography variant={'body1'}>Referral Name</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography variant={'body1'}>Email</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography variant={'body1'}>No. of Referres</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>Action</TableCell>
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
							<TableLoader colSpan={5} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((row: IReferral, key) => (
											<TableRow key={row.id}>
												<TableCell style={styles.tableText}>
													<Box
														sx={{
															display: 'flex',
															gap: '10px',
															alignItems: 'center',
														}}
													>
														<Avatar src={row.referredBy.photoUrl as string} />
														<span>
															{row.referredBy.firstname}
															{row.referredBy.lastname}
														</span>
													</Box>
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.referredBy.email}
												</TableCell>
												<TableCell style={styles.tableText}>
													{/* {row.number_of_referees} */}
												</TableCell>
												<TableCell
													onClick={() => navigate(`${LINKS.Referee}/${row.id}`)}
													style={styles.viewReferess}
												>
													view referees
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={6}>
												<Empty text={'No users'} />
											</TableCell>
										</TableRow>
									)}
								</>
							)
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
	btnViewReferrals: {
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		backgroundColor: theme.palette.secondary.main,
		textTransform: 'uppercase',
		color: grey[50],
		// fontWeight: '600',
	},
	viewReferess: {
		color: SUCCESS_COLOR,
		cursor: 'pointer',
	},
});

export default ReferralTableWithAvatar;
