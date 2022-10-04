const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('form_per_week_projects', {
    form_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
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
    tableName: 'form_per_week_projects',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "form_id" },
          { name: "project_id" },
        ]
      },
    ]
  });
};
