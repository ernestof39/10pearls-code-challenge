import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';
import dbConnection from '../../config/db/db-connection';

@Table
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  email: string;

  @Column
  phoneNumber: string;
}

dbConnection.addModels([User]);
export default User;
