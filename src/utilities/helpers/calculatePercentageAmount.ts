const calculatePercentageAmount = ({
	rate,
	amount,
}: {
	rate: string | number;
	amount: string | number;
}) => {
	const parseRate = typeof rate === 'string' ? parseInt(rate) : rate;
	const parseAmount = typeof amount === 'string' ? parseInt(amount) : amount;

	return parseAmount - (parseAmount * parseRate) / 100;
};

export default calculatePercentageAmount;
