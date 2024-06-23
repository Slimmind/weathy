import React, { lazy, useEffect, useState } from 'react';
import Header from './components/header';
import Preloader from './components/preloader';
import { getWeather } from './utils/get-weather';
import { LocalStorage, WeatherData } from './utils/constants';
import { getStoredData } from './utils/get-stored-data';
import { LocationModel } from './utils/models';
import { storeData } from './utils/store-data';

const BackgroundSection = lazy(() => import('./components/background-section'));
const HourSection = lazy(() => import('./components/hour-section'));
const CurrentSection = lazy(() => import('./components/current-section'));
const DaySection = lazy(() => import('./components/day-section'));
const GraphSection = lazy(() => import('./components/graph-section'));
const MapSection = lazy(() => import('./components/map-section'));

function App() {
	const [relatedTab, setRelatedTab] = useState<number>(0);
	const [location, setLocation] = useState(
		getStoredData(LocalStorage.LOCATION) || LocationModel
	);
	const [weather, setWeather] = useState<WeatherData>();

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
				<Header changeLocation={changeLocation} updateForecast={fetchData} />
				{location.id ? (
					weather ? (
						<>
              {weather.current_weather && (
                <BackgroundSection
                  iconCode={weather.current_weather.weathercode}
                />
              )}
							<CurrentSection data={weather} />
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
