export const formatNumberToCurrency = (value: string | number) =>
	`₦${value.toString().replace(/\B(?=(?=\d*)(\d{3})+(?!\d))/g, ',')}`;

export default formatNumberToCurrency;
