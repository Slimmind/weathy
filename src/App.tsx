import React, { useEffect, useState } from 'react';
import Header from './components/header';
import CurrentSection from './components/current-section';
import DaySection from './components/day-section';
import GraphSection from './components/graph-section';
import HourSection from './components/hour-section';
import MapSection from './components/map-section';
import BackgroundSection from './components/background-section';
import { getCoordinates } from './utils/get-coordinates';
import { getCity } from './utils/get-city';
import { getWeather } from './utils/get-weather';
import {
	Coordinates,
	UPDATE_TIME,
	WeatherData,
} from './utils/constants';
import { storeData } from './utils/store-data';
import Preloader from './components/preloader';

function App() {
	const [coordinates, setCoordinates] = useState<Coordinates>({
		lat: 0,
		lng: 0,
	});
	const [location, setLocation] = useState<string>('');
	const [weather, setWeather] = useState<WeatherData | undefined | null>(null);
	const [relatedTab, setRelatedTab] = useState<number>(0);
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

				storeData(UPDATE_TIME, Date.now());
			}
		};

		getAppData();
	}, []);

	const changeRelatedTab = (tabIndex: number): void => {
		setRelatedTab(tabIndex);
	};

	return (
		<div className='App'>
			<>
				<Header location={location} />
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
						<MapSection lat={coordinates.lat} lng={coordinates.lng} />
            <HourSection data={weather} relatedTab={relatedTab} />
					</>
				) : <Preloader />}
			</>
		</div>
	);
}

export default App;
