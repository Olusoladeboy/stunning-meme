import React, { CSSProperties, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { LIGHT_GRAY, BOX_SHADOW } from 'utilities';
import {
	StyledTableCell as TableCell,
	StyledTableRow as TableRow,
} from './components';
import { grey } from '@mui/material/colors';

import Empty from '../empty';
import TableLoader from '../loader/table-loader';
import NetworkForm from '../forms/network-form';
import Modal from '../modal/Wrapper';
import Loader from '../loader';
import { useAlert, useHandleError } from 'hooks';
import { networks, updateNetwork } from 'api';

const AutoConversionTaskTable = () => {
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);

	const data = [];

	return (
		<>
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
							<TableCell>Reference</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Response</TableCell>

							{/* <TableCell sx={{ minWidth: '50px', maxWidth: '100px' }} /> */}
						</TableRow>
					</TableHead>
					<TableBody
						sx={{
							'& tr': {
								color: theme.palette.primary.main,
							},
						}}
					></TableBody>
				</Table>
			</Box>
		</>
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

export default AutoConversionTaskTable;
