import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ISahiyCreationAttr {
  user_id: number;
  last_state: string;
}
@Table({ tableName: "sahiy" })
export class Sahiy extends Model<Sahiy, ISahiyCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(15),
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
  })
  declare location: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare last_state: string;

  @Column({
    type: DataType.BIGINT,
  })
  declare user_id: number;
}
