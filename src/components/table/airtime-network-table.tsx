import React, { CSSProperties } from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
	LIGHT_GRAY,
	BOX_SHADOW,
	SUCCESS_COLOR,
	DANGER_COLOR,
} from '../../utilities/constant';
import { grey } from '@mui/material/colors';
import Image from '../image';
import Button from '../button';
import { NetworkStatusTypes } from '../../utilities/types';

type Props = {
	data: {
		[key: string]: any;
	}[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// backgroundColor: LIGHT_GRAY,
		backgroundSize: 'cover',

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

const AirtimeNetworkTable = ({ data }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box sx={{ overflow: 'auto' }}>
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
						<StyledTableCell>Network Name</StyledTableCell>
						<StyledTableCell>USSD code</StyledTableCell>
						<StyledTableCell>Actions</StyledTableCell>
						<StyledTableCell sx={{ minWidth: '50px', maxWidth: '100px' }} />
					</TableRow>
				</TableHead>
				<TableBody
					sx={{
						'& tr': {
							color: theme.palette.primary.main,
						},
					}}
				>
					{data.map((data, key) => (
						<StyledTableRow key={key}>
							<StyledTableCell>{data.name}</StyledTableCell>
							<StyledTableCell>{data.code}</StyledTableCell>
							<StyledTableCell>
								<Box style={styles.editNetwork as CSSProperties}>
									Edit network{' '}
									<Image
										sx={{
											width: '15px',
											img: { width: '100%' },
											display: 'flex',
											alignItems: 'center',
										}}
										src={require('../../assets/icons/edit.png')}
										alt={'edit'}
									/>
								</Box>
							</StyledTableCell>
							<StyledTableCell sx={{ maxWidth: '200px' }}>
								<Box
									sx={{
										button: {
											minWidth: '120px',
											color: grey[50],
											backgroundColor: grey[400],
											textTransform: 'uppercase',
										},
									}}
									style={styles.statusBtnWrapper}
								>
									<Button
										style={{
											backgroundColor:
												data.status === NetworkStatusTypes.ENABLE
													? SUCCESS_COLOR
													: grey[400],
										}}
									>
										Enable
									</Button>
									<Button
										style={{
											backgroundColor:
												data.status === NetworkStatusTypes.DISABLE
													? DANGER_COLOR
													: grey[400],
										}}
									>
										Disable
									</Button>
								</Box>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	filterWrapper: {
		display: 'flex',
		gap: '10px',
		alignItems: 'center',
	},
	editNetwork: {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		cursor: 'pointer',
		userSelect: 'none',
	},
	statusBtnWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(4),
	},
});

export default AirtimeNetworkTable;
