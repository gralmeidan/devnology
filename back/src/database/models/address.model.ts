import { Model, STRING, INTEGER, CHAR, DATE } from 'sequelize';
import db from '.';
import UserModel from './user.model';

class AddressModel extends Model {
  declare id: number;
  declare userId: number;
  declare street: string;
  declare number: string;
  declare city: string;
  declare cep: string;
  declare state: string;
}

AddressModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: INTEGER,
    street: STRING,
    number: STRING,
    city: STRING,
    cep: CHAR(9),
    state: CHAR(2),
    deletedAt: {
      type: DATE,
      field: 'deleted_at',
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'address',
    tableName: 'addresses',
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ['deletedAt'] },
    },
  }
);

UserModel.hasMany(AddressModel, {
  foreignKey: 'userId',
  as: 'addresses',
});

AddressModel.belongsTo(AddressModel, {
  foreignKey: 'userId',
  as: 'user',
});

export default AddressModel;
