const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_information', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_discord: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    wallet_address: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    sugar_balance: {
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
    tableName: 'users_information',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "id_discord" },
          { name: "wallet_address" },
        ]
      },
    ]
  });
};
