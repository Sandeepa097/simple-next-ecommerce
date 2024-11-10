import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import { Product } from './Product';

@Table({
  timestamps: true,
  tableName: 'productVariants',
})
export class ProductVariant extends Model {
  @BelongsTo(() => Product, {
    onDelete: 'CASCADE',
  })
  public product!: Product;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  public productId!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  public price!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  public isAvailable!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public variantImage!: string;
}
