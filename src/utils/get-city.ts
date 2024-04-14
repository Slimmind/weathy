import { CITY } from './constants';
import { storeData } from './store-data';

export async function getCity(
	lat: number,
	lng: number
): Promise<string | undefined> {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
		);
		const data = await response.json();
		const cityName = data.address.city || data.address.town;
		storeData(CITY, cityName);
		console.log('NEW CITY', cityName);

		return cityName;
	} catch (error) {
		console.error('ERR: ', error);
	}
}
