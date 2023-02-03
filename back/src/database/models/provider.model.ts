import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class ProviderModel extends Model {
  declare id: number;
  declare name: string;
}

ProviderModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'provider',
    timestamps: false,
    tableName: 'providers',
  }
);

export default ProviderModel;
