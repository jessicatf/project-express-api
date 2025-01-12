import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import listEndpoints from 'express-list-endpoints';

import data from './data/golden-globes.json'



// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const users = [
  { id: 1, name: 'Alice' ,age: 33 },
  { id: 2, name: 'Joe' ,age: 15 },
  { id: 3, name: 'Miranda' ,age: 47 },
  { id: 4, name: 'Sophie' ,age: 12 },
  
]

// Start defining your routes here

app.get('/', (req, res) =>{
  res.send('Hello you out there')
})

app.get('/endpoints', (req, res) => {
	res.send(listEndpoints(app))
})

app.get('/users' ,(req, res) => {
  res.json(users)
})


app.get('/nominations', (req, res)=> {
  res.json(data)
})

//http://localhost:8080/year/2010
//http://localhost:8080/year/2010?won=true

app.get('/year/:year',(req, res) => {
  const { year } = req.params
  let nominationsFromYear = data.filter((item) => item.year_award === +year)

  const showWon=req.query.won

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }
   
  res.json({
    response: nominationsFromYear,
    success: true,
  });
  
})

app.get('/ceremony/:ceremony',(req, res) => {
  const { ceremony } = req.params
  const ceremonyNo = data.filter((item) => item.ceremony === +ceremony)
  
  res.json(ceremonyNo)
  
})



// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
