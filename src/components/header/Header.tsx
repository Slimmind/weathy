import React, { lazy } from 'react';
import { getLocalDate } from '../../utils/get-local-date';
import { UpdateButton } from './update-button/UpdateButton';
import './header-styles.css';

const Locations = lazy(() => import('../locations'));

interface HeaderProps {
	changeLocation: (location: Location) => void;
	updateForecast: (location: Location) => void;
}

export const Header = ({ changeLocation, updateForecast }) => {
	const fullDate = getLocalDate(Date.now(), 'full');

	return (
		<header className='main-header'>
			<div className='main-header__location'>
				<Locations changeLocation={changeLocation} />
			</div>
			<div className='main-header__right'>
				<span className='main-header__date'>{fullDate}</span>
				<UpdateButton updateHandler={updateForecast} />
			</div>
		</header>
	);
};
