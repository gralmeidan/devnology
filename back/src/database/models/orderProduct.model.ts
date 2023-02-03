import { Model, INTEGER } from 'sequelize';
import db from '.';
import ProviderModel from './provider.model';

class OrderProduct extends Model {
  declare orderId: number;
  declare productId: number;
  declare providerId: number;
  declare quantity: number;
}

OrderProduct.init(
  {
    orderId: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    providerId: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quantity: INTEGER,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'orderProduct',
    tableName: 'orders_products',
    timestamps: false,
  }
);

OrderProduct.belongsTo(ProviderModel, {
  foreignKey: 'providerId',
  as: 'provider',
});

export default OrderProduct;
