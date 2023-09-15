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
