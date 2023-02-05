import { Model, INTEGER } from 'sequelize';
import db from '.';
import ProviderModel from './provider.model';

class OrderProductModel extends Model {
  declare orderId: number;
  declare productId: number;
  declare providerId: number;
  declare quantity: number;
}

OrderProductModel.init(
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

OrderProductModel.belongsTo(ProviderModel, {
  foreignKey: 'providerId',
  as: 'provider',
});

export default OrderProductModel;
