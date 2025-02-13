import React, { lazy, useEffect, useState, useCallback } from "react";
import Header from "./components/header";
import Preloader from "./components/preloader";
import { getWeather } from "./utils/get-weather";
import { LocalStorage, Location, WeatherData } from "./utils/constants";
import { getStoredData } from "./utils/get-stored-data";
import { LocationModel } from "./utils/models";
import { storeData } from "./utils/store-data";
import { getForecast } from "./utils/get-forecast";

const BackgroundSection = lazy(() => import("./components/background-section"));
const CurrentSection = lazy(() => import("./components/current-section"));
const DaySection = lazy(() => import("./components/day-section"));
const GraphSection = lazy(() => import("./components/graph-section"));
const MapSection = lazy(() => import("./components/map-section"));
const HourSection = lazy(() => import("./components/hour-section"));
const Forecast = lazy(() => import("./components/forecast"));
const Footer = lazy(() => import("./components/footer"));
const ScrollToTop = lazy(() => import("./components/scroll-to-top"));

function App() {
  const [relatedTab, setRelatedTab] = useState<number>(0);
  const [location, setLocation] = useState(
    getStoredData(LocalStorage.LOCATION) || LocationModel,
  );
  const [weather, setWeather] = useState<WeatherData>();
  const [forecast, setForecast] = useState<any>();
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (location) {
      const { lat, lng } = location;
      try {
        const weatherData = await getWeather(lat, lng, timeZone);
        const forecastData = await getForecast(lat, lng);
        setWeather((prev) =>
          JSON.stringify(prev) === JSON.stringify(weatherData)
            ? prev
            : weatherData,
        );
        setForecast((prev) =>
          JSON.stringify(prev) === JSON.stringify(forecastData)
            ? prev
            : forecastData,
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const changeRelatedTab = (tabIndex: number): void => {
    setRelatedTab(tabIndex);
  };

  const changeLocation = (newLocation: Location): void => {
    storeData(LocalStorage.LOCATION, newLocation);
    setLocation(newLocation);
  };

  const toggleMenu = (isMenuActive: boolean): void => {
    setIsMenuOpened(isMenuActive);
  };

  console.log("APP");

  return (
    <div className="App">
      <>
        <Header changeLocation={changeLocation} toggleMenu={toggleMenu} />
        <main className={isMenuOpened ? "blur" : ""}>
          {location?.id ? (
            weather ? (
              <>
                {weather.current_weather && (
                  <BackgroundSection
                    iconCode={weather.current_weather.weathercode}
                  />
                )}
                <CurrentSection updateForecast={fetchData} data={weather} />
                <div className="divided-section">
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
                <ScrollToTop />
              </>
            ) : (
              <Preloader />
            )
          ) : (
            <h2 className="weather__empty">Please choose your location ;)</h2>
          )}
        </main>
        <Footer />
      </>
    </div>
  );
}

export default App;
