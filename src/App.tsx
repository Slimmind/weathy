import React, { useEffect, useState } from 'react';
import Header from './components/header';
import CurrentSection from './components/current-section';
import DaySection from './components/day-section';
import GraphSection from './components/graph-section';
import HourSection from './components/hour-section';
import MapSection from './components/map-section';
import BackgroundSection from './components/background-section';
import { getWeather } from './utils/get-weather';
import { WeatherData, Location } from './utils/types';
import { LocationModel, WeatherDataModel } from './utils/models';
import { getStoredData } from './utils/get-stored-data';

interface AppData {
	weatherData: WeatherData;
}

const App: React.FC = () => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [location, setLocation] = useState(
		getStoredData('location') || LocationModel
	);
	const [weather, setWeather] = useState<WeatherData>(WeatherDataModel);

	const fetchData = async () => {
		const { lat, lng } = location;
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		if (lat && lng) {
			try {
				const weatherData = await getWeather(lat, lng, timeZone);
				setWeather(weatherData);
			} catch (error) {
				console.error('Error fetching weather data:', error);
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchData();
	}, [location]);

	const updateLocation = (newLocation: Location): void => {
		setLocation(newLocation);
	};

	return (
		<div className='App'>
			<Header />
			<BackgroundSection iconCode={weather?.current_weather?.weathercode} />
			<CurrentSection data={weather} />
			<DaySection data={weather.daily} />
			<GraphSection data={weather.daily} />
			<MapSection lat={location.lat} lng={location.lng} />
			<HourSection data={weather} />
		</div>
	);
};

export default App;
