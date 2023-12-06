import { getStoredData } from './get-stored-data';
import { storeData } from './store-data';
import { Location } from './types';

export async function getCity(lat: number, lng: number): Promise<Location> {
	// const storedCoordinates = getStoredData('coordinates');
	// const storedCityName = getStoredData('cityName');
	// if (
	// 	storedCoordinates.lat === lat &&
	// 	storedCoordinates.lng === lng &&
	// 	storedCityName
	// ) {
	// 	return storedCityName;
	// }

	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
		);
		const data = await response.json();
		const location = {
			id: `${lat}${lng}`,
			name: data.address.city || data.address.town,
			lat,
			lng,
		};
		storeData('location', location);
		return location;
	} catch (error) {
		console.error('ERR: ', error);
		return getStoredData('location');
	}
}
