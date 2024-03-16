export function getLocalDate(
	dateValue: number,
	view: 'full' | 'long' | 'medium' | 'short' = 'medium'
): string {
	return new Intl.DateTimeFormat('en-GB', {
		dateStyle: view,
	}).format(dateValue);
}
