exports.getCurrentDate = () => {
	let date = new Date();
	console.log(date.getWeek());
	return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}