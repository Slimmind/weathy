import React, { lazy, useEffect, useState, useCallback, useMemo } from 'react';
import Header from './components/header';
import Preloader from './components/preloader';
import { getWeather } from './utils/get-weather';
import { getForecast } from './utils/get-forecast';
import { LocalStorage, Location, WeatherData } from './utils/constants';
import { getStoredData } from './utils/get-stored-data';
import { LocationModel } from './utils/models';
import { storeData } from './utils/store-data';

const BackgroundSection = lazy(() => import('./components/background-section'));
const CurrentSection = lazy(() => import('./components/current-section'));
const DaySection = lazy(() => import('./components/day-section'));
const GraphSection = lazy(() => import('./components/graph-section'));
const MapSection = lazy(() => import('./components/map-section'));
const HourSection = lazy(() => import('./components/hour-section'));
const Forecast = lazy(() => import('./components/forecast'));
const Footer = lazy(() => import('./components/footer'));
const ScrollToTop = lazy(() => import('./components/scroll-to-top'));

function App() {
	const [relatedTab, setRelatedTab] = useState<number>(0);
	const [location, setLocation] = useState<Location>(
		() => getStoredData(LocalStorage.LOCATION) || LocationModel
	);
	const [weather, setWeather] = useState<WeatherData | null | undefined>(null);
	const [forecast, setForecast] = useState<any>(null);
	const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

	const fetchData = useCallback(async () => {
		if (!location) return;

		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const { lat, lng } = location;
		try {
			// Объединяем два запроса в один для оптимизации производительности
			const [weatherData, forecastData] = await Promise.all([
				getWeather(lat, lng, timeZone),
				getForecast(lat, lng),
			]);

			setWeather((prev: WeatherData | null | undefined) => {
				return JSON.stringify(prev) === JSON.stringify(weatherData)
					? prev ?? null
					: weatherData;
			});

			setForecast((prev: any) => {
				return JSON.stringify(prev) === JSON.stringify(forecastData)
					? prev ?? null
					: forecastData;
			});
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}, [location]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const changeLocation = useCallback((newLocation: Location) => {
		storeData(LocalStorage.LOCATION, newLocation);
		setLocation(newLocation);
	}, []);

	const toggleMenu = useCallback((isMenuActive: boolean) => {
		setIsMenuOpened(isMenuActive);
	}, []);

	console.log('APP');

	const mainContent = useMemo(() => {
		if (!location?.id) {
			return <h2 className='weather__empty'>Please choose your location ;)</h2>;
		}
		if (!weather) {
			return <Preloader />;
		}
		return (
			<>
				{weather.current_weather && (
					<BackgroundSection iconCode={weather.current_weather.weathercode} />
				)}
				<CurrentSection updateForecast={fetchData} data={weather} />
				<div className='divided-section'>
					<DaySection data={weather.daily} changeRelatedTab={setRelatedTab} />
					<GraphSection data={weather.daily} changeRelatedTab={setRelatedTab} />
				</div>
				<MapSection lat={location.lat} lng={location.lng} />
				<HourSection data={weather} relatedTab={relatedTab} />
				<Forecast data={forecast} />
				<ScrollToTop />
			</>
		);
	}, [location, weather, forecast, fetchData, relatedTab]);

	return (
		<div className='App'>
			<Header changeLocation={changeLocation} toggleMenu={toggleMenu} />
			<main className={isMenuOpened ? 'blur' : ''}>{mainContent}</main>
			<Footer />
		</div>
	);
}

export default App;
