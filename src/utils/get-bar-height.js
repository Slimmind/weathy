export function getBarHeight(data) {
  const tempValues = data.map((day) => day.maxTemp);
  const maxVal = Math.max(...tempValues);
  const minVal = Math.min(...tempValues);
  return data.map(
    (day) => `${Math.round((100 / maxVal) * day.maxTemp + 50)}px`
  );
}
