// src/bot/models/bot.model.ts

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

interface IUserImgCreationAttr {
  user_id: number;
  img_url: string;
}

@Table({ tableName: "userimg", timestamps: false })
export class UserImg extends Model<UserImg, IUserImgCreationAttr> {
  @PrimaryKey
  @Column({ type: DataType.BIGINT })
  declare user_id: number;

  @Column({ type: DataType.STRING })
  declare img_url: string;
}
