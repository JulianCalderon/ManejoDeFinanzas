let graphicsLink = document.getElementById('dashboardLink');
graphicsLink.addEventListener('click', graphicsEvent);
graphicsLink.click();
function getCalendar(){
	let form = document.createElement('form');
	let initialLabel = document.createElement('label');
	let initialDate = document.createElement('input');
	let finalLabel = document.createElement('label');
	let finalDate = document.createElement('input');
	form.id = 'calendarForm';
	form.style.display = '';
	initialLabel.innerText = 'Fecha inicial';
	initialDate.type = 'date';
	finalLabel.innerText = 'Fecha final';
	finalDate.type = 'date';
	console.log(initialDate);
	form.appendChild(initialLabel);
	form.appendChild(initialDate);
	form.appendChild(finalLabel);
	form.appendChild(finalDate);
	return form;
}
function graphicsEvent(e){
	e.preventDefault();
	container.innerHTML = '';
	let div = document.createElement('div');
	let filtros = [
		{
			nombre: 'General',
			value: 'general'
		},
		{
			nombre: 'Diario',
			value: 'daily'
		},
		{
			nombre: 'Semanal',
			link: ''
		},
		{
			nombre: 'Mensual',
			link: ''
		},
		{
			nombre: 'Personalizado',
			link: ''
		}
	];
	let select = document.createElement('select');
	let selectCome = document.createElement('select');
	let income = document.createElement('option');
	let outcome = document.createElement('option');
	let textIn = document.createTextNode('Income');		
	let textOut = document.createTextNode('Outcome');		
	select.id = 'selectFilter';
	selectCome.id = 'selectCome';
	income.value = 'incomes';
	outcome.value = 'outcomes';
	income.appendChild(textIn);
	outcome.appendChild(textOut);
	income.selected = 'true';
	selectCome.style.display = 'none';
	selectCome.appendChild(income);
	selectCome.appendChild(outcome);
	select.addEventListener('change', () => {
		let data = queryStringer({
			chart: select.value,
			table: selectCome.value
		});
		let url = `/reports?${data}`
		if(select.value == 'general'){
			let comes = document.getElementById('selectCome');
			let calendar = document.getElementById('calendarForm');
			comes.style.display = 'none';
			calendar.style.display = 'none';
		}else{
			let comes = document.getElementById('selectCome');
			let calendar = document.getElementById('calendarForm');
			comes.style.display = '';
			calendar.style.display = '';
		}
		ajax('GET', url, generateGraph);
	});
	selectCome.addEventListener('change', () => {
		let data = queryStringer({
			chart: select.value,
			table: selectCome.value
		});
		let url = `/reports?${data}`
		ajax('GET', url, generateGraph);
	});
	filtros.forEach((filtro) => {
		let option = document.createElement('option');
		option.value = filtro.value;
		if(filtro.value == 'general'){
			option.selected = 'true';
		}
		let text = document.createTextNode(filtro.nombre);		
		option.appendChild(text);
		select.appendChild(option);
	});
	div.id = 'graphContainer';
	div.appendChild(select);
	div.appendChild(selectCome);

	div.appendChild(getCalendar());

	document.getElementById('titleInputs').innerText = '';
	document.getElementById('titleInputs').appendChild(div);
	let data = queryStringer({
		chart: select.value,
		table: selectCome.value
	});
	let url = `/reports?${data}`
	ajax('GET', url, generateGraph);
}
function fillSeriesGeneral(res, array){
	let newArray = array;
	console.log(newArray);
	res.forEach((element) => {
		Object.keys(element).forEach((key) => {
			newArray.push({
				name: key,
				y: element[key]
			});
		});
	});
	return newArray;
}
function fillSeriesCustom(res, array){
	let newArray = array;
	// newArray[0].name = name
	res.forEach((element) => {
		newArray.push({
			name: element[Object.keys(element)[0]],
			y: element[Object.keys(element)[1]]
		});
	});
	return newArray;
}
function generateGraph(res){
	res = JSON.parse(res);
	let select = document.querySelector('#selectFilter').value;
	let selectCome = document.querySelector('#selectCome').value;
	let seriesData = [];
	let options = {};
	options.chart = {
		type: 'pie'
	};
	options.plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    };
	options.series = [{}];
	if(select == 'general'){
		options.title = {
			text: `Reporte`
		};
		options.subtitle = {
			text: 'General'
		};
		seriesData = fillSeriesGeneral(res, seriesData);
	}else{
		switch(selectCome){
			case 'incomes':
				options.title = {
					text: `Reporte ${selectCome}` 
				};
				options.subtitle = {
					text: 'Ingresos'
				};
				break;
			case 'outcomes':
				options.title = {
					text: `Reporte ${selectCome}` 
				};
				options.subtitle = {
					text: 'Gastos'
				};
				break;
		}
		seriesData = fillSeriesCustom(res, seriesData);
	}
	console.log(seriesData);
	options.series[0].data = seriesData;
	var myChart = Highcharts.chart('resultsContainer', options);
}