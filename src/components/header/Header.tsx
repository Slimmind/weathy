import { lazy } from 'react';
import { getLocalDate } from '../../utils/get-local-date';
import { useWeatherContext } from '../../context/WeatherContext';
import './header-styles.css';

const Locations = lazy(() => import('../locations'));

export const Header = () => {
	const fullDate = getLocalDate(Date.now(), 'full');
	const { changeLocation, setIsMenuOpened } = useWeatherContext();

	return (
		<header className='main-header'>
			<div className='main-header__location'>
				<Locations
					changeLocation={changeLocation}
					toggleMenu={setIsMenuOpened}
				/>
			</div>
			<div className='main-header__right'>
				<span className='main-header__date'>{fullDate}</span>
			</div>
		</header>
	);
};
