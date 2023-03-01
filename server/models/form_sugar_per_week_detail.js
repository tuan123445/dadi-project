const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('form_sugar_per_week_detail', {
    form_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    item_exchange_list: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    sugar_use: {
      type: DataTypes.INTEGER,
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
    tableName: 'form_sugar_per_week_detail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "form_id" },
        ]
      },
    ]
  });
};
