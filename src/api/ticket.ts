import {
	ENDPOINTS,
	CreateTicket,
	TicketReply,
	CloseTicket,
} from '../utilities';
import apiRequest from './apiRequest';

const Ticket = {
	Create: async ({ token, data }: { token: string; data: CreateTicket }) =>
		apiRequest({
			url: ENDPOINTS.Ticket,
			method: 'POST',
			token,
			data,
		}),
	Close: async ({
		token,
		data,
		id,
	}: {
		token: string;
		data: CloseTicket;
		id: string;
	}) =>
		apiRequest({
			url: `${ENDPOINTS.Ticket}/${id}`,
			method: 'PUT',
			token,
			data,
		}),
	ReplyTicket: async ({
		token,
		data,
		code,
	}: {
		token: string;
		data: TicketReply;
		code: string;
	}) =>
		apiRequest({
			url: `${ENDPOINTS.Ticket}/reply/${code}`,
			method: 'PUT',
			token,
			data,
		}),
	Records: async ({
		token,
		params,
	}: {
		token: string;
		params?: { [key: string]: any };
	}) =>
		apiRequest({
			url: `${ENDPOINTS.Ticket}`,
			method: 'GET',
			token,
			params,
		}),
};

export default Ticket;
