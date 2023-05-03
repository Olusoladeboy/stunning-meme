import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import { Adjust, CheckCircleOutlined } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { red, green, grey } from '@mui/material/colors';
import moment from 'moment';
import { useQuery } from 'react-query';
import { ChevronLeft } from '@mui/icons-material';
import {
	Layout,
	Button,
	DisputeTransactionDetails,
	CircularProgress,
	MessageItem,
	CloseDisputeButton,
	ReplyTicketForm,
	ResolveDisputeButton,
} from '../../components';
import {
	QueryKey,
	Ticket,
	TicketReply,
	ErrorBoundary,
	TicketStatus,
} from '../../utilities';
import { useAlert, useHandleError } from '../../hooks';
import { tickets } from '../../api';
import { useAppSelector } from '../../store/hooks';

const Message = () => {
	const alert = useAlert();
	const params = useParams();
	const navigate = useNavigate();
	const handleError = useHandleError();
	const { token } = useAppSelector((store) => store.authState);

	const { data, isLoading } = useQuery(
		[QueryKey.Ticket, params.id],
		() =>
			tickets({
				params: {
					populate: 'related_transaction',
					_id: params.id,
				},
			}),
		{
			enabled: !!(token && params && params.id),
			onError: (error) => {
				const response = handleError({ error });
				if (response?.message)
					alert({ message: response.message, type: 'error' });
			},
		}
	);

	return (
		<Layout>
			{isLoading ? (
				<CircularProgress
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				/>
			) : (
				data && (
					<ErrorBoundary>
						<Box
							sx={{
								display: 'grid',
								gap: ['15px', '30px'],
								gridTemplateColumns: '1fr',
							}}
						>
							<BackButton
								onClick={() => navigate(-1)}
								startIcon={<ChevronLeft />}
							>
								Back to Dispute
							</BackButton>
							<Box sx={{}}>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: '15px',
										marginBottom: '15px',
									}}
								>
									<Title variant={'h6'}>{data.payload[0].subject}</Title>
									{data.payload[0].status === TicketStatus.OPENED && (
										<Box sx={{ display: 'flex', gap: '15px' }}>
											<CloseDisputeButton ticket={data.payload[0]} />
											<ResolveDisputeButton ticket={data.payload[0]} />
										</Box>
									)}
								</Box>
								<Box
									sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
								>
									<Status
										sx={{
											backgroundColor:
												data.payload[0].status === TicketStatus.OPENED
													? green['600']
													: red['600'],
										}}
									>
										{data.payload[0].status === TicketStatus.OPENED ? (
											<Adjust sx={{ color: grey['50'], fontSize: '20px' }} />
										) : (
											<CheckCircleOutlined
												sx={{ color: grey['50'], fontSize: '20px' }}
											/>
										)}
										<Typography
											sx={{
												color: grey['50'],
												fontWeight: '600',
											}}
											variant={'body2'}
										>
											{data.payload[0].status}
										</Typography>
									</Status>
									<Typography>
										Ticket created on{' '}
										{moment.utc(data.payload[0].createdAt).format('ll')}
									</Typography>
								</Box>
							</Box>
							<DisputeTransactionDetails
								transaction={
									data.payload[0] && data.payload[0].related_transaction
								}
							/>
							<Box
								sx={{
									display: 'grid',
									gridTemplateColumns: '1fr',
									gap: '15px',
								}}
							>
								<ChatBox sx={{}}>
									<MessageItem
										message={data.payload[0].message}
										repliedBy={data.payload[0].user as string}
									/>
									{data.payload[0].replies &&
										data.payload[0].replies.map((payload: TicketReply) => (
											<MessageItem
												key={payload.id}
												message={payload.reply}
												repliedBy={payload.repliedBy as string}
											/>
										))}
								</ChatBox>
								<ReplyTicketForm ticket={data && (data.payload[0] as Ticket)} />
							</Box>
						</Box>
					</ErrorBoundary>
				)
			)}
		</Layout>
	);
};

const Title = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
	marginBottom: theme.spacing(1),
}));

const BackButton = styled(Button)(({ theme }) => ({
	backgroundColor: `${theme.palette.secondary.main} !important`,
	color: grey['50'],
	justifySelf: 'flex-start',
}));

const Status = styled(Box)(({ theme }) => ({
	borderRadius: '20px',
	// minWidth: '40px',
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	padding: '8px 15px',
}));

const ChatBox = styled(Box)(({ theme }) => ({
	borderRadius: '6px',
	border: `1px solid ${grey['300']}`,
	backgroundColor: 'white',
	padding: '8px 15px',
	display: 'grid',
	gridTemplateColumns: '1fr',
	gap: '6px',
}));

export default Message;
