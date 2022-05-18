import React from 'react';
import {
	Select as MuiSelect,
	BoxProps,
	Typography,
	Box,
	SelectProps,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { FilterAlt } from '@mui/icons-material';
import { ThemeModeType } from '../../utilities/types';
import { useAppSelector } from '../../store/hooks';

interface Props extends BoxProps {
	isLoading?: boolean;
	selectProps?: SelectProps;
}

const FilterBy = (props: Props) => {
	const { mode } = useAppSelector((store) => store.theme);
	return (
		<Box
			sx={{
				...props.sx,
				padding: '3px 0px',
				display: 'flex',
				width: '100%',
				position: 'relative',
				alignItems: 'center',
			}}
		>
			<FilterAlt sx={{ position: 'absolute', left: '10px' }} />
			<MuiSelect
				fullWidth
				{...props.selectProps}
				sx={{
					borderRadius: '15px !important',
					'& .MuiSelect-outlined': {
						paddingLeft: '40px',
					},
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
		</Box>
	);
};

export default FilterBy;
