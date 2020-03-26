const Model = require('../models')
const Movie = Model.Movie
const Review = Model.Review
const User = Model.User
const getFormattedDate = require('../helpers/getFormattedDate')


class MovieController {
  static findAll(req, res) {
    Movie.findAll({
      order: [
        //! Will escape title and validate DESC against a list of valid direction parameters
        ['id', 'ASC']]
    })
      .then(dataMovies => {
        // res.send(dataMovies)
        let user = req.session.user
        res.render("movies", { dataMovies, user, err: req.query.err })
      })
      .catch(err => {
        res.redirect(`/movies?err=${err.message}`)
      })
  }

  static findOneWithReviews(req, res) {
    let movie
    let userId
    User.
      findOne({
        where: {
          username: req.session.user.name
        }
      })
      .then(user => {
        userId = user.dataValues.id
        return Movie
          .findByPk(req.params.id, {
            include: [
              {
                model: Review,
                include: [User]
              }
            ]
          })
      })
      .then(foundMovie => {
        movie = foundMovie
        return movie.getAverageRating()
      })
      .then(averageRating => {
        movie.setDataValue('averageRating', averageRating)
        return Review
          .findOne({
            where: {
              MovieId: movie.id,
              UserId: userId
            }
          })
      })
      .then(loggedUserReview => {
        res.render('movies-show-reviews', { movie, err: req.query.err, getFormattedDate, loggedUserReview })
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static addReview(req, res) {
    Movie
      .findByPk(req.params.id)
      .then(movie => {
        res.render('movies-add-review', { movie, err: req.query.err })
      })
      .catch(err => {
        res.redirect(`/movies/${req.params.id}?err=${err.message}`)
      })
  }

  static addReviewPost(req, res) {
    let userId
    User.
      findOne({
        where: {
          username: req.session.user.name
        }
      })
      .then(user => {
        userId = user.dataValues.id
        return Review
          .create({
            reviewTitle: req.body.reviewTitle,
            description: req.body.description,
            rating: req.body.rating,
            UserId: userId,
            MovieId: req.params.id
          })
      })
      .then(created => {
        res.redirect(`/movies/${req.params.id}`)
      })
      .catch(err => {
        res.redirect(`/movies/${req.params.id}/add-review/?err=${err.message}`)
      })
  }

  static editReview(req, res) {
    let movie
    Movie
      .findByPk(req.params.id)
      .then(foundMovie => {
        movie = foundMovie
        return Review
          .findOne({
            where: {
              MovieId: movie.id,
              UserId: 1
            }
          })
      })
      .then(review => {
        console.log(review)
        res.render('movies-edit-review', { movie, review, err: req.query.err })
      })
      .catch(err => {
        res.send(err.message)
      })
  }
}

module.exports = MovieController