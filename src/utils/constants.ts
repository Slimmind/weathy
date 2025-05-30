export interface CurrentWeather {
	is_day: number;
	temperature: number;
	time: number;
	weathercode: number;
	winddirection: number;
	windspeed: number;
}

export interface Daily {
	apparent_temperature_max: number[];
	apparent_temperature_min: number[];
	precipitation_sum: number[];
	temperature_2m_max: number[];
	temperature_2m_min: number[];
	time: number[];
	weathercode: number[];
}

export interface DailyUnits {
	apparent_temperature_max: string;
	apparent_temperature_min: string;
	precipitation_sum: string;
	temperature_2m_max: string;
	temperature_2m_min: string;
	time: string;
	weathercode: string;
}

export interface Hourly {
	apparent_temperature: number[];
	precipitation: number[];
	temperature_2m: number[];
	time: number[];
	weathercode: number[];
	windspeed_10m: number[];
}

export interface HourlyUnits {
	apparent_temperature: string;
	precipitation: string;
	temperature_2m: string;
	time: string;
	weathercode: string;
	windspeed_10m: string;
}

export interface Hour {
	feelsLike: number;
	iconCode: number;
	precip: number;
	temp: number;
	timestamp: number;
	windSpeed: number;
}

export interface WeatherData {
	current_weather: CurrentWeather | undefined;
	daily: Daily | undefined;
	daily_units: DailyUnits;
	elevation: number;
	fetchDate: number;
	generationtime_ms: number;
	hourly: Hourly | undefined;
	hourly_units: HourlyUnits;
	latitude: number;
	longitude: number;
	timezone: string;
	timezone_abbreviation: string;
	utc_offset_seconds: string;
}

export interface Coordinates {
	lat: number;
	lng: number;
}

export interface Location {
	id: string;
	country: string;
	lat: number;
	lng: number;
	name: string;
	localName: string;
}

export interface Position {
	coords: {
		latitude: number;
		longitude: number;
		altitude: number | null;
		accuracy: number;
		altitudeAccuracy: number | null;
		heading: number | null;
		speed: number | null;
	};
	timestamp: number;
}

export interface Location {
	id: string;
	name: string;
	lat: number;
	lng: number;
}

export interface SearchResult {
	id: string;
	country: string;
	lat: number;
	lng: number;
	name: string;
	state: string;
	localName: string;
}

export type ChunkGroup = {
	date: {
		dayNum: number;
		dayName: string;
	};
	min: number;
	max: number;
	values: number[];
};

export const LocalStorage = {
	WEATHER_DATA: 'weathy_weather_data',
	FORECAST: 'weathy_forecast',
	LOCATION: 'weathy_location',
	CITY: 'weathy_city',
	COORDS: 'weathy_coords',
	AVAILABLE_LOCATIONS: 'weathy_available_locations',
};

export const LastUpdateValues = {
	OUTDATED: 'outdated',
	OBSOLETE: 'obsolete',
};
