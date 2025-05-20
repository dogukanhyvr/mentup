module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      mentor_id: { type: DataTypes.UUID, allowNull: false },
      mentee_id: { type: DataTypes.UUID, allowNull: false },
      scheduled_at: { type: DataTypes.DATE, allowNull: false },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
        allowNull: false,
        defaultValue: 'pending',
      },
    }, {
      tableName: 'appointments',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });

    Appointment.beforeCreate(async (appointment, options) => {
      const mentor = await sequelize.models.User.findOne({ where: { id: appointment.mentor_id, role: 'mentor' } });
      const mentee = await sequelize.models.User.findOne({ where: { id: appointment.mentee_id, role: 'mentee' } });
    
      if (!mentor) {
        throw new Error('mentor_id must belong to a user with role "mentor"');
      }
    
      if (!mentee) {
        throw new Error('mentee_id must belong to a user with role "mentee"');
      }
    });
  
    Appointment.associate = (models) => {
        Appointment.belongsTo(models.User, { foreignKey: 'mentor_id', as: 'mentor' });
        Appointment.belongsTo(models.User, { foreignKey: 'mentee_id', as: 'mentee' });
      
        Appointment.hasOne(models.Review, {
          foreignKey: 'appointment_id',
          as: 'review',
          onDelete: 'CASCADE'
        });
      
        Appointment.hasMany(models.Message, {
          foreignKey: 'appointment_id',
          as: 'messages',
          onDelete: 'CASCADE'
        });
      };
      
  
    return Appointment;
  };
  