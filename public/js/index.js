function createResultsTable(come, idCategory){
	typeOfCome = come;
	categoryName = idCategory;
	getAjax(`/user/read${come}`, setTable);	
}
document.getElementById('incomeLink').addEventListener('click', (e) => {
	e.preventDefault();
	createResultsTable('Income', 'ingresos');
	setTitle(e.target.innerText);
});
document.getElementById('outcomeLink').addEventListener('click', (e) => {
	e.preventDefault();
	createResultsTable('Outcome', 'gastos');
	setTitle(e.target.innerText);
});
document.getElementById('dashboardLink').addEventListener('click', (e) => {
	e.preventDefault();
	setChartContainer();
	document.querySelector('.generalButton').click();
	setTitle(e.target.innerText);
});
document.getElementById('dashboardLink').click();
function setTable(res){
	res = JSON.parse(res);
	let table = createNewElement('table', resultsTableAttributes);
	table = fillEditableTable(table, res);
	table = addRowActions(table);
	table = insertAddRow(table);
	document.getElementById('resultContainer').innerHTML = '';
	document.getElementById('resultContainer').appendChild(table);
}
function setTitle(title){
	document.getElementById('mainTitle').innerText = title;
}