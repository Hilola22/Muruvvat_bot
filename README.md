# Muruvvat Telegram Bot

Bu Telegram bot foydalanuvchilarni ro'yxatdan o'tkazish va ma'lumotlarini saqlash uchun yaratilgan.

## Xususiyatlar

- 🤖 Telegram bot orqali foydalanuvchilar ro'yxatdan o'tish
- 🎭 Ikkita rol: "Sahiy" va "Sabrli"
- 📱 Foydalanuvchi ma'lumotlarini to'plash (ism, telefon, manzil)
- 🗄️ PostgreSQL ma'lumotlar bazasi bilan ishlash
- 🔄 Qaytadan ro'yxatdan o'tish imkoniyati
- 📊 Foydalanuvchi ma'lumotlarini ko'rish

## O'rnatish

### 1. Dasturlarni o'rnatish

```bash
npm install
```

### 2. Ma'lumotlar bazasini sozlash

PostgreSQL ma'lumotlar bazasini yarating va quyidagi ma'lumotlarni `.env` faylida sozlang:

```env
# Bot Configuration
BOT_TOKEN=your_telegram_bot_token_here

# Database Configuration
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password_here
PG_DB=muruvvat_bot

# Server Configuration
PORT=3030
```

### 3. Telegram bot tokenini olish

1. [@BotFather](https://t.me/botfather) ga murojaat qiling
2. `/newbot` buyrug'ini yuboring
3. Bot nomini va username ni kiriting
4. Olingan tokeni `.env` faylida `BOT_TOKEN` ga yozing

## Ishga tushirish

```bash
# Development rejimida
npm run start:dev

# Production rejimida
npm run start:prod
```

## Bot ishlash tartibi

1. **/start** - Botni ishga tushirish
2. **Rol tanlash** - "Sahiy" yoki "Sabrli" rolini tanlash
3. **Ism kiritish** - Foydalanuvchi ismini kiriting
4. **Telefon raqam** - Contact orqali telefon raqamni yuborish
5. **Manzil** - Manzilni kiriting yoki "O'tkazib yuborish"
6. **Yakunlash** - Ro'yxatdan o'tish yakunlanadi

## API Endpointlar

- `GET /api/docs` - Swagger dokumentatsiyasi

## Texnologiyalar

- **Backend:** NestJS, TypeScript
- **Database:** PostgreSQL, Sequelize
- **Bot Framework:** Telegraf
- **Documentation:** Swagger

## Muallif

Muruvvat loyihasi
