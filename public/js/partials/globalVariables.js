let typeOfCome = 'Income';
let categoryName = 'Ingresos'
let editableCellsAttributes = [
    {
        name: 'contentEditable',
        value: 'true'
    }
];
let actions = [
    {
        name: 'Actualizar',
        url: `/user/update${typeOfCome}`,
        function: (e) => {
            e.preventDefault();
            let a = e.target;
            let tds = a.parentNode.parentNode.children
            for(let i = 0; i < tds.length-2; i++){
                tds[i] = setEditable(tds[i]);
            }
            a.innerText = 'Confirmar';
            a = addNewEventClick(a, (e) => {
                let data = setQueryString({
                    idCategoria: tds[1].innerText,
                    motivo: tds[3].innerText,
                    monto: tds[4].innerText,
                });
                let query = setQueryString({
                    id: tds[0].innerText
                });
                let url = `/user/update${typeOfCome}?${query}`;
                postAjax(url, data);
                reclick();
            });
        }
    },
    {
        name: 'Eliminar',
        url: `/user/delete${typeOfCome}`,
        function: (e) => {
            e.preventDefault();
            let a = e.target;
            let tds = a.parentNode.parentNode.children
            query = setQueryString({
                id: tds[0].innerText
            });
            let url = `/user/delete${typeOfCome}?${query}`;
            postAjax(url);
            reclick();
        }
    }
];
let resultsTableAttributes = [
    {
        name: 'id',
        value: 'tableOfResults'
    },
    {
        name: 'class',
        value: 'tableOfResults'
    },
    {
        name: 'border',
        value: '1'
    }
];
let mainContainer = document.getElementById('resultContainer');
let intervals = [
    {
        name: 'Diario',
        url: `/daily`,
        dropdown: getDaysOfMonth()
    },
    {
        name: 'Semanal',
        url: `/weekly`,
        dropdown: getWeeksOfMonth()
    },
    {
        name: 'Mensual',
        url: `/monthly`,
        dropdown: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }
];
let inputDateAttributes = [
    {
        name:'type',
        value:'date'
    },
    {
        name: 'disabled',
        value: 'true'
    }
];
let options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Reportes'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
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
    },
    series: [{
        name: 'Brands',
        colorByPoint: true
    }]
};
function getDaysOfMonth(){
    let days = [];
    let date = new Date();
    let daysOfMonth = new Date(date.getFullYear(), date.getMonth()+1, '00').getDate();
    for(let i = 0; i < daysOfMonth; i++){
        days.push(i+1);
    }
    return days;
}
function getWeeksOfMonth(){
    let weeks = [];
    let date = new Date();
    let weeksOfMonth = new Date(date.getFullYear(), date.getMonth()+1, '00').getDate() / 7;
    for(let i = 0; i < weeksOfMonth; i++){
        weeks.push(i+1);
    }
    return weeks;
}