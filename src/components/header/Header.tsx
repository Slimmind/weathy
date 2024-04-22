import React from 'react';
import Locations from '../locations';
import { getLocalDate } from '../../utils/get-local-date';
import './header-styles.css';
import { UpdateButton } from './update-button/UpdateButton';

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
