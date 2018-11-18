exports.getCurrentDate = () => {
	let date = new Date();
	return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}
exports.getCurrentProcedureDate = () => {
	let date = new Date();
	return `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;
}
exports.getCurrentProcedureWeek = () => {
	let date = new Date();
	let currentDay = date.getDate();
	let dayOfWeek = date.getDay();
	let first = (dayOfWeek == 0) ? currentDay : currentDay - dayOfWeek;
	let last = (dayOfWeek == 6) ? currentDay : currentDay + (6 - dayOfWeek);
	let week = {
		firstDay: `${date.getFullYear()}${date.getMonth()+1}${first}`,
		lastDay: `${date.getFullYear()}${date.getMonth()+1}${last}`
	}
	return week;
}
exports.getCurrentProcedureMonth = () => {
	let date = new Date();
	let daysOfMonth = new Date(date.getFullYear(), date.getMonth()+1, '00').getDate();
	let first = `${date.getFullYear()}${date.getMonth()+1}01`;
	let last = `${date.getFullYear()}${date.getMonth()+1}${daysOfMonth}`;
	let month = {
		firstDay: first,
		lastDay: last
	}
	return month;
}