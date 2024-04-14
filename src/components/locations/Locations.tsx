import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import LocationsList from './locations-list';
import LocationsSearch from './locations-search';
import { LocationIcon, SearchLocationIcon } from '../../icons';
import { storeData } from '../../utils/store-data';
import { getCoordinates } from '../../utils/get-coordinates';
import { getStoredData } from '../../utils/get-stored-data';
import { getCity } from '../../utils/get-city';
import { AVAILABLE_LOCATIONS, LOCATION, Location } from '../../utils/constants';

import './locations.styles.css';

interface LocationsProps {
	changeLocation: (location: Location) => void;
}

export const Locations = ({ changeLocation }: LocationsProps) => {
	const [currentLocation, setCurrentLocation] = useState<Location>(
		getStoredData(LOCATION)
	);
	const [switchedLocationMenu, setSwitchedLocationMenu] = useState(false);
	const [availableLocations, setAvailableLocations] = useState<Location[]>(
		getStoredData(AVAILABLE_LOCATIONS) || []
	);

	const switchLocationsMenu = () => {
		setSwitchedLocationMenu(!switchedLocationMenu);
	};

	const getCurrentPosition = async (): Promise<void> => {
		try {
			const coordinates = await getCoordinates();
			if (!coordinates) {
				console.error('Coordinates are undefined');
				return;
			}

			const { lat, lng } = coordinates;
			const newCity = await getCity(lat, lng);

			if (newCity) {
				const newLocation = {
					id: `${lat}${lng}`,
					name: newCity,
					lat,
					lng,
				};

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

			storeData(AVAILABLE_LOCATIONS, [...prev, newLocation]);
			changeLocationHandler(newLocation);
			changeLocation(newLocation);
			return [...prev, newLocation];
		});
	};

	const changeLocationHandler = (chosenLocation: Location): void => {
		setCurrentLocation(chosenLocation);
		changeLocation(chosenLocation);
		switchLocationsMenu();
	};

	const removeLocation = (locationId: string): void => {
		const updatedLocationsList = availableLocations.filter(
			(availableLocation) => availableLocation.id !== locationId
		);
		storeData(AVAILABLE_LOCATIONS, updatedLocationsList);
		setAvailableLocations(updatedLocationsList);
	};

	useEffect(() => {
		setCurrentLocation(getStoredData(LOCATION));
		setAvailableLocations(getStoredData(AVAILABLE_LOCATIONS) || []);
	}, []);

	const locationsClasses = clsx('locations', {
		'locations--active': switchedLocationMenu,
	});

	const headerClasses = clsx('locations__header', {
		'locations__header--empty': !currentLocation?.name,
	});

	return (
		<div className={locationsClasses}>
			<header className={headerClasses}>
				<button onClick={switchLocationsMenu}>
					<SearchLocationIcon />
				</button>
				{currentLocation?.name ? currentLocation.name : 'Choose location'}
			</header>
			<section className='locations__window'>
				<LocationsList
					locations={availableLocations}
					currentLocation={currentLocation}
					change={changeLocationHandler}
					remove={removeLocation}
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
				<div className='locations__closer' onClick={switchLocationsMenu}></div>
			</section>
		</div>
	);
};
