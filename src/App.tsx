import React, { useEffect, useState } from 'react';
import Header from './components/header';
import CurrentSection from './components/current-section';
import DaySection from './components/day-section';
import GraphSection from './components/graph-section';
import HourSection from './components/hour-section';
import Preloader from './components/preloader';
import MapSection from './components/map-section';
import BackgroundSection from './components/background-section';
import { getCoordinates } from './utils/get-coordinates';
import { getCity } from './utils/get-city';
import { getWeather } from './utils/get-weather';
import { Coordinates, WeatherData } from './utils/types';

interface AppData {
	coordinates: Coordinates;
	locationData: string;
	weatherData: WeatherData | undefined;
}

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('../public/sw.js')
			.then((registration) => {
				console.log('ServiceWorker registered with scope:', registration.scope);
			})
			.catch((error) => {
				console.error('ServiceWorker registration failed:', error);
			});
	});
}

function App() {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [coordinates, setCoordinates] = useState<Coordinates>({
		lat: 0,
		lng: 0,
	});
	const [location, setLocation] = useState<string>('');
	const [weather, setWeather] = useState<WeatherData | undefined | null>(null);
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	useEffect(() => {
		const getAppData = async (): Promise<void> => {
			const coords = await getCoordinates();

			if (coords) {
				const locationData = (await getCity(coords.lat, coords.lng)) || '';
				const forecast = await getWeather(coords.lat, coords.lng, timeZone);

				setCoordinates(coords);
				setLocation(locationData);
				setWeather(forecast);
				setIsLoaded(true);
			}
		};

		getAppData();

		return () => {
			setIsLoaded(false);
		};
	}, []);

	return isLoaded ? (
		<div className='App'>
			{coordinates && weather && (
				<>
					<Header location={location} />
					<>
						<BackgroundSection
							iconCode={weather?.current_weather?.weathercode}
						/>
						<CurrentSection data={weather} />
						<div className='divided-section'>
							<DaySection data={weather.daily} />
							<GraphSection data={weather.daily} />
						</div>
						<MapSection lat={coordinates.lat} lng={coordinates.lng} />
						<HourSection data={weather} />
					</>
				</>
			)}
		</div>
	) : (
		<Preloader />
	);
}

export default App;
