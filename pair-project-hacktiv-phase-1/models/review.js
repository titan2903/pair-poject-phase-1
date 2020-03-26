'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Review extends Model { }
  Review.init({
    reviewTitle: {
      type: Sequelize.STRING, validate: { notEmpty: true }
    },
    description: {
      type: Sequelize.TEXT, validate: { notEmpty: true }
    },
    rating: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER
  }, { sequelize, modelName: 'Review' });
  Review.associate = function (models) {
    //! associations can be defined here
    Review.belongsTo(models.Movie)
    Review.belongsTo(models.User)
  };
  return Review;
};