'use strict';

const imdb = require('imdb-api')
const key = '829ccbd7'

const keyId = ['tt1584131', 'tt0101961', 'tt10289996', 'tt0468569', 'tt1345836', 'tt0814243', 'tt0832449', 'tt1010435', 'tt1006926', 'tt1018764', 'tt1037116', 'tt0997084', 'tt2313197', 'tt2166834', 'tt2098632', 'tt2258647', 'tt0486410', 'tt1213819', 'tt1330604', 'tt0120737', 'tt0167260', 'tt0167261', 'tt0077869', 'tt0076759', 'tt0080684', 'tt0086190', 'tt2488496', 'tt0120915', 'tt0121766', 'tt0121765', 'tt3748528', 'tt2527336', 'tt3778644', 'tt0816692', 'tt4415360', 'tt5083736', 'tt3506492', 'tt0418279', 'tt1399103', 'tt1055369', 'tt2109248', 'tt3371366', 'tt0848228', 'tt2395427', 'tt0910970', 'tt1187043', 'tt0114709']




let promises = []
keyId.forEach(element => {

  promises.push(imdb.get({
    id: element
  }, {
    apiKey: key
  }))
});

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all(promises)

      .then(movies => {
        let arr = []
        movies.forEach(movie => {
          let objMovie = {
            title: movie.title,
            year: movie.year,
            rated: movie.rated,
            released: movie.released,
            runtime: movie.runtime,
            genre: movie.genres,
            director: movie.director,
            writer: movie.writer,
            actor: movie.actors,
            plot: movie.plot,
            languages: movie.languages,
            country: movie.country,
            awards: movie.awards,
            poster: movie.poster,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          arr.push(objMovie)
        })
        return queryInterface.bulkInsert('Movies', arr)
      })
      .catch(console.log)

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Movies', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      
    */
  }
};
