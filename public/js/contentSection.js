let container = document.getElementById('resultsContainer');
let incomeLink = document.getElementById('incomeLink');
let outcomeLink = document.getElementById('outcomeLink');
let title = document.getElementById('titleInputs');
let as = document.querySelectorAll('header a');

let realUrl = '';
let lists = [
	{
		url: '/user/categoryIncome',
		action: (res) => {
			fillList(res, 'id_categoria_ingresos', 'nom_categoria_ingresos');
		}
	},
	{
		url: '/user/categoryOutcome',
		action: (res) => {
			fillList(res, 'id_categoria_gastos', 'nom_categoria_gastos');
		}
	}
];
let actions = [
	{
		name: 'Eliminar',
		method: 'delete',
		url: replaceLink(realUrl, 'delete'),
		className: 'btn-delete',
		action: deleteField
	},
	{
		name: 'Actualizar',
		method: 'update',
		url: replaceLink(realUrl, 'update')	,
		className: 'btn-update',
		action: updateField
	}
];

incomeLink.addEventListener('click', resultQueriesEvent);
outcomeLink.addEventListener('click', resultQueriesEvent);

function updateField(e){
	e.preventDefault();
	let link = e.target;
	let row = link.parentNode.parentNode.children;
	let data = queryStringer({
		id: row[0].innerText
	});
	for(let field of row){
		if(field.children[0].className == 'item'){
			field.contentEditable = 'true';
		}
	}
	link.innerText = 'Confirmar Actualización';
	link.addEventListener('click', () => {
		let values = queryStringer({
			idCategoria: row[1].innerText,
			motivo: row[3].innerText,
			monto: row[4].innerText
		});
		let url = `${actions[1].url}?${data}`;
		ajax('POST', url, reclickLink, values);
	});
}

function deleteField(e){
	e.preventDefault();
	let link = e.target;
	let row = link.parentNode.parentNode.children;
	let data = queryStringer({
		id: row[0].innerText
	});
	let url = `${actions[0].url}?${data}`;
	ajax('POST', url, reclickLink);
}

function createForm(sectionName, url){
	let form = document.createElement('form');
	let inputMotivo = document.createElement('input');
	let inputMonto = document.createElement('input');
	let submitButton = document.createElement('input');
	let addUrl = replaceLink(url, 'add');
	let adUrl = replaceLink(url, 'category');
	title.innerText = sectionName;
	inputMotivo.id = 'motivo';
	inputMotivo.name = 'motivo';
	inputMotivo.type = 'text';
	inputMonto.id = 'monto';
	inputMonto.name = 'monto';
	inputMonto.type = 'text';
	submitButton.type = 'submit';
	submitButton.value = 'Añadir';
	form.action = addUrl;
	form.method = 'post';
	form.addEventListener('submit', submit);
	form.appendChild(inputMotivo);
	form.appendChild(inputMonto);
	form.appendChild(submitButton);
	for(let listItem in lists){
		if(addUrl == lists[listItem].url.replace('category', 'add')){
			ajax('GET', lists[listItem].url, lists[listItem].action)
		}
	}
	container.appendChild(form);
}

function replaceLink(url, textToReplace){
	return url.replace('read', textToReplace);
}

function queryStringer(queryObject){
	let queryString = '';
	for(let key in queryObject){
		queryString += (`${key}=${queryObject[key]}&`);
	}
	queryString = queryString.substr(0, queryString.length-1);
	return queryString;
}

function fillList(res, id, categ){
	let form = document.querySelector('#resultsContainer form');
	let select = document.createElement('select');
	select.innerHTML = '';
	select.id = 'idCategoria'
	res = JSON.parse(res);
	res.forEach((cat) => {
		let option = document.createElement('option');
		option.value = cat[id];
		option.innerText = cat[categ];
		select.appendChild(option);
	});
	form.prepend(select);
	container.appendChild(form);
}

function table(res){
	let table = document.createElement('table');
	res = JSON.parse(res);
	as.forEach((link) => {
	if(link.innerText == title.innerText){
			realUrl = link.pathname;
		}
	});
	actions.forEach((action) => {
		action.url = replaceLink(realUrl, action.method);
	});
	res.forEach((element) => {
		let properties = Object.getOwnPropertyNames(element)
		let tr = document.createElement('tr');
		properties.forEach((property) => {
			let td = document.createElement('td');
			let p = document.createElement('p');
			let text = document.createTextNode(element[property]);
			p.className = 'item'
			p.appendChild(text);
			td.appendChild(p);
			tr.appendChild(td);
		});
		actions.forEach((action) => {
			let td = document.createElement('td');
			let a = document.createElement('a');
			let text = document.createTextNode(action.name);
			a.href = `${action.url}`;
			a.className = action.className;
			a.addEventListener('click', action.action);
			a.appendChild(text);
			td.appendChild(a);
			tr.appendChild(td);
		});
		table.appendChild(tr);
	});
	table = formRow(table);
	container.prepend(table);
}

function formRow(table){
	let tr = document.createElement('tr');
	let tdId = document.createElement('td');
	let tdMotivo = document.createElement('td');
	let tdMonto = document.createElement('td');
	tdId.innerText = 'alimentacion'
	tdMotivo.innerText = 'deuda'
	tdMonto.innerText = '1222'
	tdId.contentEditable = 'true'
	tdMotivo.contentEditable = 'true'
	tdMonto.contentEditable = 'true'
	tr.appendChild(tdId);
	tr.appendChild(tdMotivo);
	tr.appendChild(tdMonto);
	table.appendChild(tr);
	return table;
}

function resultQueriesEvent(e){
	e.preventDefault();
	let url = this.pathname;
	let sectionName = this.innerText;
	container.innerHTML = '';
	createForm(sectionName, url);
	ajax('GET', url, table);
}

function submit(e){
	e.preventDefault();
	let idCategoria = document.getElementById('idCategoria').value;
	let motivo = document.getElementById('motivo').value;
	let monto = document.getElementById('monto').value;
	let data = queryStringer({
		idCategoria: idCategoria,
		motivo: motivo,
		monto: monto
	});
	ajax('POST', this.action, reclickLink, data);
}

function reclickLink(res){
	let a = document.querySelectorAll('a');
	a.forEach((link) => {
		if(link.innerText == title.innerText){
			link.click();
		}
	});
}