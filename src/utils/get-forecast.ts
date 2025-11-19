import { API_URL, LocalStorage, WeatherData } from './constants';
import { getStoredData } from './get-stored-data';
import { storeData } from './store-data';

export async function getForecast(lat: number, lng: number): Promise<any> {
	const url = `${API_URL}?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&forecast_days=16`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		storeData(LocalStorage.FORECAST, data);
		return data;
	} catch (error) {
		console.error(error);
		return getStoredData(LocalStorage.FORECAST);
	}
}
