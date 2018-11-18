let xhr = new XMLHttpRequest();
function getAjax(url, callback = ''){
	xhr.open('GET', url, true);
	xhr.onload = () => {
		callback(xhr.responseText);
	}
	xhr.send();
}
function postAjax(url, options = '', callback = ''){
	console.log(options);
	xhr.open('POST', url, true);
	xhr.onload = () => {
		if(callback){
			callback(xhr.responseText);
		}
	}
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(options);
}
function setQueryString(parameters){
	console.log(parameters);
	let query = '';
	for(let parameter in parameters){
		query += `${parameter}=${parameters[parameter]}&`;
	}
	query = query.substr(0, query.length-1);	
	return query;
}