
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
    let arr = [];
    for (let i in data.close) {
        arr.push({ date: new Date(i), //date            
            value: +data.close[i] //convert string to number         
        });   
    }   
    return arr;
}

function drawChart(data) {
    let svgWidth = 600, svgHeight = 400;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right; 
    let height = svgHeight - margin.top - margin.bottom;

    let svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    let g = svg.append('g')
        attr("transform", "translate(" + margin.left + "," + margin.top +")");

        
}
