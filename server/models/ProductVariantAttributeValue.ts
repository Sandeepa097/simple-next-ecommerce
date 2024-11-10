import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import { ProductVariant } from './ProductVariant';
import { Attribute } from './Attribute';

@Table({
  timestamps: true,
  tableName: 'productVariantAttributeValues',
})
export class ProductVariantAttributeValue extends Model {
  @BelongsTo(() => ProductVariant, {
    onDelete: 'CASCADE',
  })
  public productVariant!: ProductVariant;

  @ForeignKey(() => ProductVariant)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  public productVariantId!: number;

  @BelongsTo(() => Attribute, {
    onDelete: 'CASCADE',
  })
  public attribute!: Attribute;

  @ForeignKey(() => Attribute)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  public attributeId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public value!: string;
}
