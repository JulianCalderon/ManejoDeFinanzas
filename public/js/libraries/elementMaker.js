function createNewElement(typeOfElement, attributes = []){
	let newElement = document.createElement(typeOfElement);
	for(let attribute of attributes){
		newElement[attribute.name] = attribute.value;
	}
	return newElement;
}
function createNewTextNode(innerText = ''){
	let newTextNode = document.createTextNode(innerText);
	return newTextNode;
}
function appendNewChildren(element, children = []){
	let newElement = element;
	for(let child of children){
		newElement.appendChild(child);
	}
	return newElement;
}
function fillEditableTable(table, content){
	let newTable = table;
	for(let row of content){
		let tr = createNewElement('tr');
		for(let property in row){
			let text = createNewTextNode(row[property]);
			let tdAttributes;
			if(property == `id_categoria_${categoryName}`){
				tdAttributes = [
					{
						name: 'style',
						value: 'display: none;'
					}
				];
			}
			let td = createNewElement('td', tdAttributes);
			td = appendNewChildren(td, [text]);
			tr = appendNewChildren(tr, [td]);
		}
		table = appendNewChildren(table, [tr]);
	}
	return newTable;
}
function addRowActions(table){
	let newTable = table;
	let rows = newTable.children;
	for(let i = 0; i < rows.length; i++){
		for(let action of actions){
			let aAttributes = [
				{
					name: 'href',
					value: action.url
				}
			];
			let text = createNewTextNode(action.name);
			let a = createNewElement('a', aAttributes);
			let td = createNewElement('td');
			a = addNewEventClick(a, action.function);
			a = appendNewChildren(a, [text]);
			td = appendNewChildren(td, [a]);
			rows[i] = appendNewChildren(rows[i], [td]);
		}
	}
	return newTable;
}
function addNewEventClick(a, action){
	let newA = a;
	let url = a.pathname;
	newA.addEventListener('click', action);
	return newA;
}
function insertAddRow(table){
	let newTable = table;
	let aAttributes = [
		{
			name: 'href',
			value: `/user/add${typeOfCome}`
		}
	];
	let addAttributes = [
		{
			name: 'colSpan',
			value: actions.length
		}
	];
	let selectAttributes = [
		{
			name: 'colSpan',
			value: 2
		}
	];
	let text = createNewTextNode('Añadir');
	let a = createNewElement('a', aAttributes);
	let tdSelect = createNewElement('td', selectAttributes);
	let tdAdd = createNewElement('td', addAttributes);
	let tr = createNewElement('tr');
	let categorySelect = createNewElement('select');
	let tdMotivio = createNewElement('td', editableCellsAttributes);
	let tdMonto = createNewElement('td', editableCellsAttributes);
	getAjax(`/user/category${typeOfCome}`, (res) => {
		res = JSON.parse(res);
		for(let category of res){
			let text = createNewTextNode(category[`nom_categoria_${categoryName}`]);
			let option = createNewElement('option');
			option.value = category[`id_categoria_${categoryName}`];
			option = appendNewChildren(option, [text]);
			categorySelect = appendNewChildren(categorySelect, [option]);
		}
	});
	a = appendNewChildren(a, [text]);
	a = addNewEventClick(a, insertLinkFunction);
	tdAdd = appendNewChildren(tdAdd, [a]);
	tdSelect = appendNewChildren(tdSelect, [categorySelect]);
	tr = appendNewChildren(tr, [tdSelect, tdMotivio, tdMonto, tdAdd]);
	newTable = appendNewChildren(newTable, [tr]);
	return newTable;
}
function setEditable(element){
	let newElement = element;
	newElement.contentEditable = 'true';
	return newElement;
}
function reclick(){
	document.querySelector(`a[href="/user/read${typeOfCome}"]`).click();
}
function insertLinkFunction(e){
	e.preventDefault();
	let a = e.target;
	let tds = a.parentNode.parentNode.children
	let data = setQueryString({
		idCategoria: tds[0].children[0].value,
		motivo: tds[1].innerText,
		monto: tds[2].innerText,
	});
	let url = `/user/add${typeOfCome}`;
	postAjax(url, data, reclick);
	reclick();
}