import { LastUpdateValues } from './constants';

export const checkLastUpdateTime = (time: Date): string => {
	const currentTime = new Date();

	const timeDifference = currentTime.getTime() - time.getTime();

	const differenceInHours = timeDifference / (1000 * 60 * 60);

	return differenceInHours > 4
		? LastUpdateValues.OBSOLETE
		: differenceInHours > 1
		? LastUpdateValues.OUTDATED
		: '';
};
