import React from 'react';
import { Select as MuiSelect, Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { ThemeModeType } from 'utilities';
import { useAppSelector } from 'store/hooks';

interface Props {
	isLoading?: boolean;
	helpertext?: string | null | undefined | false;
	[key: string]: any;
}

const Select = (props: Props) => {
	const { mode } = useAppSelector((store) => store.theme);
	return (
		<Box sx={{ width: '100%' }}>
			<MuiSelect
				{...props}
				sx={{
					...props.sx,
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: mode === ThemeModeType.dark ? grey[300] : 'initial',
					},
				}}
			>
				{props.isLoading ? (
					<Typography variant={'body1'}>Loading, please wait...</Typography>
				) : (
					props.children
				)}
			</MuiSelect>
			{props.helpertext && (
				<Typography
					sx={{ color: red[800], padding: '3px 14px 0px', fontSize: '0.75rem' }}
					variant={'body2'}
				>
					{props.helpertext}
				</Typography>
			)}
		</Box>
	);
};

export default Select;
