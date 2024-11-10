import {
  Table,
  DefaultScope,
  Scopes,
  Column,
  DataType,
  Model,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'categories',
})
@DefaultScope(() => ({
  attributes: { exclude: ['passwordHash'] },
}))
@Scopes(() => ({
  withPasswordHash: {
    attributes: { exclude: [] },
  },
}))
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  public username!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public contactWhatsapp!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public passwordHash!: string;
}
