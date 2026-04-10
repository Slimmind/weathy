import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getCurrentTime } from '../../utils/get-current-time';
import { ClockIcon } from '../../icons';
import './last-update.styles.css';
import { checkLastUpdateTime } from '../../utils/check-last-update-time';
import { LastUpdateValues } from '../../utils/constants';
import UpdateButton from './update-button';
import { useI18n } from '../../i18n';

type LastUpdateProps = {
	updateForecast: () => void;
	time: Date;
};

export const LastUpdate = ({ updateForecast, time }: LastUpdateProps) => {
	const [infoStatus, setInfoStatus] = useState<string>('');
	const { t } = useI18n();

	useEffect(() => {
		const intervalId = setInterval(() => {
			setInfoStatus(checkLastUpdateTime(time));
		}, 3600);

		return () => {
			clearInterval(intervalId);
		};
	}, [time]);

	const classes = clsx(
		'last-update-info',
		infoStatus && `last-update-info--${infoStatus}`,
	);

	const updateInfoText = (): string =>
		infoStatus === LastUpdateValues.OUTDATED
			? t('message.last_update_hour')
			: infoStatus === LastUpdateValues.OBSOLETE
				? t('message.outdated')
				: t('message.last_updated_at', { time: getCurrentTime(time) });

	const IconComponent = () =>
		infoStatus === LastUpdateValues.OUTDATED ||
		infoStatus === LastUpdateValues.OBSOLETE ? (
			<UpdateButton updateHandler={updateForecast} />
		) : (
			<span className='last-update-info__icon'>
				<ClockIcon />
			</span>
		);

	return (
		<div className={classes}>
			<IconComponent />
			{updateInfoText()}
		</div>
	);
};
