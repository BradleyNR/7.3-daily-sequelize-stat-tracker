'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.associate = (models) => {
    User.hasMany(models.activity, {foreignKey: 'userId'});
  };

  return User;
};
