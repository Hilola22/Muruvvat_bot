import { BotService } from "./bot.service";
import { Action, Command, Ctx, On, Start, Update } from "nestjs-telegraf";
import { join } from "path";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { Context } from "telegraf";
import axios from "axios";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @Action(/^(sahiy|sabrli)__\d+$/)
  async onClickRole(@Ctx() ctx: Context) {
    await this.botService.ClickRole(ctx);
  }

  @Action(/^murojat_yollash__\d+$/)
  async onClickMurojatYollash(@Ctx() ctx: Context) {
    await this.botService.onClickMurojatYollash(ctx);
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.botService.text(ctx);
  }

  @On("contact")
  async contact(@Ctx() ctx: Context) {
    await this.botService.contact(ctx);
  }

  @On("location")
  async location(@Ctx() ctx: Context) {
    await this.botService.location(ctx);
  }

  @On("photo")
  async onPhoto(@Ctx() ctx: Context) {
    this.botService.onPhoto(ctx);
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    await this.botService.stop(ctx);
  }
}
