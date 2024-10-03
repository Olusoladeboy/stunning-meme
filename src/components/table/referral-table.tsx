import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Avatar,
	useTheme,
	Table,
	Box,
	TableBody,
	TableHead,
} from '@mui/material';

import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import {
	SUCCESS_COLOR,
	LINKS,
	IReferral,
	extractUserName,
	User,
	formatNumberToCurrency,
} from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import Empty from '../empty';
import Button from '../button';
import TableLoader from '../loader/table-loader';
import CustomTableCell from './components/custom-table-cell';

interface Props {
	data: IReferral[] | null;
	isLoading: boolean;
}

const ReferralTable: React.FC<Props> = ({ data, isLoading }) => {
	const navigate = useNavigate();

	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<>
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					sx={{
						justifySelf: 'flex-end',
						padding: { xs: '0px 15px', md: '0px 30px' },
					}}
				>
					<Button
						onClick={() => navigate(LINKS.ReferralsBonus)}
						startIcon={<AddCircle />}
						style={styles.btnViewReferrals as CSSProperties}
					>
						View Referral Bonus
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
							<CustomTableCell label={'Referral Name'} />
							<CustomTableCell label={'Email'} />
							<CustomTableCell label={'No. of Referees'} />
							<CustomTableCell label={'Bonus'} />
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
							<TableLoader colSpan={5} />
						) : (
							data && (
								<>
									{data.length > 0 ? (
										data.map((row: IReferral) => (
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
															{extractUserName(row.referredBy as User)}
														</span>
													</Box>
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.referredBy.email}
												</TableCell>
												<TableCell style={styles.tableText}>
													{row.no_of_referees || 0}
												</TableCell>
												<TableCell style={styles.tableText}>
													{formatNumberToCurrency(row.bonus || 0)}
												</TableCell>
												<TableCell
													onClick={() =>
														navigate(
															LINKS.Referees(row.referredBy.email as string)
														)
													}
													style={styles.viewReferess}
												>
													view referees
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={5}>
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

export default ReferralTable;
