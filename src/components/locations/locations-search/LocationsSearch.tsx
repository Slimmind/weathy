import React, { useState } from 'react';
import clsx from 'clsx';
import { Location, SearchResult } from '../../../utils/constants';
import { SearchIcon } from '../../../icons';
import './locations-search.styles.css';

interface LocationsSearchProps {
	addLocationHandler: (location: Location) => void;
}

export const LocationsSearch: React.FC<LocationsSearchProps> = ({
	addLocationHandler,
}) => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

	const searchQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchQuery(query);
		if (query.length < 1) {
			setSearchResults([]);
		}
	};

	const currentLanguage = 'en';
	const apiKey = import.meta.env.VITE_GEOCODING_API_KEY;

	const searchCity = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch(
			`https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${apiKey}`
		);
		const data = await response.json();
		const results = data.map(
			({ country, lat, lon, name, state, local_names }) => ({
				id: `${lat}${lon}`,
				country,
				lat,
				lng: lon,
				name,
				state,
				localName: local_names[currentLanguage],
			})
		);
		setSearchResults(results);
	};

	const addLocation = (chosenLocation: Location): void => {
		addLocationHandler(chosenLocation);
		setSearchQuery('');
		setSearchResults([]);
	};

	const searchClasses = clsx('locations__search', {
		'locations__search--active': searchResults.length > 0,
	});

	const searchButtonClasses = clsx('locations__search-button', {
		'locations__search-button--highlighted':
			searchQuery.length > 1 && searchResults.length === 0,
	});

	return (
		<div className={searchClasses}>
			<form onSubmit={searchCity}>
				<div className='locations__search-field'>
					<input
						type='search'
						onChange={searchQueryHandler}
						className='locations__search-input'
						placeholder='Search...'
						value={searchQuery}
					/>
					<button type='submit' className={searchButtonClasses}>
						<SearchIcon />
					</button>
				</div>
			</form>
			<ul className='locations__suggestions'>
				{searchResults.map((searchResult) => (
					<li
						className='locations__suggestions-item'
						key={searchResult.id}
						onClick={() => addLocation(searchResult)}
					>
						{searchResult.name} (
						<em>
							{searchResult.country}, {searchResult.state},{' '}
							{searchResult.localName}
						</em>
						)
					</li>
				))}
			</ul>
		</div>
	);
};
