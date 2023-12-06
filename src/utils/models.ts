export const CoordinatesModel = {
	lat: 0,
	lng: 0,
};

export const LocationModel = {
	id: '',
	name: '',
	lat: 0,
	lng: 0,
};

export const CurrentWeatherModel = {
	is_day: 0,
	temperature: 0,
	time: 0,
	weathercode: 0,
	winddirection: 0,
	windspeed: 0,
};

export const DailyModel = {
	apparent_temperature_max: [],
	apparent_temperature_min: [],
	precipitation_sum: [],
	temperature_2m_max: [],
	temperature_2m_min: [],
	time: [],
	weathercode: [],
};

export const DailyUnitsModel = {
	apparent_temperature_max: '',
	apparent_temperature_min: '',
	precipitation_sum: '',
	temperature_2m_max: '',
	temperature_2m_min: '',
	time: '',
	weathercode: '',
};

export const HourlyModel = {
	apparent_temperature: [],
	precipitation: [],
	temperature_2m: [],
	time: [],
	weathercode: [],
	windspeed_10m: [],
};

export const HourlyUnitsModel = {
	apparent_temperature: '',
	precipitation: '',
	temperature_2m: '',
	time: '',
	weathercode: '',
	windspeed_10m: '',
};

export const WeatherDataModel = {
	current_weather: CurrentWeatherModel,
	daily: DailyModel,
	daily_units: DailyUnitsModel,
	elevation: 0,
	fetchDate: 0,
	generationtime_ms: 0,
	hourly: HourlyModel,
	hourly_units: HourlyUnitsModel,
	latitude: 0,
	longitude: 0,
	timezone: '',
	timezone_abbreviation: '',
	utc_offset_seconds: '',
};
