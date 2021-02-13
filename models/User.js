const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// bcrypt file
const bcrypt = require('bcrypt');

// create our User model extending to Model to inherit its functionality
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
}

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
         // password hooks
        hooks: {
            // set up beforeCreate
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate 
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
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