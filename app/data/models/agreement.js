module.exports = (sequelize, DataTypes) => {
  return sequelize.define('agreement', {
    agreementId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sbi: DataTypes.INTEGER,
    agreementData: DataTypes.JSON,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'agreements',
    freezeTableName: true
  })
}
