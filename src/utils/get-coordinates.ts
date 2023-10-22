import { getStoredData } from './get-stored-data';
import { storeData } from './store-data';
import { Coordinates, Position } from './types';

export async function getCoordinates(): Promise<Coordinates | undefined> {
	try {
		const storedCoordinates = getStoredData('coordinates');
		if (storedCoordinates) {
			return storedCoordinates;
		}
		const position = await getCurrentPosition();
		const coordinates = {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		};

		storeData('coordinates', coordinates);

		return coordinates;
	} catch (error) {
		console.error(error);
		return undefined;
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
