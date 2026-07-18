import React, { ReactNode, useState } from 'react';
import { Box, styled } from '@mui/material';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import Button from 'components/button';

interface Props {
	cancelPicker?: () => void;
	onApplyChange?: (range: any) => void;
	buttonText?: string;
	isLoading?: boolean;
	button?: ReactNode;
	customButton?: ReactNode;
	setDateRange?: (date: string) => void;
}

const DatePicker: React.FC<Props> = ({
	cancelPicker,
	onApplyChange,
	buttonText = 'Apply',
	isLoading,
	button,
	setDateRange,
	customButton,
}) => {
	const date = new Date();

	const [selectionRange, setSelectedRange] = useState({
		startDate: date,
		endDate: date,
		key: 'selection',
	});

	const handleOnChange = (ranges: any) => {
		const { selection } = ranges;
		setSelectedRange(selection);
		setDateRange?.(selection);
	};

	const handleApplyChange = () => {
		onApplyChange?.(selectionRange);
		// typeof cancelPicker === 'function' && cancelPicker();
	};

	return (
		<Container>
			<DateRangePicker
				// showSelectionPreview={true}
				moveRangeOnFirstSelection={false}
				direction={'horizontal'}
				ranges={[selectionRange]}
				onChange={handleOnChange}
			/>

			{customButton || (
				<ButtonContainer>
					<Button loading={isLoading} onClick={handleApplyChange}>
						{buttonText}
					</Button>
					{button}
					<Button onClick={cancelPicker}>Cancel</Button>
				</ButtonContainer>
			)}
		</Container>
	);
};

const ButtonContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(2),
	marginTop: theme.spacing(2),
}));

const Container = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	padding: theme.spacing(2, 3),
	borderRadius: theme.spacing(2),
	border: `1px solid ${theme.palette.primary.main}`,
	marginTop: theme.spacing(2),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
}));

export default DatePicker;
