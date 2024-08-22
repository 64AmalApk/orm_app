// db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('orm_App', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
