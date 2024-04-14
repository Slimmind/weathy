import React, { useEffect, useState } from 'react';
import Header from './components/header';
import CurrentSection from './components/current-section';
import DaySection from './components/day-section';
import GraphSection from './components/graph-section';
import HourSection from './components/hour-section';
import MapSection from './components/map-section';
import BackgroundSection from './components/background-section';
import Preloader from './components/preloader';
import { getWeather } from './utils/get-weather';
import { LOCATION, WeatherData } from './utils/constants';
import { getStoredData } from './utils/get-stored-data';
import { LocationModel } from './utils/models';
import { storeData } from './utils/store-data';

function App() {
	const [relatedTab, setRelatedTab] = useState<number>(0);
	const [location, setLocation] = useState(
		getStoredData(LOCATION) || LocationModel
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
		storeData(LOCATION, newLocation);
		setLocation(newLocation);
	};

	return (
		<div className='App'>
			<>
				<Header changeLocation={changeLocation} />
				{weather ? (
					<>
						<BackgroundSection
							iconCode={weather?.current_weather?.weathercode}
						/>
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
				)}
			</>
		</div>
	);
}

export default App;
