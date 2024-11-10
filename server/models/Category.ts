import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'categories',
})
export class Category extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public name!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public description!: string;
}
