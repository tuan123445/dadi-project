const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projects_information', {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    leader_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created_person_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    project_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    project_detail: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    project_link: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    tableName: 'projects_information',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "project_id" },
          { name: "leader_id" },
        ]
      },
    ]
  });
};
