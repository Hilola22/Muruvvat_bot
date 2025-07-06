import { BotService } from "./bot.service";
import { Action, Command, Ctx, On, Start, Update } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log("bot ishga tushdi");
    await this.botService.start(ctx);
  }

  @Action(/^info_\d+$/)
  async onShowInfo(@Ctx() ctx: Context) {
    await this.botService.onShowInfo(ctx);
  }

  @Action(/^restart_\d+$/)
  async onRestart(@Ctx() ctx: Context) {
    await this.botService.onRestart(ctx);
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    await this.botService.onLocation(ctx);
  }
}
