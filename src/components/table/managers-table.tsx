import React, { CSSProperties, useState } from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { Avatar, Typography, useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { grey } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import { SUCCESS_COLOR, BOX_SHADOW } from '../../utilities/constant';
import ModalWrapper from '../modal/Wrapper';
import FilterIcon from '../icons/filter';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import TableHeader from '../header/table-header';
import MANAGERS from '../../utilities/data/managers';
import Empty from '../empty';
import Pagination from '../pagination';
import Button from '../button';
import { ManagerTypes } from '../../utilities/types';
import AddManagerForm from '../forms/add-manager-form';
import ManagerDetails from '../manager-details';

const ManagersTable = () => {
	const [data] = useState<{ [key: string]: any }[] | null>(MANAGERS);

	const [addManager, setAddManager] = useState<ManagerTypes | null>(null);
	const [viewManager, setViewManager] = useState<{ [key: string]: any } | null>(
		null
	);

	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<>
			{addManager && (
				<ModalWrapper
					close={() => setAddManager(null)}
					title={
						<Typography variant={'h5'} sx={{ textTransform: 'uppercase' }}>
							Add {addManager}
						</Typography>
					}
				>
					<AddManagerForm type={addManager} />
				</ModalWrapper>
			)}
			{viewManager && (
				<ModalWrapper close={() => setViewManager(null)} title={'View manager'}>
					<ManagerDetails details={viewManager} />
				</ModalWrapper>
			)}
			<Box style={styles.container} sx={{ overflow: 'auto' }}>
				<Box
					style={styles.tableHeader as CSSProperties}
					sx={{ padding: '0px 1rem' }}
				>
					<TableHeader title={'Managers'} />
					<Box
						sx={{
							alignSelf: 'flex-end',
							display: 'flex',
							alignItems: 'center',
							gap: theme.spacing(3),
						}}
					>
						<Button
							onClick={() => setAddManager(ManagerTypes.Admin)}
							startIcon={<AddCircle />}
							style={styles.btnOutline as CSSProperties}
						>
							Add admin
						</Button>
						<Button
							onClick={() => setAddManager(ManagerTypes.Manager)}
							startIcon={<AddCircle />}
							style={styles.btnOutline as CSSProperties}
						>
							Add manager
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
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Name
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Email
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Phone no.
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										Date
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
							<TableCell>
								<Box style={styles.filterWrapper}>
									<Typography style={styles.tableHeaderText} variant={'body1'}>
										User
									</Typography>
									<FilterIcon />
								</Box>
							</TableCell>
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
							data.map((data, key) => (
								<TableRow onClick={() => setViewManager(data)} key={key}>
									<TableCell sx={{ maxWidth: '30px' }}>
										<Avatar src={data.avatar} />
									</TableCell>
									<TableCell style={styles.tableText}>{data.name}</TableCell>
									<TableCell style={styles.tableText}>{data.email}</TableCell>
									<TableCell style={styles.tableText}>
										{data.phone_number}
									</TableCell>
									<TableCell style={styles.tableText}>{data.date}</TableCell>

									<TableCell style={styles.tableText}>{data.user}</TableCell>
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
	btnOutline: {
		border: `1px solid ${theme.palette.secondary.main}`,
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		color: theme.palette.secondary.main,
		textTransform: 'uppercase',
		// fontWeight: '600',
	},
});

export default ManagersTable;
