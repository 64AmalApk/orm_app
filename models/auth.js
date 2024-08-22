'use strict';
const { Model } = require('sequelize');
const { encryptString, decryptString } = require('../helpers/authHelper');

module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    static associate(models) {
      // Define associations here, if any
    }
  }

  Auth.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', encryptString(value));
      },
      get() {
        return decryptString(this.getDataValue('password'));
      }
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Client', 'Monitor'),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 10],
        isNumeric: true
      }
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    hobbies: {
      type: DataTypes.JSON,
      allowNull: true,
      validate: {
        isArrayOfStrings(value) {
          if (!Array.isArray(value)) {
            throw new Error('Hobbies must be an array');
          }
          for (const hobby of value) {
            if (typeof hobby !== 'string') {
              throw new Error('Each hobby must be a string');
            }
          }
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    }
  }, {
    sequelize,
    modelName: 'Auth',
  });

  return Auth;
};
