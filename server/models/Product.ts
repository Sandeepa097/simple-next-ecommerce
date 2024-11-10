import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import { Category } from './Category';

@Table({
  timestamps: true,
  tableName: 'products',
})
export class Product extends Model {
  @BelongsTo(() => Category, {
    onDelete: 'CASCADE',
  })
  public category!: Category;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  public categoryId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public name!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  public description!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public coverPhoto!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public image!: string;
}
