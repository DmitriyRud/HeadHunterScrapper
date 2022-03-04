'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllSkill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AllSkill.init({
    name: DataTypes.STRING,
    count: DataTypes.INTEGER,
    jobName: DataTypes.STRING,
    companyName: DataTypes.STRING,
    vacancyName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AllSkill',
  });
  return AllSkill;
};
