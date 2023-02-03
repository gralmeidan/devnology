import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';
import UserModel from './user.model';
import OrderProduct from './orderProduct.model';

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

UserModel.hasMany(OrderModel, {
  foreignKey: 'userId',
  as: 'orders',
});

OrderModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user',
});

OrderModel.hasMany(OrderProduct, {
  foreignKey: 'orderId',
  as: 'products',
});

export default OrderModel;
