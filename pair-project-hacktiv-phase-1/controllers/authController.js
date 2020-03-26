const User = require('../models').User

const bcrypt = require('bcrypt')

class AuthController {
  static register(req, res) {
    User.findOrCreate({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })
      .then((created) => {
        if (created.length > 0) {
          res.redirect('/movies')
        } else {
          res.redirect('/?err=%20do not registe')
        }
      })
      .catch(err => {
        res.redirect(`/register?err=${err.message}`)
      })
  }

  static login(req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user) => {
        const password = req.body.password
        bcrypt.compare(password, user.password)
          .then(pass => {
            req.session.user = {
              name: user.username
            }
            res.redirect('/movies')
          });
      })
      .catch(err => {
        res.redirect(`/login?err=${err.message}`)
      })
  }
}

module.exports = AuthController
