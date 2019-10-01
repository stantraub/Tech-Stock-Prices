
const api = 'https://cloud.iexapis.com/stable/stock/aapl/chart/5y?token=pk_8eaac873d80f461cb152c10d5918fa18';

document.addEventListener("DOMContentLoaded", function (event) {
    fetch(api)
        .then(function (response) { return response.json(); })
        .then(function (data) {
                   //DO SOMETHING WITH DATA      
            let parsedData = parseData(data);
            drawChart(parsedData);
        })
});

function parseData(data) {
    var arr = [];
    for (var i in data.bpi) {
        arr.push({ date: new Date(i), //date            
            value: +data.bpi[i] //convert string to number         
        });   
    }   
    return arr;
}
