import React from 'react';
import { getLocalDate } from '../../utils/get-local-date';
import { getCoordinates } from '../../utils/get-coordinates';
import { LocationIcon } from '../../icons';
import { getCity } from '../../utils/get-city';
import { getStoredData } from '../../utils/get-stored-data';
import { getWeather } from '../../utils/get-weather';
import { COORDS } from '../../utils/constants';
import './header-styles.css';

interface HeaderComponentProps {
	location: string;
}

export const Header = ({ location }: HeaderComponentProps) => {
	const fullDate = getLocalDate(Date.now(), 'full');

	// const getCurrentPosition = async (): Promise<void> => {
	// 	await getCoordinates();

	// 	const { lat, lng } = getStoredData(COORDS);
	// 	getCity(lat, lng);
	// 	getWeather(lat, lng, Intl.DateTimeFormat().resolvedOptions().timeZone);
	// };

	return (
		<header className='main-header' id='main-header'>
			<div className='main-header__location'>
				{/* <button aria-label='get current location' onClick={getCurrentPosition}>
					<LocationIcon />
				</button> */}
				<span className='main-header__city'>
					{location || 'Getting weather for your city...'}
				</span>
			</div>
			<span className='main-header__date'>{fullDate}</span>
		</header>
	);
};
