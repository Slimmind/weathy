import { getLocalDate } from "./get-local-date";

export const getFullDate = (timestamp = Date.now()): string =>
		getLocalDate(new Date(timestamp), 'full');