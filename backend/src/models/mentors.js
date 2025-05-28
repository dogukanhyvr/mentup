// models/mentorView.js
module.exports = (sequelize, DataTypes) => {
  const Mentor = sequelize.define(
    'Mentor', {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      bio: DataTypes.TEXT,
      short_photo_url: DataTypes.STRING,
      industries: DataTypes.STRING,
      skills: DataTypes.STRING,
    },
    {
      tableName: 'mentors',
      timestamps: false,
      freezeTableName: true,
    }
  );

  Mentor.associate = (models) => {
    Mentor.belongsTo(models.Profile, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
      as: 'profile'
    });
  };

  return Mentor;
};
