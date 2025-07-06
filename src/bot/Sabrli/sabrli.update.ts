import { Action, Ctx, Hears, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { SabrliService } from "./sabrli.service";

@Update()
export class SabrliUpdate {
  constructor(private readonly sabrliService: SabrliService) {}

  @Action(/^sabrli_\d+$/)
  async onClickSabrli(@Ctx() ctx: Context) {
    await this.sabrliService.onClickSabrli(ctx);
  }

  @Hears("Ma'lumotlarni kiritish")
  async addNewSabrli(@Ctx() ctx: Context){
    await this.sabrliService.addNewSabrli(ctx)
  }
}