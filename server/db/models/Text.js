const Sequelize = require('sequelize')
const db = require('../db')

const Text = db.define('text', {
  fileName: {
      type: Sequelize.STRING,
      allowNull: false
  }, 
  text: {
    type: Sequelize.TEXT,
    defaultValue: ''
}, 
wordCounts: {
    type: Sequelize.JSON,
    defaultValue: {}
}, 
numTotalWords: {
    type: Sequelize.INTEGER,
    defaultValue: 0
}, 
numDistinctWords: {
    type: Sequelize.INTEGER,
    defaultValue: 0
}, 
excludeStopWords: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
}, 
})

module.exports = Text
