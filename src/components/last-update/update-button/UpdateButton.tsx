import React, { useState } from 'react';
import clsx from 'clsx';
import { UpdateIcon } from '../../../icons';
import { useI18n } from '../../../i18n';
import './update-button.styles.css';

interface UpdateButtonProps {
	updateHandler: () => void;
}

export const UpdateButton = ({ updateHandler }: UpdateButtonProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const { t } = useI18n();

	const updateForecast = () => {
		setLoading(true);
		updateHandler();
	};

	const classes = clsx('update-button', loading && 'update-button--loading');

	return (
		<button
			className={classes}
			onClick={updateForecast}
			aria-label={t('a11y.update_forecast')}
		>
			<UpdateIcon />
		</button>
	);
};
