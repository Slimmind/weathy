interface BarData {
	iconCode: number;
	minTemp: number;
	maxTemp: number;
	timestamp: number;
}

export function getBarHeight(data: BarData[]): string[] {
	const tempValues = data.map((day) => (day.minTemp + day.maxTemp) / 2);
	const maxTemp = Math.max(...tempValues);
	const minTemp = Math.min(...tempValues);
	const total = Math.abs(maxTemp) + Math.abs(minTemp);
	const degHeight = 70 / total;
	const minHeight = 30;

	const barHeight = (temp: number): number => {
		return minTemp < 0 && temp > minTemp ? temp + Math.abs(minTemp) : temp;
	};

	return tempValues.map((day) => {
		if (day === minTemp) {
			return `${minHeight}%`;
		}

		return `${degHeight * barHeight(day) + minHeight}%`;
	});
}
