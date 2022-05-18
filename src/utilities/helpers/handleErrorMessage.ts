const handleErrorMessage = (response: any) => {
	if (
		response &&
		response.errors &&
		response.errors[0].extensions &&
		response.errors[0].extensions.response.message
	) {
		const msg: string | string[] =
			response.errors[0].extensions.response.message;
		if (Array.isArray(msg)) {
			return msg[0];
		} else {
			return msg.toString();
		}
	}
};

export default handleErrorMessage;
