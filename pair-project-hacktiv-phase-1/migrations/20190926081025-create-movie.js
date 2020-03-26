'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      rated: {
        type: Sequelize.STRING
      },
      released: {
        type: Sequelize.DATE
      },
      runtime: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      writer: {
        type: Sequelize.STRING
      },
      actor: {
        type: Sequelize.STRING
      },
      plot: {
        type: Sequelize.TEXT
      },
      languages: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      awards: {
        type: Sequelize.STRING
      },
      poster: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Movies');
  }
};