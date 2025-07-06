import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sahiy } from "./model/sahiy.model";
import { Context, Markup } from "telegraf";
import { Bot } from "../models/bot.model";

@Injectable()
export class SahiyService {
  constructor(
    @InjectModel(Sahiy) private readonly sahiyModel: typeof Sahiy,
    @InjectModel(Bot) private readonly botModel: typeof Bot,
  ) {}

  async onClickSahiy(ctx: Context) {
    try {
      await ctx.replyWithHTML("Kerakli menuni tanlang: ", {
        ...Markup.keyboard([
          ["Ro'yxatdan o'tish", "Bosh sahifaga qaytish"],
        ]).resize(),
      });
    } catch (error) {
      console.log("Error on Click Sahiy", error);
    }
  }

  async addNewSahiy(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>/start</b> tugmasini bosing`, {
          ...Markup.keyboard(["/start"]).resize(),
        });
      } else {
        await this.sahiyModel.create({
          last_state: "name",
          user_id: user_id!,
        });
        await ctx.replyWithHTML("Ismingizni kiriting:", {
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log("Error on add new Sahiy", error);
    }
  }
}
