const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('form_sugar_per_week', {
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    form_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'form_sugar_per_week',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "year" },
          { name: "month" },
          { name: "week" },
        ]
      },
    ]
  });
};
