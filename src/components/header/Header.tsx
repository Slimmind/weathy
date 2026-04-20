import { lazy } from 'react';
import { getLocalDate } from '../../utils/get-local-date';
import { useWeatherContext } from '../../context/WeatherContext';
import { useI18n } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';
import './header-styles.css';
import { PaintBrushIcon } from '../../icons/paint-brush';
import { checkIsNightTime } from "../../utils/check-is-night";
import { PaintBrushLightIcon } from "../../icons/paint-brush-light";

const Locations = lazy(() => import('../locations'));

export const Header = () => {
	const fullDate = getLocalDate(Date.now());
	const { changeLocation, setIsMenuOpened } = useWeatherContext();
	const { language, t, switchLanguage } = useI18n();

	const { theme, cycleTheme } = useTheme();

	const toggleLanguage = () => {
		switchLanguage(language === 'en' ? 'ru' : 'en');
	};

	return (
		<header className='main-header'>
			<button
				className='main-header__button'
				id='theme-button'
				onClick={cycleTheme}
				aria-label={`Theme: ${theme}`}
			>
				{checkIsNightTime() ? (
            <PaintBrushLightIcon />
          ) : (
            <PaintBrushIcon />
          )}
			</button>
			<div className='main-header__location'>
				<Locations
					changeLocation={changeLocation}
					toggleMenu={setIsMenuOpened}
				/>
			</div>
			<span className='main-header__date'>{fullDate}</span>
			<button
				className='main-header__button'
				onClick={toggleLanguage}
				aria-label='Toggle language'
			>
				{language === 'en' ? t('language.toggle_ru') : t('language.toggle_en')}
			</button>
		</header>
	);
};
