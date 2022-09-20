const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export function dayDifference(date1: Date, date2: Date) {
	const timeDiff = Math.abs(date2.getTime() - date1.getTime());
	const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
	return diffDays;
}

export const getDatesInRange = (startDate: Date, endDate: Date) => {
	const start = new Date(startDate);
	const end = new Date(endDate);

	const date = new Date(start.getTime());

	const dates: number[] = [];
	while (date <= end) {
		dates.push(new Date(date).getTime());
		date.setDate(date.getDate() + 1);
	}
	return dates;
};
