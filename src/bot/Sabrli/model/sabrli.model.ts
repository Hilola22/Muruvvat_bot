import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ISabrliCreationAttr {
  user_id: number;
  last_state: string;
}
@Table({ tableName: "sabrli" })
export class Sabrli extends Model<Sabrli, ISabrliCreationAttr> {
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
