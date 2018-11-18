function setChartContainer(){
	mainContainer.innerHTML = '';
	let graphicChartAttributes = [
		{
			name: 'id',
			value: 'chartContainer'
		}
	];
	let div = createNewElement('div', graphicChartAttributes);
    let divButtons = createFiltersDiv();
    mainContainer.appendChild(divButtons);
	mainContainer.appendChild(div);
}
function generateChart(url){
    getAjax(`/reports${url}`, (res) => {
        res = JSON.parse(res);
        options.series[0].data = [];
        for(let data of res){
            let row = {
                name: data.categoria,
                y: data.monto
            }
            options.series[0].data.push(row);
        }
        let myChart = Highcharts.chart('chartContainer', options);
    });
}
function createFiltersDiv(){
    let newDiv = createNewElement('div');
    let generalButtonText = createNewTextNode('General');
    let filterSelect = createNewElement('select');
    let filterDateCheck = createNewElement('input', [{name:'type', value:'checkbox'}]);
    let generalButton = createNewElement('button');
    let toogleComeButton = createNewElement('button');
    let toogleText = createNewTextNode('Ingresos');
    let initialDate = createNewElement('input', inputDateAttributes);
    let finalDate = createNewElement('input', inputDateAttributes);
    filterSelect.addEventListener('change', dropdownSetDate);
    generalButton = appendNewChildren(generalButton, [generalButtonText]);
    generalButton = addNewEventClick(generalButton, generalButtonGenerate);
    newDiv = appendNewChildren(newDiv, [generalButton]);
    toogleComeButton = appendNewChildren(toogleComeButton, [toogleText]);
    toogleComeButton = addNewEventClick(toogleComeButton, comeChanger);
    newDiv = appendNewChildren(newDiv, [toogleComeButton]);
    for(let interval of intervals){
        let name = createNewTextNode(interval.name);
        let filterButton = createNewElement('button');
        filterButton = appendNewChildren(filterButton, [name]);
        filterButton = addNewEventClick(filterButton, (e) => {
            let inputsDate = document.querySelectorAll('input[type="date"]');
            let select = document.querySelector('select');
            select.id = e.target.innerText;
            let query = setQueryString({
                firstDay: inputsDate[0].value.replace(/-/g, ''),
                lastDay: inputsDate[1].value.replace(/-/g, '')
            });
            select.innerHTML = '';
            for(let item in interval.dropdown){
                let text = createNewTextNode(interval.dropdown[item]);
                let option = createNewElement('option');
                option = appendNewChildren(option, [text]);
                option.value = parseInt(item) + 1
                select = appendNewChildren(select, [option]);
            }
            options.title.text = `Reporte ${e.target.innerText} de ${categoryName}`
            interval.url = interval.url.replace(typeOfCome, '');
            interval.url += typeOfCome;
            url = `${interval.url}?${query}`
            generateChart(url);
        });
        newDiv = appendNewChildren(newDiv, [filterButton]);
    }
    filterDateCheck = addNewEventClick(filterDateCheck, (e) => {
        let inputsDate = document.querySelectorAll('input[type="date"]');
        if(e.target.checked){
            for(let input of inputsDate){
                input.disabled = false;
            }
        }else{
            for(let input of inputsDate){
                input.disabled = true;
            }
        }
    });
    newDiv = appendNewChildren(newDiv, [filterSelect]);
    newDiv = appendNewChildren(newDiv, [initialDate, finalDate]);
    newDiv = appendNewChildren(newDiv, [filterDateCheck]);
    return newDiv;
}
function setDate(date){
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    if(day < 10){
        day = `0${day}`
    }
    if(month < 10){
        month = `0${month}`
    }
    console.log(month, day, year);
    return `${year}-${month}-${day}`
}
function dropdownSetDate(e){
    let dropdownFilter = e.target;
    let date = new Date();
    let correctFirstDate = '';
    let correctLastDate = '';
    if(dropdownFilter.id == 'Diario'){
        correctFirstDate = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${dropdownFilter.value}`);
        correctLastDate = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${dropdownFilter.value}`);
    }else if(dropdownFilter.id == 'Semanal'){
        let date = new Date(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${(parseInt(dropdownFilter.value)*7)}`);
        console.log('Date'+date);
        let currentDay = date.getDate();
        let dayOfWeek = date.getDay();
        let first = (dayOfWeek == 0) ? currentDay : currentDay - dayOfWeek;
        let last = (dayOfWeek == 6) ? currentDay : currentDay + (6 - dayOfWeek);
        console.log(first, last);
        correctFirstDate = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${first+1}`);
        correctLastDate = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${last+1}`);
    }else if(dropdownFilter.id == 'Mensual'){
        let daysOfMonth = new Date(date.getFullYear(), parseInt(dropdownFilter.value), '00').getDate();
        let first = 1;
        let last = daysOfMonth;
        console.log('last'+last);
        correctFirstDate = new Date(`${date.getFullYear()}-${parseInt(dropdownFilter.value)}-${first}`);
        correctLastDate = new Date(`${date.getFullYear()}-${parseInt(dropdownFilter.value)}-${last}`);
    }
    firstDay = setDate(correctFirstDate);
    lastDay = setDate(correctLastDate);
    console.log(firstDay, lastDay);
    e.target.nextSibling.value = firstDay;
    e.target.nextSibling.nextSibling.value = lastDay;
    for(let button of document.querySelectorAll(`button`)){
        if(button.innerText == e.target.id){
            button.click();
        }
    }
}
function generalButtonGenerate(e){
    e.preventDefault();
    options.title.text = `Reporte ${e.target.innerText}`
    getAjax('/reports', (res) => {
        res = JSON.parse(res);
        options.series[0].data = [];
        for(let data of res){
            let row = [
                {
                    name: 'Ingresos',
                    y: data.ingreso
                },
                {
                    name: 'Gastos',
                    y: data.gasto
                }
            ];
            options.series[0].data = row;
        }
        let myChart = Highcharts.chart('chartContainer', options);
    });
}
function comeChanger(e){
    let toogleComeButton = e.target;
    if(toogleComeButton.innerText == 'Ingresos'){
        toogleComeButton.innerText = 'Gastos';
        for(let interval of intervals){
            interval.url = interval.url.replace(typeOfCome, '');
        }
        typeOfCome = 'Outcome';
        categoryName = 'Gastos';
    }else if(toogleComeButton.innerText == 'Gastos'){
        toogleComeButton.innerText = 'Ingresos';
        for(let interval of intervals){
            interval.url = interval.url.replace(typeOfCome, '');
        }
        typeOfCome = 'Income';
        categoryName = 'Ingresos';
    }
}