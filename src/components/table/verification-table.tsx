import React, { CSSProperties, useState } from 'react';
import Table from '@mui/material/Table';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Avatar, Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { grey } from '@mui/material/colors';
import { SUCCESS_COLOR, BOX_SHADOW } from '../../utilities/constant';
import FilterIcon from '../icons/filter';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import REFERRALS from '../../utilities/data/referrals';
import Empty from '../empty';
import Pagination from '../pagination';
import Button from '../button';
import LINKS from '../../utilities/links';

const VerificationTable = () => {
	const [data] = useState<{ [key: string]: any }[] | null>(REFERRALS);
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
					<TableHeader title={'Verification'} />
					<Box
						sx={{
							alignSelf: 'flex-end',
							display: 'flex',
							alignItems: 'center',
							gap: theme.spacing(3),
						}}
					>
						<Button
							onClick={() => navigate(LINKS.KycVerification)}
							style={styles.btnKycLimit as CSSProperties}
						>
							KYC limit
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
							<TableCell />
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography variant={'body1'}> Name</Typography>
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
									<Typography variant={'body1'}>Tier level</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography variant={'body1'}>Status</Typography>
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
						{data && data.length > 0 ? (
							data.map((row, key) => (
								<TableRow key={key}>
									<TableCell sx={{ maxWidth: '30px' }}>
										<Avatar src={row.avatar} />
									</TableCell>
									<TableCell style={styles.tableText}>{row.name}</TableCell>
									<TableCell style={styles.tableText}>{row.email}</TableCell>
									<TableCell style={styles.tableText}>{row.email}</TableCell>
									<TableCell style={styles.tableText}>
										{row.number_of_referees}
									</TableCell>
									<TableCell sx={{ maxWidth: '140px' }}>
										<Box style={styles.verifyPushWrapper}>
											<Button size={'small'} style={styles.verifyBtn}>
												Verify user
											</Button>
											<Button
												onClick={() => navigate(LINKS.PushNotification)}
												size={'small'}
												style={styles.pushBtn}
											>
												Push notify
											</Button>
										</Box>
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
					</TableBody>
				</Table>
				<Pagination
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						marginTop: theme.spacing(4),
						marginRight: '1rem',
					}}
					size={'large'}
					shape={'rounded'}
					variant={'outlined'}
				/>
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
	tableHeaderText: {
		fontWeight: '600',
	},
	tableText: {
		color: theme.palette.primary.main,
	},
	transactionItemText: {
		color: SUCCESS_COLOR,
	},
	btnKycLimit: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		backgroundColor: theme.palette.secondary.main,
		textTransform: 'uppercase',
		color: grey[50],
		// fontWeight: '600',
	},
	verifyPushWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(3),
	},
	verifyBtn: {
		color: SUCCESS_COLOR,
		border: `1px solid ${SUCCESS_COLOR}`,
	},
	pushBtn: {
		color: theme.palette.secondary.main,
		border: `1px solid ${theme.palette.secondary.main}`,
	},
});

export default VerificationTable;
