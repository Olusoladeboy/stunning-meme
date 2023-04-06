import {
	ENDPOINTS,
	CreateTicket,
	TicketReply,
	CloseTicket,
} from '../utilities';
import apiRequest from './apiRequest';

export const createTicket = async ({
	data,
}: {
	data: CreateTicket;
}): Promise<any> =>
	apiRequest({
		url: ENDPOINTS.Ticket,
		method: 'POST',

		data,
	});

export const closeTicket = async ({
	data,
	id,
}: {
	data: CloseTicket;
	id: string;
}): Promise<any> =>
	apiRequest({
		url: `${ENDPOINTS.Ticket}/${id}`,
		method: 'PUT',

		data,
	});

export const replyTicket = async ({
	data,
	code,
}: {
	data: TicketReply;
	code: string;
}): Promise<any> =>
	apiRequest({
		url: `${ENDPOINTS.Ticket}/reply/${code}`,
		method: 'PUT',

		data,
	});

export const tickets = async ({
	params,
}: {
	params?: { [key: string]: any };
}): Promise<any> =>
	apiRequest({
		url: `${ENDPOINTS.Ticket}`,
		method: 'GET',

		params,
	});
