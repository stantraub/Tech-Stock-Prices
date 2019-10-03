
const api = 'https://cloud.iexapis.com/stable/stock/aapl/chart/5d?token=pk_dfb132b12db14003bfeb90dc058b276c&chartCloseOnly=true';
const info = 'https://cloud.iexapis.com/stable/stock/aapl/company?token=pk_dfb132b12db14003bfeb90dc058b276c&format=json';
// const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';
document.addEventListener("DOMContentLoaded", function (event) {
    fetch(api)
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
        })
});

function parseData(data) {
    let arr = [];
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        arr.push({ date: new Date(data[i].date), //date            
            close: data[i].close //convert string to number         
        });   
    }   
    return arr;
}

function drawChart(data) {
    console.log(data);
    let svgWidth = 600, svgHeight = 400;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right; 
    let height = svgHeight - margin.top - margin.bottom;

    let svg1 = d3.select('#svg1')
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    let g = svg1.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top +")");

    let x = d3.scaleTime()
        .rangeRound([0, width]);
        
    let y = d3.scaleLinear()
        .rangeRound([height, 0]);

    // let line = d3.line()
    // .x(function (d) {
    //     console.log(d);
    //     return x(d.date) 

    // })

    
    // .y(function (d) { return y(d.value) })
    //    x.domain(d3.extent(data, function (d) { return d.date })); y.domain(d3.extent(data, function (d) { return d.value }));


    let line = d3.line()
        .x(function (d) {
            console.log(d);
            { return x(d.date) }
        }
        
        )
        .y(function (d) { return y(d.close) })   
        x.domain(d3.extent(data, function (d) { return d.date })); 
        y.domain(d3.extent(data, function (d) { return d.close }));
    
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Close ($)");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

}

function parseCompanyData(data) {
        const symbol = document.getElementById('symbol');
        const company = document.getElementById('company');
        const site = document.getElementById('site');
        const ceo = document.getElementById('ceo');
        const sec = document.getElementById('sec');
        const emp = document.getElementById('emp');
        const st = document.getElementById('st');
        const city = document.getElementById('city');
    
        symbol.innerHTML = data.symbol;
        company.innerHTML = data.companyName;
        site.innerHTML = data.website;
        ceo.innerHTML = data.CEO;
        sec.innerHTML = data.sector;
        emp.innerHTML = data.employees;
        add.innerHTML = data.address;
        st.innerHTML = data.state;
        city.innerHTML = data.city;
};


