import { Action, Ctx, Hears, Update } from "nestjs-telegraf";
import { SahiyService } from "./sahiy.service";
import { Context } from "telegraf";
import { BotService } from "../bot.service";

@Update()
export class SahiyUpdate {
  constructor(private readonly sahiyService: SahiyService,
    private readonly botService: BotService,) {}

  @Action(/^sahiy_\d+$/)
  async onClickSahiy(@Ctx() ctx: Context) {
    await this.sahiyService.onClickSahiy(ctx);
  }

  @Hears("Ro'yxatdan o'tish")
  async addNewSahiy(@Ctx() ctx: Context) {
    await this.sahiyService.addNewSahiy(ctx);
  }

  @Hears("Bosh sahifaga qaytish")
  async mainPage(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @Hears("Asosiy menu")
  async mainMenu(@Ctx() ctx: Context) {
    await this.sahiyService.onClickSahiy(ctx);
  }
}
