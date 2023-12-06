import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { LocationIcon, SearchLocationIcon } from '../../icons';
import { storeData } from '../../utils/store-data';
import { getCoordinates } from '../../utils/get-coordinates';
import { getStoredData } from '../../utils/get-stored-data';
import { getCity } from '../../utils/get-city';
import { LocationsList } from './locations-list/locations-list';
import { LocationsSearch } from './locations-search/locations-search';
import { Location } from '../../utils/types';

import './locations.styles.css';

export const Locations = () => {
	const [currentLocation, setCurrentLocation] = useState<Location>(
		getStoredData('location')
	);
	const [switchedLocationMenu, setSwitchedLocationMenu] = useState(false);
	const [availableLocations, setAvailableLocations] = useState<Location[]>(
		getStoredData('availableLocations') || []
	);

	const switchLocationsMenu = () => {
		setSwitchedLocationMenu(!switchedLocationMenu);
	};

	const getCurrentPosition = async (): Promise<void> => {
		storeData('coordinates', '');

		try {
			const { lat, lng } = await getCoordinates();
			const newLocation = await getCity(lat, lng);

			if (newLocation) {
				addLocation(newLocation);
				setCurrentLocation(newLocation);
			}
		} catch (error) {
			console.error('Error getting current position:', error);
		}
	};

	const addLocation = (newLocation: Location): void => {
		setAvailableLocations((prev: Location[]) => {
			if (prev.some((item) => item.id === newLocation.id)) {
				return prev;
			}

			storeData('availableLocations', [...prev, newLocation]);
			changeLocation(newLocation);
			return [...prev, newLocation];
		});
	};

	const changeLocation = (chosenLocation: Location): void => {
		setCurrentLocation(chosenLocation);
		storeData('coordinates', {
			lat: chosenLocation.lat,
			lng: chosenLocation.lng,
		});
		storeData('location', chosenLocation);
		switchLocationsMenu();
	};

	const removeLocation = (locationId: string): void => {
		const updatedLocationsList = availableLocations.filter(
			(availableLocation) => availableLocation.id !== locationId
		);
		setAvailableLocations(updatedLocationsList);
		storeData('availableLocations', updatedLocationsList);
	};

	useEffect(() => {
		setCurrentLocation(getStoredData('location'));
		setAvailableLocations(getStoredData('availableLocations') || []);
	}, []);

	const locationsClasses = clsx('locations', {
		'locations--active': switchedLocationMenu,
	});

	const headerClasses = clsx('locations__header', {
		'locations__header--empty': !currentLocation?.name,
	});

	return (
		<div className={locationsClasses}>
			<header className={headerClasses} onClick={switchLocationsMenu}>
				{currentLocation?.name ? currentLocation.name : 'Choose location'}
				<SearchLocationIcon />
			</header>
			<section className='locations__window'>
				<LocationsList
					locations={availableLocations}
					currentLocation={currentLocation}
					changeLocationHandler={changeLocation}
					removeLocationHandler={removeLocation}
				/>
				<LocationsSearch addLocationHandler={addLocation} />
				<footer className='locations__window-footer'>
					<p className='location__window-phrase'>OR</p>
					<button
						onClick={getCurrentPosition}
						className='location__get-location-button'
					>
						<LocationIcon /> Get current position
					</button>
				</footer>
			</section>
		</div>
	);
};
