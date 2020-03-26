'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model { }

  User.init({
    username: {
      type: Sequelize.STRING, validate: { notEmpty: true }
    },
    password: {
      type: Sequelize.STRING, validate: { notEmpty: true }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user) => {
        const pass = user.dataValues.password
        const saltRounds = 10
        return bcrypt
          .hash(pass, saltRounds)
          .then(userPass => {
            user.setDataValue('password', userPass)
          })
          .catch(err => {
            throw err
          })
      }
    },
    modelName: "User"
  })

  User.associate = function (models) {
    //! associations can be defined here
    User.hasMany(models.Review)
  };
  return User;
};