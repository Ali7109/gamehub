export default function formatFirestoreTimestamp(timestamp) {
	const now = new Date();
	const inputDate = timestamp.toDate();
	const timeDifference = now - inputDate;
	let hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

	if (timeDifference < 1000 * 60 * 60) {
		let minutesAgo = Math.floor(timeDifference / (1000 * 60));
		if (minutesAgo < 0) minutesAgo = 0;
		return `${minutesAgo} min ago`;
	} else if (hoursAgo < 24) {
		if (hoursAgo === 1) return `${hoursAgo} hr ago`;
		if (hoursAgo < 0) hoursAgo = 0;
		return `${hoursAgo} hrs ago`;
	} else {
		const options = { year: "numeric", month: "short", day: "numeric" };
		const formattedDate = inputDate.toLocaleDateString("en-US", options);
		return formattedDate;
	}
}

export function blogTimeStamp(timestampString) {
	const timestamp = new Date(timestampString);
	const currentYear = new Date().getFullYear();

	const year =
		timestamp.getFullYear() === currentYear ? "" : timestamp.getFullYear();
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const month = monthNames[timestamp.getMonth()];
	const day = String(timestamp.getDate()).padStart(2, "0");
	const hours = String(timestamp.getHours()).padStart(2, "0");
	const minutes = String(timestamp.getMinutes()).padStart(2, "0");

	const formattedDate = `${year}${year ? "-" : ""}${month} ${day}`;
	const formattedTime = `${hours}:${minutes}`;

	return `${formattedDate} @ ${formattedTime}`;
}
