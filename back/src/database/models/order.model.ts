import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';
import UserModel from './user.model';
import OrderProduct from './orderProduct.model';
import AddressModel from './address.model';

class OrderModel extends Model {
  declare id: number;
  declare userId: number;
  declare addressId: number;
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
    addressId: INTEGER,
    createdAt: {
      type: DATE,
      field: 'created_at',
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'order',
    tableName: 'orders',
    updatedAt: false,
    defaultScope: {
      attributes: { exclude: ['createdAt'] },
    },
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

AddressModel.hasMany(OrderModel, {
  foreignKey: 'addressId',
  as: 'orders',
});

OrderModel.belongsTo(AddressModel, {
  foreignKey: 'addressId',
  as: 'address',
});

export default OrderModel;
