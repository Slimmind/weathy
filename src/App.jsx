import React, { useEffect, useState, useRef } from 'react';
import Header from './components/header';
import CurrentSection from './components/current-section';
import DaySection from './components/day-section';
import GraphSection from './components/graph-section';
import HourSection from './components/hour-section';
import Preloader from './components/preloader';
// import BackToTop from './components/back-to-top';
import { getCoordinates } from './utils/get-coordinates';
import { getCity } from './utils/get-city';
import { getWeather } from './utils/get-weather';
import { setLocalStorage } from './utils/set-local-storage';
import { getLocalStorage } from './utils/get-local-storage';

const getAppData = async () => {
  const { lat, lng } = await getCoordinates();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const data = await getWeather(lat, lng, timeZone);
  const weatherData = { ...data, fetchDate: Date.now() };
  const locationData = await getCity(lat, lng);
  const coordinates = { lat, lng };

  return {
    coordinates,
    locationData,
    weatherData,
  }
};

function App() {
  const updateDelay = 30000;
  const renderDate = Date.now();
  const [isLoaded, setIsLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [scrolledDay, setScrolledDay] = useState(Date.now());
  const cachedCoordinates = getLocalStorage('coordinates');
  const updating = useRef(false);

  const scrollDays = (timestamp) => {
    setScrolledDay(timestamp);
  };

  const fetchedData = ({
    coordinates,
    locationData,
    weatherData,
  }) => {
    setCoordinates(coordinates);
    setLocation(locationData);
    setWeather(weatherData);
    setLocalStorage('coordinates', coordinates);
    setLocalStorage('location', locationData);
    setLocalStorage('weatherData', weatherData);
    updating.current = false;
  }

  useEffect(() => {
    if (cachedCoordinates) {
      const cachedWeatherData = getLocalStorage('weatherData');
      setCoordinates(cachedCoordinates);
      setLocation(getLocalStorage('location'));
      setWeather(getLocalStorage('weatherData'));

      if (renderDate - cachedWeatherData.fetchDate > updateDelay) {
        updating.current = true;
        getAppData().then(fetchedData);
      }
    } else {
      localStorage.clear();
      getAppData().then(fetchedData);
    }
  }, []);

  useEffect(() => {
    if (weather) {
      setIsLoaded(true);
    }
  }, [weather]);

  return (
    isLoaded ? (
      <div className="App">
        {coordinates && (
          <>
            <Header
              location={location}
              isUpdating={updating.current}
              dateToShow={scrolledDay}
            />
            {weather && (
              <>
                <CurrentSection data={weather} />
                <DaySection
                  data={weather.daily}
                />
                <GraphSection data={weather.daily} />
                <HourSection data={weather} handleScroll={scrollDays} />
              </>
            )}
          </>
        )}
        {/* <BackToTop /> */}
      </div>
    ) : (
      <Preloader />
    )
  );
}

export default App;
