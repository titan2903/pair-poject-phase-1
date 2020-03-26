const express = require('express')
const app = express()
const port = 3000

const routes = require('./routes/router')
const session = require('express-session')

app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

app.get('/term', (req, res) => {
  res.redirect('term')
})

app.get('*', (req, res) => {
  res.send('404 Page Not Found!')
})

app.listen(port, () => {
  console.log(`listening on Port: ${port}`)
})