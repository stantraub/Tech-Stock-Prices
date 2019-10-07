/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 8:
/***/ (function(module, exports) {

let symbol = 'aapl';
let interval = '5d'
let chart = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${interval}?token=pk_dfb132b12db14003bfeb90dc058b276c&chartCloseOnly=true`;
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
        // console.log(symbol);
        
        chart = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/5d?token=pk_dfb132b12db14003bfeb90dc058b276c&chartCloseOnly=true`;
        info = `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_dfb132b12db14003bfeb90dc058b276c&format=json`;
        // console.log(chart);
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
    
    let difference = Math.round((last.close - arr[arr.length - 2].close)* 100)/100;
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

function drawChart(data) {
    let svgWidth = 600, svgHeight = 330;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right; 
    let height = svgHeight - margin.top - margin.bottom;

    // find data range
    const xMin = d3.min(data, d => {
        return d['date'];
    });
    const xMax = d3.max(data, d => {
        return d['date'];
    });
    const yMin = d3.min(data, d => {
        return d['close'];
    });
    const yMax = d3.max(data, d => {
        return d['close'];
    });
    // scales for the charts
    const xScale = d3
        .scaleTime()
        .domain([xMin, xMax])
        .range([0, width]);
    const yScale = d3
        .scaleLinear()
        .domain([yMin - 5, yMax])
        .range([height, 0]);

    d3.select('#svg').selectAll("*").remove();
    let svg = d3.select('#svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    let g = svg.append('g')
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


    let line = d3
        .line()
        .x(function (d) {
            // console.log(d);
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
        .text("Close ($)")
        .style('fill', 'white');

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "lime")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
   
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





/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map