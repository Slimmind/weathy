import React from 'react';
import { getLocalDate } from '../../utils/get-local-date';
import { storeData } from '../../utils/store-data';
import { getCoordinates } from '../../utils/get-coordinates';
import { LocationIcon } from '../../icons';
import './header-styles.css';
import { getCity } from '../../utils/get-city';
import { getStoredData } from '../../utils/get-stored-data';
import { getWeather } from '../../utils/get-weather';

interface HeaderComponentProps {
	location: string;
	dateToShow: number;
}

export const Header: React.FC<HeaderComponentProps> = ({
	location,
	dateToShow,
}) => {
	const getFullDate = (timestamp: number) => getLocalDate(timestamp, 'full');
	const getCurrentPosition = async (): Promise<void> => {
		storeData('coordinates', '');
		await getCoordinates();

		const { lat, lng } = getStoredData('coordinates');
		getCity(lat, lng);
		getWeather(lat, lng, Intl.DateTimeFormat().resolvedOptions().timeZone);
	};

	return (
		<header className='main-header' id='main-header'>
			<div className='main-header__location'>
				<button aria-label='get current location' onClick={getCurrentPosition}>
					<LocationIcon />
				</button>
				{location && <span className='main-header__city'>{location}</span>}
			</div>
			<span className='main-header__date'>{getFullDate(dateToShow)}</span>
		</header>
	);
};
