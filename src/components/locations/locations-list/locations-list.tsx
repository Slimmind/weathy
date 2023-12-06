import React from 'react';
import clsx from 'clsx';
import { Location } from '../../../utils/types';
import './locations-list.styles.css';

interface LocationsListProps {
	locations: Location[];
	currentLocation: Location;
	changeLocationHandler: (location: Location) => void;
	removeLocationHandler: (id: string) => void;
}

export const LocationsList = ({
	locations,
	currentLocation,
	changeLocationHandler,
	removeLocationHandler,
}: LocationsListProps) => {
	if (locations.length < 1) {
		return null;
	}

	const citiesListItemClasses = (id: string): string =>
		clsx('locations__list-item', {
			'locations__list-item--chosen': id === currentLocation?.id,
		});

	return (
		<ul className='locations__list'>
			{locations.map((location) => (
				<li className={citiesListItemClasses(location.id)} key={location.id}>
					<strong onClick={() => changeLocationHandler(location)}>
						{location.name}
					</strong>
					<button
						aria-label='remove location'
						onClick={() => removeLocationHandler(location.id)}
					></button>
				</li>
			))}
		</ul>
	);
};
