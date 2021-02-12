const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model extending to Model to inherit its functionality
class User extends Model {}

// User table colums and configuration
User.init(
    // User table column definitions
    {
        // ID column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // email column
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, // makes sure email is unique
          validate: { // validate that a correct email was entered
              isEmail: true
          }  
        },
        // password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this makes the password at least 4 characters long
                len: [4]
            }
        }
    },
    {
        // Table configuration options
        sequelize,
        timestamps: false,
        // keeps database name from being pluralized
        freezeTableName: true,
        // users underscores instead of cammel casing
        underscored: true,
        // model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;