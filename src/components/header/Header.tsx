import { lazy } from 'react';
import { getLocalDate } from '../../utils/get-local-date';
import { useWeatherContext } from '../../context/WeatherContext';
import { useI18n } from '../../i18n';
import './header-styles.css';

const Locations = lazy(() => import('../locations'));

export const Header = () => {
	const fullDate = getLocalDate(Date.now());
	const { changeLocation, setIsMenuOpened } = useWeatherContext();
	const { language, t, switchLanguage } = useI18n();

	const toggleLanguage = () => {
		switchLanguage(language === 'en' ? 'ru' : 'en');
	};

	return (
		<header className='main-header'>
			<div className='main-header__location'>
				<Locations
					changeLocation={changeLocation}
					toggleMenu={setIsMenuOpened}
				/>
			</div>
			<span className='main-header__date'>{fullDate}</span>
			<button
				className='main-header__lang-toggle'
				onClick={toggleLanguage}
				aria-label='Toggle language'
			>
				{language === 'en' ? t('language.toggle_ru') : t('language.toggle_en')}
			</button>
		</header>
	);
};
