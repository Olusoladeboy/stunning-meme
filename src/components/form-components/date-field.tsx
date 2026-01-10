import React from 'react';
import { styled } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PRIMARY_COLOR } from 'utilities';

interface Props {
	onChange?: (date: Date) => void;
	placeholder?: string;
	isClearable?: boolean;
	value?: Date;
}

const DateField: React.FC<Props> = ({ onChange, placeholder, value }) => {
	return (
		<DatePicker
			selected={value}
			placeholderText={placeholder}
			onChange={(date: Date | null) => date && onChange?.(date)}
			customInput={
				<TextInput
					autoCorrect={'off'}
					autoComplete='off'
					autoCapitalize='none'
				/>
			}
		/>
	);
};

const TextInput = styled('input')(({ theme }) => ({
	width: '100%',
	maxWidth: '240px',
	flex: '1',
	borderRadius: '4px',
	padding: '18px 14px',
	border: `1px solid ${PRIMARY_COLOR}`,

	'&:focus-visible': {
		borderColor: theme.palette.primary.main,
		outline: `1px solid ${theme.palette.primary.main}`,
	},
}));

export default DateField;
