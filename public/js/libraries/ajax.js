function ajax(method, url, callback, options){
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.onload = () => {
		callback(xhr.responseText);
	}
	if(method == 'POST'){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(options);
	}else if(method == 'GET'){
		xhr.send();
	}
}