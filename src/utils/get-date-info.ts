export const getDateInfo = (dateString: string) => {
	const date = new Date(dateString);

	const dayNumber = date.getDate();

	const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'short' };
	const dayName = new Intl.DateTimeFormat('en-US', dayOptions).format(date);

	const monthOptions: Intl.DateTimeFormatOptions = { month: 'short' };
	const monthName = new Intl.DateTimeFormat('en-US', monthOptions).format(date);

	return {
		monthName,
		dayName,
		dayNumber,
	};
};
