interface BarData {
  iconCode: number;
  maxTemp: number;
  timestamp: number;
}

export function getBarHeight(data: BarData[]): string[] {
  const tempValues = data.map((day) => day.maxTemp);
  const maxVal = Math.max(...tempValues);
  const minVal = Math.min(...tempValues);
  return data.map(
    (day: BarData) => `${Math.round((100 / maxVal) * day.maxTemp + 50)}px`
  );
}
