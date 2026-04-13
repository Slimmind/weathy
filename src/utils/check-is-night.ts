export const checkIsNightTime = (currentTime = Date.now()): boolean => {
	const hour = new Date(currentTime).getHours();
	return hour < 5 || hour > 18;
};
