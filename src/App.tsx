import React, { lazy, useEffect, useState } from 'react';
import Header from './components/header';
import Preloader from './components/preloader';
import { getWeather } from './utils/get-weather';
import { LocalStorage, Location, WeatherData } from './utils/constants';
import { getStoredData } from './utils/get-stored-data';
import { LocationModel } from './utils/models';
import { storeData } from './utils/store-data';
import { getForecast } from './utils/get-forecast';

const BackgroundSection = lazy(() => import('./components/background-section'));
const CurrentSection = lazy(() => import('./components/current-section'));
const DaySection = lazy(() => import('./components/day-section'));
const GraphSection = lazy(() => import('./components/graph-section'));
const MapSection = lazy(() => import('./components/map-section'));
const HourSection = lazy(() => import('./components/hour-section'));
const Forecast = lazy(() => import('./components/forecast'));

function App() {
	const [relatedTab, setRelatedTab] = useState<number>(0);
	const [location, setLocation] = useState(
		getStoredData(LocalStorage.LOCATION) || LocationModel
	);
	const [weather, setWeather] = useState<WeatherData>();
	const [forecast, setForecast] = useState<any>();

	const fetchData = async () => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		if (location) {
			const { lat, lng } = location;
			try {
				const weatherData = await getWeather(lat, lng, timeZone);
				const forecastData = await getForecast(lat, lng);
				setWeather(weatherData);
				setForecast(forecastData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchData();
	}, [location]);

	const changeRelatedTab = (tabIndex: number): void => {
		setRelatedTab(tabIndex);
	};

	const changeLocation = (newLocation: Location): void => {
		storeData(LocalStorage.LOCATION, newLocation);
		setLocation(newLocation);
	};

	return (
		<div className='App'>
			<>
				<Header changeLocation={changeLocation} />
				{location?.id ? (
					weather ? (
						<>
							{weather.current_weather && (
								<BackgroundSection
									iconCode={weather.current_weather.weathercode}
								/>
							)}
							<CurrentSection updateForecast={fetchData} data={weather} />
							<div className='divided-section'>
								<DaySection
									data={weather.daily}
									changeRelatedTab={changeRelatedTab}
								/>
								<GraphSection
									data={weather.daily}
									changeRelatedTab={changeRelatedTab}
								/>
							</div>
							<MapSection lat={location.lat} lng={location.lng} />
							<HourSection data={weather} relatedTab={relatedTab} />
							<Forecast data={forecast} />
						</>
					) : (
						<Preloader />
					)
				) : (
					<h2 className='weather__empty'>Please choose your location ;)</h2>
				)}
			</>
		</div>
	);
}

export default App;
