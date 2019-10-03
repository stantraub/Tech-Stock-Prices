const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 3000; // process.env accesses heroku's environment variables

app.use(express.static('public'))

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

// create route to get single book by its isbn
app.get('/companyinfo/:sym', (req, res) => {
  fetch(`https://cloud.iexapis.com/stable/stock/${req.params.sym}/company?token=${apikeys.iexkey}`)
    .then((data) => {
      return data.text();
    })
    .then((body) => {
      const result = JSON.parse(body);
      res.json(result);
    });
});

// create a search route
app.get('/search', (request, response) => {
  fetch(`http://openlibrary.org/search.json?q=${request.query.string}`)
  .then((response) => {
      return response.text();
  }).then((body) => {
      let results = JSON.parse(body)
      console.log(results)
      response.send(results)
    });
});

app.listen(8000, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
})
