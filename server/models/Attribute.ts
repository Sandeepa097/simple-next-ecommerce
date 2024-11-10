import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'attributes',
})
export class Attribute extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public name!: string;
}
