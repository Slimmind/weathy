import { getStoredData } from './get-stored-data';
import { LocalStorage } from './constants';

export function getLocalDate(
	dateValue: number,
	view: 'full' | 'long' | 'medium' | 'short' = 'medium',
): string {
	const language = getStoredData(LocalStorage.LANGUAGE) || 'en';
	const locale = language === 'ru' ? 'ru-RU' : 'en-GB';
	return new Intl.DateTimeFormat(locale, {
		dateStyle: view,
	}).format(dateValue);
}
