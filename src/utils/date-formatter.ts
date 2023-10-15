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
});
