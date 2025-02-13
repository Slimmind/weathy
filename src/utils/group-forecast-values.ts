import { ChunkGroup } from './constants';

export const groupForecastValues = (data: any): ChunkGroup[] => {
	const chunks: ChunkGroup[] = [];
	const chunkSize = 24;

	for (let i = 0; i < data.temperature_2m.length; i += chunkSize) {
		const chunk = {
			date: data.time.slice(i, i + chunkSize),
			temp: data.temperature_2m.slice(i, i + chunkSize),
		};
		const dateString = chunk.date[0];
		const date = new Date(dateString);

		const dayNum = date.getDate();
		const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
		const chunkGroup: ChunkGroup = {
			date: {
				dayNum,
				dayName,
			},
			min: Math.min(...chunk.temp),
			max: Math.max(...chunk.temp),
			values: chunk.temp,
		};
		chunks.push(chunkGroup);
	}

	return chunks;
};
