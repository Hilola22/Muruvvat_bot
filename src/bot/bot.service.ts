import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { Context, Markup } from "telegraf";

@Injectable()
export class BotService {
  constructor(@InjectModel(Bot) private readonly botModel: typeof Bot) {}

  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await this.botModel.create({
          user_id: user_id!,
          first_name: ctx.from?.first_name!,
          last_name: ctx.from?.last_name!,
          language_code: ctx.from?.language_code!,
          username: ctx.from?.username!,
        });
        ctx.reply("Qaysi ro'ldan ro'yxatdan o'tmoqchisiz?", {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Sahiy",
                  callback_data: `sahiy_${user_id}`,
                },
                {
                  text: "Sabrli",
                  callback_data: `sabrli_${user_id}`,
                },
              ],
            ],
          },
        });
      } else {
        await ctx.reply(
          `Xush kelibsiz, ${user.first_name}! Siz allaqachon ro'yxatdan o'tgansiz.`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Ma'lumotlarni ko'rish",
                    callback_data: `info_${user_id}`,
                  },
                  {
                    text: "Qaytadan ro'yxatdan o'tish",
                    callback_data: `restart_${user_id}`,
                  },
                ],
              ],
            },
          }
        );
      }
    } catch (error) {
      console.log("Error on Start", error);
    }
  }

  async onClickSahiy(ctx: Context) {
    try {
      const callbackData = ctx.callbackQuery!["data"];
      const user_id = parseInt(callbackData.split("_")[1]);
      const user = await this.botModel.findOne({ where: { user_id } });

      if (!user) {
        await ctx.reply("Siz hali ro'yxatdan o'tmagansiz", {
          parse_mode: "HTML",
          ...Markup.keyboard(["/start"]).resize().oneTime(),
        });
      } else {
        user.role = "sahiy";
        user.last_state = "name";
        await user.save();
        await ctx.reply("Ismingizni kiriting:");
      }
    } catch (error) {
      console.log("Error on Click Sahiy", error);
    }
  }

  async onClickSabrli(ctx: Context) {
    try {
      const callbackData = ctx.callbackQuery!["data"];
      const user_id = parseInt(callbackData.split("_")[1]);
      const user = await this.botModel.findOne({ where: { user_id } });

      if (!user) {
        await ctx.reply("Siz hali ro'yxatdan o'tmagansiz", {
          parse_mode: "HTML",
          ...Markup.keyboard(["/start"]).resize().oneTime(),
        });
      } else {
        user.role = "sabrli";
        user.last_state = "name";
        await user.save();
        await ctx.reply("Ismingizni kiriting:");
      }
    } catch (error) {
      console.log("Error on Click Sabrli", error);
    }
  }

  async onText(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findOne({
        where: { user_id: user_id },
      });

      if (!user) {
        await ctx.reply("Siz hali ro'yxatdan o'tmagansiz", {
          parse_mode: "HTML",
          ...Markup.keyboard(["/start"]).resize().oneTime(),
        });
      } else {
        if (user.last_state === "name") {
          if ("text" in ctx.msg) {
            user.name = ctx.msg.text;
            user.last_state = "phone_number";
            await user.save();

            await ctx.reply("Telefon raqamingizni yuboring", {
              ...Markup.keyboard([
                Markup.button.contactRequest("Contactni ulashish"),
              ]).resize(),
            });
          }
        } else if (user.last_state === "location") {
          if ("text" in ctx.msg && ctx.msg.text === "O'tkazib yuborish") {
            user.last_state = "completed";
            await user.save();

            await ctx.reply("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi! 🎉", {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Ma'lumotlarni ko'rish",
                      callback_data: `info_${user_id}`,
                    },
                  ],
                ],
              },
            });
          }
        }
      }
    } catch (error) {
      console.log("Error on Text", error);
    }
  }

  async onContact(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findOne({
        where: { user_id: user_id },
      });

      if (!user) {
        await ctx.reply("Siz hali ro'yxatdan o'tmagansiz", {
          parse_mode: "HTML",
          ...Markup.keyboard(["/start"]).resize().oneTime(),
        });
      } else {
        if (user.last_state === "phone_number") {
          if ("contact" in ctx.msg) {
            user.phone_number = ctx.msg.contact.phone_number;
            user.last_state = "location";
            await user.save();

            await ctx.reply(
              "Manzilingizni kiriting: ",
              Markup.keyboard(["O'tkazib yuborish"]).resize()
            );
          }
        }
      }
    } catch (error) {
      console.log("Error on Contact", error);
    }
  }

  async onLocation(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findOne({
        where: { user_id: user_id },
      });

      if (!user) {
        await ctx.reply("Siz hali ro'yxatdan o'tmagansiz", {
          parse_mode: "HTML",
          ...Markup.keyboard(["/start"]).resize().oneTime(),
        });
      } else {
        if (user.last_state === "location") {
          if ("location" in ctx.msg) {
            user.last_state = "completed";
            await user.save();

            await ctx.reply("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi! 🎉", {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Ma'lumotlarni ko'rish",
                      callback_data: `info_${user_id}`,
                    },
                  ],
                ],
              },
            });
          }
        }
      }
    } catch (error) {
      console.log("Error on Location", error);
    }
  }

  async onShowInfo(ctx: Context) {
    try {
      const callbackData = ctx.callbackQuery!["data"];
      const user_id = parseInt(callbackData.split("_")[1]);
      const user = await this.botModel.findOne({ where: { user_id } });

      if (!user) {
        await ctx.reply("Foydalanuvchi topilmadi!");
      } else {
        const info = `
                    📋 **Sizning ma'lumotlaringiz:**
                    👤 **Ism:** ${user.name || "Kiritilmagan"}
                    🎭 **Rol:** ${user.role || "Tanlanmagan"}
                    📱 **Telefon:** ${user.phone_number || "Kiritilmagan"}
                    📍 **Manzil:** ${user.last_state === "completed" ? "Kiritilgan" : "Kiritilmagan"}
                    📊 **Holat:** ${user.last_state === "completed" ? "✅ Yakunlangan" : "⏳ Jarayonda"}
        `;

        await ctx.reply(info, {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Qaytadan ro'yxatdan o'tish",
                  callback_data: `restart_${user_id}`,
                },
              ],
            ],
          },
        });
      }
    } catch (error) {
      console.log("Error on Show Info", error);
    }
  }

  async onRestart(ctx: Context) {
    try {
      const callbackData = ctx.callbackQuery!["data"];
      const user_id = parseInt(callbackData.split("_")[1]);
      const user = await this.botModel.findOne({ where: { user_id } });

      if (!user) {
        await ctx.reply("Foydalanuvchi topilmadi!");
      } else {
        user.name = "";
        user.role = "";
        user.phone_number = "";
        user.last_state = "role";
        await user.save();

        await ctx.reply("Qaysi ro'ldan ro'yxatdan o'tmoqchisiz?", {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Sahiy",
                  callback_data: `sahiy_${user_id}`,
                },
                {
                  text: "Sabrli",
                  callback_data: `sabrli_${user_id}`,
                },
              ],
            ],
          },
        });
      }
    } catch (error) {
      console.log("Error on Restart", error);
    }
  }
}
