let symbol = 'aapl';
let query = 'Apple';
import Chart from 'chart.js';
let interval = '1y'
let chart = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${interval}?token=pk_dfb132b12db14003bfeb90dc058b276c&chartCloseOnly=true&chartInterval=30`;
let info = `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_dfb132b12db14003bfeb90dc058b276c&format=json`;
let news = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=ef82b8a9600940688b24de439e53ce2c`
// const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';
document.addEventListener("DOMContentLoaded", function (event) {
    function firstApiCall(chart) {
        fetch(chart)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                //DO SOMETHING WITH DATA      
                let parsedData = parseData(data);
                // window.myChart.update();
                drawChart(parsedData);

                // oldChart.destroy();
                // chart.update();
                // removeData(chart);
            });
    }
    fetch(info)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            //DO SOMETHING WITH DATA      
            window.company = data.companyName;
            parseCompanyData(data);
        })
        .then(
            firstApiCall(chart)
        )
    
    fetch(news)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            parseNews(data);
            //DO SOMETHING WITH DATA      
            // window.company = data.companyName;
            // parseCompanyData(data);
        })


    let dropval = document.getElementById('dropval');

    dropval.onchange = function () {
    
        symbol = document.getElementById('dropval').value;
        // query = window.company
        if (symbol === 'aapl') {
            query = 'Apple';
        } else if (symbol === 'msft') {
            query = 'Microsoft';
        } else if (symbol === 'goog') {
            query = 'Google';
        } else if (symbol === 'fb') {
            query = 'Facebook';
        } else if (symbol === 'nvda') {
            query = 'Nvidia';
        } else if (symbol === 'amzn') {
            query = 'Amazon';
        } else if (symbol === 'nflx') {
            query = 'Netflix';
        }

        chart = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1y?token=pk_dfb132b12db14003bfeb90dc058b276c&chartCloseOnly=true&chartInterval=30`;
        info = `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_dfb132b12db14003bfeb90dc058b276c&format=json`;
        news = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=ef82b8a9600940688b24de439e53ce2c`
        // console.log(chart);
        function chartApiCall(chart){
            fetch(chart)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                    //DO SOMETHING WITH DATA      
                    let parsedData = parseData(data);
                    
                    drawChart(parsedData);
                    window.myChart.update();
                    // oldChart.destroy();
                    // chart.update();
                    // removeData(chart);
                });
        }
        fetch(info)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                //DO SOMETHING WITH DATA      
                window.company = data.companyName;
                parseCompanyData(data);
            })
            .then(
                chartApiCall(chart)
            )
        
        fetch(news)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                // debugger
                parseNews(data);
                //DO SOMETHING WITH DATA      
                // window.company = data.companyName;
                // parseCompanyData(data);
            })



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
    // let company = window.company
    if (window.myChart) window.myChart.destroy();
    var ctx = document.getElementById("line-chart").getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: `${query}`,
                borderColor: 'Lime',
                backgroundColor: 'Lime',
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
    // window.myChart.update();
}

function parseCompanyData(data) {
    // console.log(data);
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

function parseNews(data) {
    let topNews = [];

    while (topNews.length < 5) {
        let article = data.articles.shift()
        topNews.push(article);
    }
    // debugger;

    const article1 = document.getElementById('article1');
    const article2 = document.getElementById('article2')
    const article3 = document.getElementById('article3')
    const article4 = document.getElementById('article4')
    const article5 = document.getElementById('article5')

    // debugger;

    article1Title.innerHTML = topNews[0].title;
    article2Title.innerHTML = topNews[1].title;
    article3Title.innerHTML = topNews[2].title;
    article4Title.innerHTML = topNews[3].title;
    article5Title.innerHTML = topNews[4].title;

    document.getElementById('img1').src = topNews[0].urlToImage
    document.getElementById('img2').src = topNews[1].urlToImage
    document.getElementById('img3').src = topNews[2].urlToImage
    document.getElementById('img4').src = topNews[3].urlToImage
    document.getElementById('img5').src = topNews[4].urlToImage

    return topNews;

}



