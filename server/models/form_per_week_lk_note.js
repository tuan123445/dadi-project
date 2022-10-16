const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('form_per_week_lk_note', {
    form_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    lk_note: {
      type: DataTypes.STRING(500),
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
    tableName: 'form_per_week_lk_note',
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
