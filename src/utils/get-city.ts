import { COORDS, LOCATION } from './constants';
import { getStoredData } from './get-stored-data';
import { storeData } from './store-data';

export async function getCity(
	lat: number,
	lng: number
): Promise<string | undefined> {
	const storedCoordinates = getStoredData(COORDS);
	const storedCityName = getStoredData(LOCATION);
	if (
		storedCoordinates.lat === lat &&
		storedCoordinates.lng === lng &&
		storedCityName
	) {
		return storedCityName;
	}

	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
		);
		const data = await response.json();
		const cityName = data.address.city || data.address.town;
		storeData(LOCATION, cityName);

		return cityName;
	} catch (error) {
		console.error('ERR: ', error);
		return getStoredData(LOCATION);
	}
}
