'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Creating the 'Auths' table with initial columns
    await queryInterface.createTable('Auths', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 50] // Username must be between 3 and 50 characters
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('Admin', 'Client', 'Monitor'),
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [10, 10],  // Ensures the length is exactly 10 characters
          isNumeric: true // Ensures only numeric values are allowed
        }
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull: false
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true // Ensures that the value is a valid date
        }
      },
      hobbies: {
        type: Sequelize.JSON,
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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 100] // Address must be between 2 and 100 characters
        }
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

    // Adding a CHECK constraint for the 'phoneNumber' field in the database
    await queryInterface.sequelize.query(`
      ALTER TABLE \`Auths\` 
      ADD CONSTRAINT check_phoneNumber_length 
      CHECK (CHAR_LENGTH(phoneNumber) = 10 AND phoneNumber REGEXP '^[0-9]+$')
    `);
  },

  async down(queryInterface, Sequelize) {
    // Remove the CHECK constraint on phoneNumber
    await queryInterface.sequelize.query(`
      ALTER TABLE \`Auths\` 
      DROP CONSTRAINT check_phoneNumber_length
    `);

    // Dropping the 'Auths' table
    await queryInterface.dropTable('Auths');
  }
};
