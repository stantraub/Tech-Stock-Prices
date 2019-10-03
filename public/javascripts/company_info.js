const info = 'https://cloud.iexapis.com/stable/stock/aapl/company?token=pk_dfb132b12db14003bfeb90dc058b276c&format=json';

fetch(info)
    .then(function (response) { return response.json(); })
    .then(function (data) {
        //DO SOMETHING WITH DATA      
        let parsedData = parseData(data);
    });
function parseCompanyData(data) {
    let arr = [];
    console.log(data);
    arr.push({
        symbol: data.symbol,        
        companyName: data.companyName,
        sector: data.sector,
        website: data.website,
        CEO: data.CEO,
        address: data.address,
        state: data.state,
        country: data.country,
        
    });

    return arr;
}