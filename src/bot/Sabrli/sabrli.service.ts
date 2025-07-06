import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Context, Markup } from "telegraf";
import { Bot } from "../models/bot.model";
import { Sabrli } from "./model/sabrli.model";

@Injectable()
export class SabrliService {
  constructor(
    @InjectModel(Sabrli) private readonly sabrliModel: typeof Sabrli,
    @InjectModel(Bot) private readonly botModel: typeof Bot,
  ) {}

  async onClickSabrli(ctx: Context) {
    try {
      await ctx.replyWithHTML("Kerakli menuni tanlang: ", {
        ...Markup.keyboard([
          ["Ma'lumotlarni kiritish", "Bosh sahifaga qaytish"],
        ]).resize(),
      });
    } catch (error) {
      console.log("Error on click sabrli", error);
    }
  }

  async addNewSabrli(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>/start</b> tugmasini bosing`, {
          ...Markup.keyboard(["/start"]).resize(),
        });
      } else {
        await this.sabrliModel.create({
          last_state: "name",
          user_id: user_id!,
        });
        await ctx.replyWithHTML("Ismingizni kiriting:", {
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log("Error on add new sabrli", error);
    }
  }
}
