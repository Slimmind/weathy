import { API_URL, LocalStorage } from './constants';
import { getStoredData } from './get-stored-data';
import { storeData } from './store-data';

interface ForecastApiResponse {
	hourly: {
		temperature_2m: number[];
		time: string[];
	};
}

export async function getForecast(
	lat: number,
	lng: number,
): Promise<ForecastApiResponse | undefined> {
	const url = `${API_URL}?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&forecast_days=16`;

	try {
		const response = await fetch(url);
		const data: ForecastApiResponse = await response.json();
		storeData(LocalStorage.FORECAST, data);
		return data;
	} catch (error) {
		console.error(error);
		return getStoredData<ForecastApiResponse>(LocalStorage.FORECAST);
	}
}
