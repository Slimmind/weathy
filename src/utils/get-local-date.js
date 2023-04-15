export function getLocalDate(dateValue, view) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: view,
  }).format(dateValue);
}