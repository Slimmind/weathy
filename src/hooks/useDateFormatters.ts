import { useMemo } from 'react';
import { useI18n } from '../i18n';

export const useDateFormatters = () => {
	const { language } = useI18n();
	const locale = language === 'ru' ? 'ru-RU' : 'en-GB';

	const formatters = useMemo(
		() => ({
			dayFormatter: new Intl.DateTimeFormat(locale, {
				weekday: 'long',
			}),
			shortDayFormatter: new Intl.DateTimeFormat(locale, {
				weekday: 'short',
			}),
			cardDateFormatter: new Intl.DateTimeFormat(
				locale === 'ru-RU' ? 'ru-RU' : 'en-US',
				{
					month: 'long',
					day: 'numeric',
				},
			),
		}),
		[locale],
	);

	return formatters;
};
