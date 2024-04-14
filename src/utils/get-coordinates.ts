import { storeData } from './store-data';
import { COORDS, Coordinates, Position } from './constants';

export async function getCoordinates(): Promise<Coordinates | undefined> {
	try {
		const position = await getCurrentPosition();
		const coordinates = {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		};

		storeData(COORDS, coordinates);

		return coordinates;
	} catch (error) {
		console.error(error);
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
