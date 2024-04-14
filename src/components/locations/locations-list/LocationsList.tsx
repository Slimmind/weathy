import React from 'react';
import clsx from 'clsx';
import { Location } from '../../../utils/constants';
import './locations-list.styles.css';

interface LocationsListProps {
	locations: Location[];
	currentLocation: Location;
	change: (location: Location) => void;
	remove: (id: string) => void;
}

export const LocationsList = ({
	locations,
	currentLocation,
	change,
	remove,
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
					<strong onClick={() => change(location)}>{location.name}</strong>
					<button
						aria-label='remove location'
						onClick={() => remove(location.id)}
					></button>
				</li>
			))}
		</ul>
	);
};
