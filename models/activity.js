'use strict';
module.exports = function(sequelize, DataTypes) {
  var activity = sequelize.define('activity', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });

  activity.associate = (models) => {
  activity.belongsTo(models.User, {foreignKey: 'userId'});
  }

  return activity;
};
