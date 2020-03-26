const Model = require('../models')
const Review = Model.Review
const Movie = Model.Movie


class ReviewController {
  static editPost(req, res) {
    let movieId;
    Review
      .findByPk(req.params.id)
      .then(review => {
        movieId = review.dataValues.MovieId
        return Review
          .update({
            reviewTitle: req.body.reviewTitle,
            description: req.body.description,
            rating: req.body.rating
          }, {
            where: {
              id: req.params.id
            }
          })
      })
      .then(updated => {
        res.redirect(`/movies/${movieId}`)
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static delete(req, res) {
    let movieId;
    Review
      .findByPk(req.params.id)
      .then(review => {
        movieId = review.dataValues.MovieId
        return Review
          .destroy({
            where: {
              id: req.params.id
            }
          })
      })
      .then(deleted => {
        res.redirect(`/movies/${movieId}`)
      })
      .catch(err => {
        res.send(err.message)
      })
  }
}

module.exports = ReviewController