import { getStoredData } from './get-stored-data';
import { storeData } from './store-data';
import { Coordinates, Position } from './types';

export async function getCoordinates(): Promise<Coordinates> {
	const storedCoordinates = getStoredData('coordinates');

	try {
		const position = await getCurrentPosition();
		const coordinates = {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		};

		storeData('coordinates', coordinates);

		return coordinates;
	} catch (error) {
		console.error(error);
		return storedCoordinates || { lat: 0, lng: 0 };
	}
}

function getCurrentPosition(): Promise<Position> {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position: Position) => resolve(position),
			reject
		);
	});
}
