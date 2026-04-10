import React from 'react';
import { getIcon } from '../../../utils/get-icon';
import { HOUR_FORMATTER } from '../../../utils/date-formatter';
import { InfoGroup } from '../../info-group/InfoGroup';
import { useI18n } from '../../../i18n';
import './hour-row.styles.css';

interface HourRowProps {
	data: {
		timestamp: number;
		iconCode: number;
		temp: number;
		feelsLike: number;
		windSpeed: number;
		precip: number;
	};
}

export const HourRow = React.memo(({ data }: HourRowProps) => {
	const { timestamp, iconCode, temp, feelsLike, windSpeed, precip } = data;
	const hour = HOUR_FORMATTER.format(timestamp);
	const IconComponent = getIcon(iconCode, timestamp) || null;
	const { t } = useI18n();

	return (
		<li className='hour-section__row'>
			{hour}
			<div className='weather-icon'>{IconComponent && <IconComponent />}</div>
			<InfoGroup
				label={t('weather.temp')}
				value={`${temp}${String.fromCharCode(176)}`}
			/>
			<InfoGroup
				label={t('weather.fl_temp')}
				value={`${feelsLike}${String.fromCharCode(176)}`}
			/>
			<InfoGroup
				label={t('weather.wind')}
				value={`${windSpeed}${t('unit.wind')}`}
			/>
			<InfoGroup
				label={t('weather.precip')}
				value={`${precip}${t('unit.precip')}`}
			/>
		</li>
	);
});
