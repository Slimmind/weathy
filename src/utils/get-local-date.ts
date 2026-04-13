import { getStoredData } from './get-stored-data';
import { LocalStorage } from './constants';

export function getLocalDate(dateValue: number): string {
	const language = getStoredData(LocalStorage.LANGUAGE) || 'en';
	const locale = language === 'ru' ? 'ru-RU' : 'en-GB';
	const formatted = new Intl.DateTimeFormat(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
	}).format(dateValue);

	return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
