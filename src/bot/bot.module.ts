import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { BotUpdate } from "./bot.update";
import { Bot } from "./models/bot.model";
import { SahiyService } from "./Sahiy/sahiy.service";
import { SahiyUpdate } from "./Sahiy/sahiy.update";
import { Sahiy } from "./Sahiy/model/sahiy.model";
import { Sabrli } from "./Sabrli/model/sabrli.model";
import { SabrliService } from "./Sabrli/sabrli.service";
import { SabrliUpdate } from "./Sabrli/sabrli.update";

@Module({
  imports: [SequelizeModule.forFeature([Bot, Sahiy, Sabrli])],
  controllers: [],
  providers: [BotService, SahiyService, SahiyUpdate, SabrliService, SabrliUpdate, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
