import React, { ReactNode } from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import BackButton from '../back-button';
import SearchInput from '../form-components/search-input';
import { AuditFilter, AuditLog } from 'utilities';

interface Props extends BoxProps {
	title?: any;
	hideTitle?: boolean;
	isDisplayBackButton?: boolean;
	backButtonText?: string;
	isDisplayFilter?: boolean;
	searchPlaceholder?: string;
	handleSearch?: (value: string) => void;
	clearSearch?: () => void;
	statusFilter?: ReactNode;
	deletedCheckbox?: ReactNode;
	children?: ReactNode;
	canFilter?: boolean;
	canSearch?: boolean;
	auditData?: AuditLog[] | undefined | null;
	handleAuditFilter?: (criteria: AuditFilter) => void;
	placeholder?: string;
	searchInputSize?: 'small' | 'medium';
}

const TableHeader = ({
	title,
	sx,
	isDisplayBackButton,
	searchPlaceholder = 'Search...',
	backButtonText,
	handleSearch,
	clearSearch,
	statusFilter,
	style,
	deletedCheckbox,
	canFilter,
	auditData,
	handleAuditFilter,
	canSearch = true,
	children,
	searchInputSize,
	...rest
}: Props) => {
	return (
		<Box
			style={style}
			sx={{
				display: 'flex',
				alignItems: { sm: 'center' },
				flexDirection: {
					xs: 'column',
					sm: 'row',
				},
				gap: '20px',
				justifyContent:
					title || isDisplayBackButton ? 'space-between' : 'flex-end',
				// padding: '10px 0px',
				...sx,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
				{isDisplayBackButton && <BackButton text={backButtonText} />}
				{title && typeof title === 'string' ? (
					<Typography sx={{ fontWeight: '600' }} variant={'h5'}>
						{title}
					</Typography>
				) : (
					title
				)}
			</Box>

			<Box
				sx={{
					display: 'flex',
					gap: '20px',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						gap: '15px',
						alignItems: 'center',
					}}
				>
					{statusFilter}
					{deletedCheckbox}
					{children}
					{canSearch && (
						<SearchInput
							fullWidth
							sx={{ maxWidth: ['100%', '320px'], minWidth: ['100%', '300px'] }}
							placeholder={rest.placeholder || searchPlaceholder}
							handleSearch={handleSearch}
							clearSearch={clearSearch}
							size={searchInputSize}
						/>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default TableHeader;
