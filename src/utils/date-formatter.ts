export const createFormatters = (locale: string = 'en-GB') => ({
	dayFormatter: new Intl.DateTimeFormat(locale, {
		weekday: 'long',
	}),
	shortDayFormatter: new Intl.DateTimeFormat(locale, {
		weekday: 'short',
	}),
	cardDateFormatter: new Intl.DateTimeFormat(
		locale === 'ru' ? 'ru-RU' : 'en-US',
		{
			month: 'long',
			day: 'numeric',
		},
	),
	hourFormatter: new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: false,
	}),
});

// Default formatters for backwards compatibility (using en-GB)
export const DAY_FORMATTER = new Intl.DateTimeFormat('en-GB', {
	weekday: 'long',
});
export const SHORT_DAY_FORMATTER = new Intl.DateTimeFormat('en-GB', {
	weekday: 'short',
});
export const CARD_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
	month: 'long',
	day: 'numeric',
});
export const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
	hour: 'numeric',
	minute: 'numeric',
	hour12: false,
});
