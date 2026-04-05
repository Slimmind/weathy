import { useState, useCallback, lazy } from 'react';
import clsx from 'clsx';
import { LocationIcon, SearchLocationIcon } from '../../icons';
import { storeData } from '../../utils/store-data';
import { getCoordinates } from '../../utils/get-coordinates';
import { getStoredData } from '../../utils/get-stored-data';
import { getCity } from '../../utils/get-city';
import { LocalStorage, Location } from '../../utils/constants';
import './locations.styles.css';

const LocationsList = lazy(() => import('./locations-list'));
const LocationsSearch = lazy(() => import('./locations-search'));

interface LocationsProps {
	changeLocation: (newLocation: Location) => void;
	toggleMenu: (isMenuActive: boolean) => void;
}

export const Locations = ({ changeLocation, toggleMenu }: LocationsProps) => {
	const [switchedLocationMenu, setSwitchedLocationMenu] = useState(false);
	const [availableLocations, setAvailableLocations] = useState<Location[]>(
		() => getStoredData(LocalStorage.AVAILABLE_LOCATIONS) || [],
	);

	const currentLocation = getStoredData<Location>(LocalStorage.LOCATION);

	const switchLocationsMenu = useCallback(() => {
		setSwitchedLocationMenu((prev) => !prev);
		toggleMenu(!switchedLocationMenu);
	}, [switchedLocationMenu, toggleMenu]);

	const getCurrentPosition = useCallback(async (): Promise<void> => {
		try {
			const coordinates = await getCoordinates();
			if (!coordinates) return console.error('Coordinates are undefined');

			const { lat, lng } = coordinates;
			const newCity = await getCity(lat, lng);

			if (newCity) {
				const newLocation = { id: `${lat}${lng}`, name: newCity, lat, lng };
				addLocation(newLocation);
			}
		} catch (error) {
			console.error('Error getting current position:', error);
		}
	}, []);

	const addLocation = useCallback(
		(newLocation: Location): void => {
			setAvailableLocations((prev) => {
				if (prev.some((item) => item.id === newLocation.id)) return prev;

				const updatedLocations = [...prev, newLocation];
				storeData(LocalStorage.AVAILABLE_LOCATIONS, updatedLocations);
				changeLocation(newLocation);
				return updatedLocations;
			});
		},
		[changeLocation],
	);

	const changeLocationHandler = useCallback(
		(chosenLocation: Location): void => {
			changeLocation(chosenLocation);
			switchLocationsMenu();
		},
		[changeLocation, switchLocationsMenu],
	);

	const removeLocation = useCallback(
		(locationId: string): void => {
			const updatedLocationsList = availableLocations.filter(
				(availableLocation) => availableLocation.id !== locationId,
			);
			storeData(LocalStorage.AVAILABLE_LOCATIONS, updatedLocationsList);
			setAvailableLocations(updatedLocationsList);
		},
		[availableLocations],
	);

	const locationsClasses = clsx('locations', {
		'locations--active': switchedLocationMenu,
	});

	const headerClasses = clsx('locations__header', {
		'locations__header--empty': !currentLocation?.name,
	});

	return (
		<div className={locationsClasses}>
			<header className={headerClasses}>
				<button
					className='locations__header-button'
					onClick={switchLocationsMenu}
					aria-label='choose location button'
				>
					<SearchLocationIcon />
					<span className='locations__header-text'>
						{currentLocation?.name ? currentLocation.name : 'Choose location'}
					</span>
				</button>
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
						aria-label='get current location'
					>
						<LocationIcon /> Get current position
					</button>
				</footer>
				<div className='locations__closer' onClick={switchLocationsMenu}></div>
			</section>
		</div>
	);
};
