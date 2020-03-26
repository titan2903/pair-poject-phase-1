const imdb = require('imdb-api')
const key = '829ccbd7'

imdb.get({
  id: 'tt0068646'
}, {
  apiKey: key
})
  .then(console.log)

  .catch(console.log);