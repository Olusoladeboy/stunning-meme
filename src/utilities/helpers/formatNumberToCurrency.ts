const formatNumberToCurrency = (value: string | number) =>
	`NGN${value.toString().replace(/\B(?=(?=\d*)(\d{3})+(?!\d))/g, ',')}`;

export default formatNumberToCurrency;
