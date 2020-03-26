'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Movie extends Model {
    getAverageRating() {
      return sequelize.models.Review
        .findAll({
          where: {
            MovieId: this.id
          }
        })
        .then(reviews => {
          let totalRating = 0
          let totalReview = 0
          reviews.forEach(review => {
            totalRating += review.dataValues.rating
            totalReview++
          })
          if (!totalReview) {
            return 0
          } else {
            return totalRating / totalReview
          }
        })
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    rated: DataTypes.STRING,
    released: DataTypes.DATE,
    runtime: DataTypes.STRING,
    genre: DataTypes.STRING,
    director: DataTypes.STRING,
    writer: DataTypes.STRING,
    actor: DataTypes.STRING,
    plot: DataTypes.TEXT,
    languages: DataTypes.STRING,
    country: DataTypes.STRING,
    awards: DataTypes.STRING,
    poster: DataTypes.TEXT
  }, { sequelize, modelName: 'Movie' });
  Movie.associate = function (models) {
    //! associations can be defined here
    Movie.hasMany(models.Review)
  };
  return Movie;
};