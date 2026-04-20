import { lazy, useMemo, Suspense } from 'react';
import { WeatherProvider, useWeatherContext } from './context/WeatherContext';
import { I18nProvider, useI18n } from './i18n';
import { ErrorBoundary } from './components/error-boundary';
import Header from './components/header';
import Preloader from './components/preloader';
import { checkIsNightTime } from './utils/check-is-night';

const BackgroundSection = lazy(() => import('./components/background-section'));
const CurrentSection = lazy(() => import('./components/current-section'));
const DaySection = lazy(() => import('./components/day-section'));
const GraphSection = lazy(() => import('./components/graph-section'));
const MapSection = lazy(() => import('./components/map-section'));
const HourSection = lazy(() => import('./components/hour-section'));
const Forecast = lazy(() => import('./components/forecast'));
const Footer = lazy(() => import('./components/footer'));
const ScrollToTop = lazy(() => import('./components/scroll-to-top'));
import { BgPattern } from './components/bg-pattern/BgPattern';

function MainContent() {
	const {
		location,
		weather,
		forecast,
		relatedTab,
		scrollTrigger,
		currentTime,
		isMenuOpened,
		setRelatedTab,
		fetchData,
	} = useWeatherContext();
	const { t } = useI18n();

	const content = useMemo(() => {
		if (!location?.id) {
			return <h2 className='weather__empty'>{t('message.choose_location')}</h2>;
		}
		if (!weather) {
			return <Preloader />;
		}
		return (
			<ErrorBoundary>
				<Suspense fallback={<Preloader />}>
					{weather.current_weather && (
						<BackgroundSection
							iconCode={weather.current_weather.weathercode}
							currentTime={currentTime}
						/>
					)}
					<CurrentSection
						updateForecast={fetchData}
						data={weather}
						currentTime={currentTime}
					/>
					<div className='divided-section'>
						<DaySection data={weather.daily} changeRelatedTab={setRelatedTab} />
						<GraphSection
							data={weather.daily}
							changeRelatedTab={setRelatedTab}
						/>
					</div>
					<MapSection lat={location.lat} lng={location.lng} />
					<HourSection data={weather} relatedTab={relatedTab} scrollTrigger={scrollTrigger} />
					<Forecast data={forecast} />
					<ScrollToTop />
				</Suspense>
			</ErrorBoundary>
		);
	}, [location, weather, forecast, fetchData, relatedTab, scrollTrigger, currentTime]);

	return (
		<main
			className={`${isMenuOpened ? 'blur' : ''} ${checkIsNightTime(currentTime) ? 'dark' : ''}`}
		>
			{content}
		</main>
	);
}

function AppContent() {
	const { isMenuOpened } = useWeatherContext();

	return (
		<div className='App'>
			<BgPattern />
			<Header />
			<MainContent />
			<Footer />
		</div>
	);
}

function App() {
	return (
		<WeatherProvider>
			<I18nProvider>
				<AppContent />
			</I18nProvider>
		</WeatherProvider>
	);
}

export default App;
