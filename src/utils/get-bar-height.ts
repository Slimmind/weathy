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
	// Учтем диапазон температур, чтобы правильно нормализовать значения
	const tempRange = maxTemp - minTemp;
	// Переменная degHeight теперь будет учитывать как максимальное, так и минимальное значения температур
	const degHeight = 70 / tempRange;
	const minHeight = 30;

	// Обновим функцию для расчета высоты столбца
	const barHeight = (temp: number): number => {
		return temp - minTemp;
	};

	return tempValues.map((day) => {
		return `${degHeight * barHeight(day) + minHeight}%`;
	});
}
