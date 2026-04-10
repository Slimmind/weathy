import { useState, useCallback } from 'react';
import clsx from 'clsx';
import { Location, SearchResult } from '../../../utils/constants';
import { SearchIcon } from '../../../icons';
import { env } from '../../../utils/env';
import { useI18n } from '../../../i18n';
import './locations-search.styles.css';

interface LocationsSearchProps {
	addLocationHandler: (location: Location) => void;
}

export const LocationsSearch: React.FC<LocationsSearchProps> = ({
	addLocationHandler,
}) => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [error, setError] = useState<string>('');
	const { t } = useI18n();

	const searchQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchQuery(query);
		if (query.length < 1) {
			setSearchResults([]);
		}
	};

	const currentLanguage = 'en';
	const apiKey = env.GEOCODING_API_KEY;

	const searchCity = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${apiKey}`,
			);
			const data = await response.json();

			if (Array.isArray(data)) {
				const results = data.map(
					({ country, lat, lon, name, state, local_names }) => ({
						id: `${lat}${lon}`,
						country,
						lat,
						lng: lon,
						name,
						state,
						localName: local_names && local_names[currentLanguage],
					}),
				);

				setSearchResults(results);

				if (results.length === 0) {
					setError(t('error.not_found', { searchQuery }));
				} else {
					setError('');
				}
			} else {
				setError(t('error.api_response'));
				setSearchResults([]);
			}
		} catch (error) {
			console.error('Error fetching city data:', error);
			setError(t('error.fetch_data'));
			setSearchResults([]);
		}
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

	const provideLocationInfo = ({ country, state, localName }): string => {
		let resultString = country;

		if (state) {
			resultString += ` , ${state}`;
		}

		if (localName) {
			resultString += ` , ${localName}`;
		}

		return resultString;
	};

	return (
		<div className={searchClasses}>
			<form onSubmit={searchCity}>
				<div className='locations__search-field'>
					<input
						type='search'
						onChange={searchQueryHandler}
						className='locations__search-input'
						placeholder={t('location.search')}
						value={searchQuery}
					/>
					<button
						type='submit'
						className={searchButtonClasses}
						aria-label={t('a11y.search_location')}
					>
						<SearchIcon />
					</button>
				</div>
			</form>
			{error && (
				<div className='locations__search-error-message'>
					<p>{error}</p>
					<p>{t('location.suggestion')}</p>
				</div>
			)}
			<ul className='locations__suggestions'>
				{searchResults.map((searchResult) => (
					<li
						className='locations__suggestions-item'
						key={searchResult.id}
						onClick={() => addLocation(searchResult)}
					>
						{searchResult.name} (<em>{provideLocationInfo(searchResult)}</em>)
					</li>
				))}
			</ul>
		</div>
	);
};
