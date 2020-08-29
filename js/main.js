


var stateNames = [];
var stateConfirmCase = [];



var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: stateNames,
        datasets: [{
            label: '# Confirmed Cases',
            data: stateConfirmCase,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});







async function getData() {
    const response = await fetch("https://api.covid19india.org/v4/data.json");
    const data1 = await response.json();
    let data = Object.entries(data1);
    console.log(data);

    if (data.length > 0){
        
    var html = ""
    data.forEach((state) => {

        if(state[0]=="TT"){
            //Dont Write the total Cases
        }
        else{
            stateNames.push(state[0]);
            stateConfirmCase.push(state[1].total.confirmed);

            let activeCases = state[1].total.confirmed - state[1].total.recovered - state[1].total.deceased

            // console.log(state)
            html += "<tr>";
            html += '<td>' + state[0] + '</td>';
            if(Number.isInteger(state[1].total.confirmed)){
                html += '<td>' + state[1].total.confirmed + '</td>';
            } else{
                html += '<td>' + 'N/A' + '</td>';
            }
            if(Number.isInteger(activeCases)){
                html += '<td>' + activeCases + '</td>';
            } else{
                html += '<td>' + 'N/A' + '</td>';
            }
            if(Number.isInteger(state[1].total.recovered)){
                html += '<td>' + state[1].total.recovered + '</td>';
            } else{
                html += '<td>' + 'N/A' + '</td>';
            }
            if(Number.isInteger(state[1].total.deceased)){
                html += '<td>' + state[1].total.deceased + '</td>';
            } else{
                html += '<td>' + 'N/A' + '</td>';
            }
            html += "</tr>";

        }
    });

    const table = document.querySelector('.corona-table');
    table.innerHTML += html;
    }

}
getData()



async function getWorldData() {
    const response = await fetch("https://covid-19.dataflowkit.com/v1");
    const data1 = await response.json();
    let data = Object.entries(data1);
    console.log(data);

    if (data.length > 0){
        
    var html = ""
    data.forEach((state) => {
        // console.log(state)
        html += "<tr>";
        html += '<td>' + state[1].Country_text + '</td>';
        html += '<td>' + state[1]['Total Cases_text'] + '</td>';
        html += '<td>' + state[1]['Active Cases_text'] + '</td>';
        html += '<td>' + state[1]['Total Recovered_text'] + '</td>';
        html += '<td>' + state[1]['Total Deaths_text'] + '</td>';
        html += "</tr>";

    });

    const table = document.querySelector('.corona-table-world');
    table.innerHTML += html;
    }

}
getWorldData()











let MH_ConfirmCase = []
let MH_RecoverCases = []
let MH_DeathCases = []
let MH_Dates = []


async function getMHData() {
    const response = await fetch("https://api.covid19india.org/v4/timeseries.json");
    const data1 = await response.json();
    let data = Object.entries(data1);
    
    let mh = data[18];
    let mhObjects = Object.entries(mh[1].dates);
    console.log(mhObjects)

    mhObjects.forEach(element => {
        // console.log(element)
        MH_ConfirmCase.push(element[1].delta.confirmed);
        MH_RecoverCases.push(element[1].delta.recovered);
        MH_DeathCases.push(element[1].delta.deceased);
        MH_Dates.push(element[0]);
    });
}



async function MHChart() {
    await getMHData()
    var ctx = document.getElementById('myMHChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data:{
                labels: MH_Dates,
                datasets: [{
                    label: '# Confirmed Cases',
                    data: MH_ConfirmCase,
                    borderColor: 'rgba(255, 100, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: '# Recover Cases',
                    data: MH_RecoverCases,
                    borderColor: 'rgba(0, 250, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: '# Death Cases',
                    data: MH_DeathCases,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    borderWidth: 1
                }]
            },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}


MHChart()


