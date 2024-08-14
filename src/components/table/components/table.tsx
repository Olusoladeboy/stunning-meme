import React from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '.';
import { ErrorBoundaryGuard, Transaction, LIGHT_GRAY } from 'utilities';
import Loader from '../../loader/table-loader';
import TableEmpty from '../../empty/table-empty';
import { useAppSelector } from 'store/hooks';

interface IAppTable {
	header: string[];
	body: { data: any[]; rawData: Transaction }[] | null;
	isLoading?: boolean;
	numberOfColumns: number;
	emptyText?: string;
	canClickRow?: boolean;
	onRowClick?: (value: Transaction) => void;
}

const AppTable = ({
	header,
	body,
	isLoading,
	numberOfColumns,
	emptyText = 'No transactions',
	canClickRow,
	onRowClick,
}: IAppTable) => {
	const { mode } = useAppSelector((store) => store.theme);

	const handleRowClick = (value: Transaction) => {
		if (typeof onRowClick === 'function') onRowClick(value);
	};
	return (
		<Table sx={{ overflow: 'auto' }} stickyHeader>
			<TableHead
				sx={{
					'& tr': {
						backgroundColor: LIGHT_GRAY,
					},
				}}
			>
				<StyledTableRow>
					{header &&
						Array.isArray(header) &&
						header.length > 0 &&
						header.map((value, key) => (
							<StyledTableCell key={key}>{value}</StyledTableCell>
						))}
				</StyledTableRow>
			</TableHead>
			<ErrorBoundaryGuard>
				<TableBody>
					{isLoading ? (
						<Loader colSpan={numberOfColumns} />
					) : (
						body && (
							<>
								{Array.isArray(body) && body.length > 0 ? (
									body.map((value, key) => (
										<StyledTableRow
											key={key}
											onClick={() => handleRowClick(body[key].rawData)}
											sx={{
												cursor: canClickRow ? 'pointer' : undefined,
											}}
										>
											{value.data.map((v, i) => (
												<StyledTableCell key={`key-${i}`}>{v}</StyledTableCell>
											))}
										</StyledTableRow>
									))
								) : (
									<TableEmpty colSpan={numberOfColumns} text={emptyText} />
								)}
							</>
						)
					)}
				</TableBody>
			</ErrorBoundaryGuard>
		</Table>
	);
};

export default AppTable;
