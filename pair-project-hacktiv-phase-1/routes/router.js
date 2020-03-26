const routes = require('express').Router();
const controller = require('../controllers/moviesController')
const controllerAuth = require('../controllers/authController')
const ReviewController = require('../controllers/ReviewController')

//!middleware
const isLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect(`/login`)
  } else {
    next()
  }
}

routes.get('/', controller.findAll)

routes.get('/movies', controller.findAll)
routes.get('/register', (req, res) => {
  res.render('register', { err: req.query.err })
})

routes.post('/register', controllerAuth.register)
routes.get('/login', (req, res) => {
  res.render('login', { err: req.query.err })
})
routes.post('/login', controllerAuth.login)

routes.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    console.log('islogout')
    res.redirect('/movies')
  })
})

routes.get('/movies/:id', isLogin, controller.findOneWithReviews)

routes.get('/movies/:id/add-review', isLogin, controller.addReview)
routes.post('/movies/:id/add-review', isLogin, controller.addReviewPost)

routes.get('/movies/:id/edit-review', isLogin, controller.editReview)

routes.post('/reviews/:id/edit', isLogin, ReviewController.editPost)
routes.get('/reviews/:id/delete', isLogin, ReviewController.delete)

module.exports = routes