module.exports = (sequelize, DataTypes) => {
  const AvailabilitySlot = sequelize.define('AvailabilitySlot', {
    slot_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  }, {
    tableName: 'availability_slots',
    timestamps: false,
  });

  AvailabilitySlot.associate = (models) => {
    AvailabilitySlot.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
  };

  return AvailabilitySlot;
};