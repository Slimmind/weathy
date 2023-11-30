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

const getAppData = async (): Promise<AppData | undefined> => {
	const coordinates = await getCoordinates();
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	if (coordinates) {
		const locationData =
			(await getCity(coordinates.lat, coordinates.lng)) || '';
		const weatherData = await getWeather(
			coordinates.lat,
			coordinates.lng,
			timeZone
		);

		return {
			coordinates,
			locationData,
			weatherData,
		};
	}
};

function App() {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [coordinates, setCoordinates] = useState<Coordinates>({
		lat: 0,
		lng: 0,
	});
	const [location, setLocation] = useState<string>('');
	const [weather, setWeather] = useState<WeatherData | undefined | null>(null);
	const [scrolledDay, setScrolledDay] = useState<number>(Date.now());

	const scrollDays = (timestamp: number) => {
		setScrolledDay(timestamp);
	};

	const fetchedData = ({
		coordinates,
		locationData,
		weatherData,
	}: AppData): void => {
		setCoordinates(coordinates);
		setLocation(locationData);
		setWeather(weatherData);
	};

	useEffect(() => {
		getAppData().then(fetchedData);
	}, []);

	useEffect(() => {
		if (weather) {
			setIsLoaded(true);
		}
	}, [weather]);

	return isLoaded ? (
		<div className='App'>
			{coordinates && weather && (
				<>
					<Header location={location} dateToShow={scrolledDay} />
					<>
						<BackgroundSection
							iconCode={weather?.current_weather?.weathercode}
						/>
						<CurrentSection data={weather} />
						<DaySection data={weather.daily} />
						<GraphSection data={weather.daily} />
						<MapSection lat={coordinates.lat} lng={coordinates.lng} />
						<HourSection data={weather} handleScroll={scrollDays} />
					</>
				</>
			)}
		</div>
	) : (
		<Preloader />
	);
}

export default App;
