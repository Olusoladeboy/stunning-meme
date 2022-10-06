import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import TextInput from '../form-components/TextInput';
import { useAppSelector } from '../../store/hooks';
import {
	ThemeModeType,
	TicketReply,
	Ticket,
	QueryKey,
	ModalDetails,
	TicketReplyType,
	TicketStatus,
} from '../../utilities/types';
import { grey } from '@mui/material/colors';
import Button from '../button/custom-button';
import Api from '../../utilities/api';
import Modal from '../modal';
import { useAlert } from '../../utilities/hooks';

interface Props {
	ticket: Ticket | null;
}

const ReplyTicketForm = ({ ticket }: Props) => {
	const alert = useAlert();
	const {
		theme: { mode },
		authState: { token },
	} = useAppSelector((store) => store);
	const theme = useTheme();
	const queryClient = useQueryClient();
	const [modal, setModal] = useState<null | ModalDetails>(null);

	const validationSchema = yup.object().shape({
		reply: yup.string().required('Enter reply message'),
	});

	const initialValues: TicketReply = {
		reply_type: TicketReplyType.Staff,
		reply: '',
	};

	const { isLoading, mutate } = useMutation(Api.Ticket.ReplyTicket, {
		onSettled: (data, error) => {
			if (error) {
				alert({ data: error, type: 'error' });
			}

			if (data && data.success) {
				resetForm();
				queryClient.invalidateQueries(QueryKey.Ticket);
				queryClient.invalidateQueries(ticket?.id);
			}
		},
	});

	const { errors, touched, handleChange, handleSubmit, values, resetForm } =
		useFormik({
			initialValues,
			validationSchema,
			onSubmit: (values) => {
				mutate({
					token: token as string,
					data: values,
					code: ticket?.code as string,
				});
			},
		});

	const isDisabled =
		ticket && ticket?.status === TicketStatus.CLOSED ? true : false;

	return (
		<>
			{modal && <Modal {...modal} />}
			<Box
				sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}
				component={'form'}
			>
				<TextInput
					placeholder={'Type in reply'}
					sx={{
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor:
								mode === ThemeModeType.light ? grey['300'] : grey[50],
						},
						'&.MuiFormControl-root': {
							backgroundColor: 'white',
						},
						'& .Mui-focused': {
							outline: 'none !important',
						},
					}}
					multiline
					rows={2}
					disabled={isDisabled}
					fullWidth
					error={touched.reply && errors.reply ? true : false}
					helperText={touched.reply && errors.reply}
					value={values.reply}
					onChange={handleChange('reply')}
				/>
				<Button
					loading={isLoading}
					buttonProps={{
						disabled: isDisabled,
						sx: {
							backgroundColor: `${theme.palette.secondary.main} !important`,
							color: grey['50'],
							minWidth: '160px',
							justifySelf: 'flex-start',
						},
						onClick: (e: React.FormEvent<HTMLButtonElement>) => {
							e.preventDefault();
							handleSubmit();
						},
					}}
				>
					Submit
				</Button>
			</Box>
		</>
	);
};

export default ReplyTicketForm;
