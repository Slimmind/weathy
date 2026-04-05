import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Location, WeatherData } from '../utils/constants';
import { getWeather } from '../utils/get-weather';
import { getForecast } from '../utils/get-forecast';
import { getStoredData } from '../utils/get-stored-data';
import { storeData } from '../utils/store-data';
import { LocalStorage } from '../utils/constants';

interface ForecastData {
	hourly: {
		temperature_2m: number[];
		time: string[];
	};
}

interface WeatherContextType {
	location: Location | null;
	weather: WeatherData | null | undefined;
	forecast: ForecastData | null | undefined;
	relatedTab: number;
	currentTime: number;
	isMenuOpened: boolean;
	setRelatedTab: (tab: number) => void;
	setIsMenuOpened: (opened: boolean) => void;
	changeLocation: (newLocation: Location) => void;
	fetchData: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

interface WeatherProviderProps {
	children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
	const [relatedTab, setRelatedTab] = useState<number>(0);
	const [location, setLocation] = useState<Location | null>(
		() => getStoredData(LocalStorage.LOCATION) || null
	);
	const [weather, setWeather] = useState<WeatherData | null | undefined>(null);
	const [forecast, setForecast] = useState<ForecastData | null | undefined>(null);
	const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(Date.now());

	// Update current time every minute for dynamic icons/backgrounds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(Date.now());
		}, 60000);
		return () => clearInterval(interval);
	}, []);

	const fetchData = useCallback(async () => {
		if (!location) return;

		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const { lat, lng } = location;
		try {
			const [weatherData, forecastData] = await Promise.all([
				getWeather(lat, lng, timeZone),
				getForecast(lat, lng),
			]);

			setWeather(weatherData);
			setForecast(forecastData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}, [location]);

	useEffect(() => {
		if (location?.id) {
			fetchData();
		}
	}, [location, fetchData]);

	const changeLocation = useCallback((newLocation: Location) => {
		storeData(LocalStorage.LOCATION, newLocation);
		setLocation(newLocation);
	}, []);

	const contextValue: WeatherContextType = {
		location,
		weather,
		forecast,
		relatedTab,
		currentTime,
		isMenuOpened,
		setRelatedTab,
		setIsMenuOpened,
		changeLocation,
		fetchData,
	};

	return (
		<WeatherContext.Provider value={contextValue}>
			{children}
		</WeatherContext.Provider>
	);
};

export const useWeatherContext = (): WeatherContextType => {
	const context = useContext(WeatherContext);
	if (!context) {
		throw new Error('useWeatherContext must be used within a WeatherProvider');
	}
	return context;
};
