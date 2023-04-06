import React from 'react';
import { Typography, Box } from '@mui/material';
import { Adjust, CheckCircleOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { red, green } from '@mui/material/colors';
import moment from 'moment';
import { useQuery } from 'react-query';
import { ChevronLeft } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Layout from '../../components/layout';
import Button from '../../components/button';
import { grey } from '@mui/material/colors';
import { useAppSelector } from '../../store/hooks';
import Api from '../../utilities/api';
import {
	QueryKey,
	Ticket,
	TicketReply,
	TicketStatus,
} from '../../utilities/types';
import { useAlert } from '../../utilities/hooks';
import {
	CircularProgress,
	MessageItem,
	CloseDisputeButton,
	ReplyTicketForm,
} from '../../components';
import ErrorBoundary from '../../utilities/helpers/error-boundary';

const Message = () => {
	const alert = useAlert();
	const { token } = useAppSelector((store) => store.authState);
	const params = useParams();
	const navigate = useNavigate();

	const { data, isLoading } = useQuery(
		[QueryKey.Ticket, params.id],
		() =>
			Api.Ticket.Records({
				token: token as string,
				params: {
					populate: 'related_transaction',
					_id: params.id,
				},
			}),
		{
			enabled: !!(token && params && params.id),
			onError: (error) => {
				alert({ data: error, type: 'error' });
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
							sx={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr' }}
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
										<CloseDisputeButton ticket={data.payload[0]} />
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
