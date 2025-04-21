# 🚀 Інструкція по запуску Telegram WebApp бота на Render

## Крок 1: Завантаж zip-архів
1. Завантаж і розпакуй архів із кодом
2. Створи новий репозиторій на GitHub (наприклад, `flappy-webapp-bot`)
3. Завантаж усі файли в репозиторій

## Крок 2: Перейди на [https://render.com](https://render.com)
1. Увійди в акаунт
2. Натисни кнопку `+ Add new` → `Web Service`
3. Обери свій GitHub репозиторій
4. Налаштування:
    - Name: `telegram-webapp-bot`
    - Build Command: `npm install`
    - Start Command: `npm start`

## Крок 3: Додай змінні середовища
У вкладці `Environment` додай:
- `TOKEN` = твій токен Telegram бота
- `WEBAPP_URL` = https://birdgame-brown.vercel.app

## Крок 4: Зареєструй webhook
У браузері встав:
```
https://api.telegram.org/bot<твій_токен>/setWebhook?url=https://<твоє_render_імʼя>.onrender.com/webhook
```

Готово ✅