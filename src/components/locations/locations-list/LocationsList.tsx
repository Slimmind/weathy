import clsx from 'clsx';
import { Location } from '../../../utils/constants';
import { useI18n } from '../../../i18n';
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

	const { t } = useI18n();

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
						aria-label={t('a11y.remove_location')}
						onClick={() => remove(location.id)}
					></button>
				</li>
			))}
		</ul>
	);
};
