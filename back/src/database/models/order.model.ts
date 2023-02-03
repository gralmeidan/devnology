import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';

class OrderModel extends Model {
  declare id: number;
  declare userId: number;
  declare totalPrice: number;
}

OrderModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: INTEGER,
    totalPrice: DECIMAL(10, 2),
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'order',
    tableName: 'orders',
    timestamps: false,
  }
);

export default OrderModel;
