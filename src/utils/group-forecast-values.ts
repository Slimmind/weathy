import { ChunkGroup } from './constants';

export const groupForecastValues = (arr: number[]): ChunkGroup[] => {
	const chunks: ChunkGroup[] = [];
	const chunkSize = 24;

	for (let i = 0; i < arr.length; i += chunkSize) {
		const chunk = arr.slice(i, i + chunkSize);
		const chunkGroup: ChunkGroup = {
			min: Math.min(...chunk),
			max: Math.max(...chunk),
			values: chunk,
		};
		chunks.push(chunkGroup);
	}

	return chunks;
};
