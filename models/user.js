"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
      // define association here
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  User.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: {
        type: DataTypes.STRING, allowNull: false, validate: {
          notEmpty: {
            msg: "Name is required",
          },
        }
      },
      email: {
        type: DataTypes.STRING, allowNull: false, unique: true, validate: {
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email is invalid",
          }
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
