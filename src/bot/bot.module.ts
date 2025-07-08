import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { BotUpdate } from "./bot.update";
import { UserImg } from "./models/user_image.model"

@Module({
  imports: [SequelizeModule.forFeature([Bot, UserImg])],
  controllers: [],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
