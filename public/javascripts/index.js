let symbol = 'aapl';
import Chart from 'chart.js';
let interval = '1y'
let chart = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${interval}?token=pk_dfb132b12db14003bfeb90dc058b276c&chartCloseOnly=true&chartInterval=30`;
let info = `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_dfb132b12db14003bfeb90dc058b276c&format=json`;
// const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';
document.addEventListener("DOMContentLoaded", function (event) {
    fetch(chart)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            //DO SOMETHING WITH DATA      
            let parsedData = parseData(data);
            drawChart(parsedData);
            
        });

    fetch(info)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            //DO SOMETHING WITH DATA      

            parseCompanyData(data);
        });

    let dropval = document.getElementById('dropval');

    dropval.onchange = function () {
    
        symbol = document.getElementById('dropval').value;
        

        chart = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1y?token=pk_dfb132b12db14003bfeb90dc058b276c&chartCloseOnly=true&chartInterval=30`;
        info = `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_dfb132b12db14003bfeb90dc058b276c&format=json`;
        // console.log(chart);
        fetch(chart)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                //DO SOMETHING WITH DATA      
                let parsedData = parseData(data);
                window.myChart.update();
                drawChart(parsedData);
               
                // oldChart.destroy();
                // chart.update();
                // removeData(chart);
            });

        fetch(info)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                //DO SOMETHING WITH DATA      

                parseCompanyData(data);
            });



    }


});

function parseData(data) {
    let arr = [];
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
        arr.push({
            date: new Date(data[i].date), //date            
            close: data[i].close //convert string to number         
        });

    }

    const closing = document.getElementById('closing');
    const change = document.getElementById('change');
    const percentage = document.getElementById('percentage');


    let last = arr[arr.length - 1];

    let difference = Math.round((last.close - arr[arr.length - 2].close) * 100) / 100;
    let difpercent = Math.round(((last.close - arr[arr.length - 2].close) / arr[arr.length - 2].close) * 100) / 100;
    // rounded = Math.round(difference * 100)/100;
    // let difference = 5.60
    // console.log(change);
    closing.innerHTML = last.close;
    if (difference < 0) {
        change.style.color = "Red";
        change.innerHTML = "-" + Math.abs(difference);
    } else {
        change.style.color = "Lime";
        change.innerHTML = "+" + difference;
    }

    if (difpercent < 0) {
        percentage.style.color = "Red";
        percentage.innerHTML = "(" + "-" + Math.abs(difpercent) + "%" + ")";
    } else {
        percentage.style.color = "Lime";
        percentage.innerHTML = "(" + "+" + difpercent + "%" + ")";
    }
    return arr;


}

// function removeData(chart) {
//     chart.data.labels.pop();
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.pop();
//     });
//     chart.update();
// }

function drawChart(data) {
            // console.log(data);
    if (window.myChart) window.myChart.destroy();
    var ctx = document.getElementById("line-chart").getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Apple',
                borderColor: '#32CD32',
                backgroundColor: '#32CD32',
                spanGaps: true,
                data: data.map((day) => (
                    {
                        x: new Date(day.date),
                        y: (day.close),
                    })),
                }
            ],
        },
        options: {
            title: {
                display: true,
                text: "Chart.js Line Chart"
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month',
                        fontSize: 15,
                        fontColor: 'white',
                        
                    },
                    ticks: {
                        source: 'data',
                        fontColor: 'white',
                    },
                    type: 'time',
                    time: {
                        unit: 'month',
                        round: 'day',
                        displayFormats: {
                            'month': ' MMM',
                        },
                    },
                    gridLines: {
                        display: true,
                        color: "#FFFFFF"
                    },
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value',
                        fontSize: 15,
                        fontColor: 'white',
                    },
                    ticks: {
                        beginAtZero: false,
                        fontColor: 'white',
                        // stepSize: 50,
                        // maxTicksLimit: 10
                    },
                    gridLines: {
                        display: true,
                        color: "#FFFFFF"
                    },
                }],
            },
            title: {
                display: true,
                fontSize: 20,
                fontColor: 'white',
                text: `Past 12 months`,
            },
            legend: {
                labels: {
                    fontColor: 'white' //set your desired color
                }
            }
        }
    });
    // myChart.update();
}

function parseCompanyData(data) {
    const symbol = document.getElementById('symbol');
    const exchange = document.getElementById('exchange');
    const company = document.getElementById('company');
    const site = document.getElementById('site');
    const ceo = document.getElementById('ceo');
    const sec = document.getElementById('sec');
    const emp = document.getElementById('emp');
    const st = document.getElementById('st');
    const city = document.getElementById('city');

    symbol.innerHTML = "(" + data.symbol + ")";
    exchange.innerHTML = data.exchange;
    company.innerHTML = data.companyName;
    site.innerHTML = data.website;
    ceo.innerHTML = data.CEO;
    sec.innerHTML = data.sector;
    emp.innerHTML = data.employees;
    add.innerHTML = data.address;
    st.innerHTML = data.state;
    city.innerHTML = data.city;
};



