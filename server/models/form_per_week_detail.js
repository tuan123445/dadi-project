const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('form_per_week_detail', {
    form_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    doodiness_work: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    friendship_sugar: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    missionary_sugar: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    partner: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    note_for_lk: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    dadi_event_rsvp: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    sugar_use_note: {
      type: DataTypes.STRING(500),
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
    tableName: 'form_per_week_detail',
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
