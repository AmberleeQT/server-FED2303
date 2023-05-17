"use strict";

const Sequelize = require('sequelize')

const config = {
  username:'root',
  password: '',
  database: 'fed_2303',
  host:'127.0.0.1',
  dialect: 'mysql'
}

const db = {}
config.logging = console.log;

const sequelize = new Sequelize(config)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;
