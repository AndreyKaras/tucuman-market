# Tucumán Market

Двуязычный продуктовый интернет-магазин для Сан-Мигель-де-Тукуман на Next.js
App Router. Основная локаль публичной витрины — аргентинский испанский (`es`),
дополнительная — английский (`en`), валюта — ARS.

Основа проекта и локализованная frontend-витрина находятся в активной
разработке. Сейчас реализованы маршруты `/es` и `/en`, главная страница,
каталог, поиск и визуальная гостевая корзина. Текущие 20 товаров служат
исходными данными для будущей проверки цепочки JSON → Prisma seed → PostgreSQL
→ каталог. Prisma schema и seed пока не реализованы.

## Локальный запуск

Git root находится на один уровень выше каталога приложения. Выполняйте команды
из каталога `tucuman-market/`. Требуется Node.js 20.9 или новее:

```bash
npm ci
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000). Корневой URL
перенаправляет на `/es`; английская версия доступна по `/en`.

Текущая стартовая страница находится в
`src/app/[locale]/(store)/page.tsx`.

## Доступные проверки

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run validate:catalog
npm run build
```

Vitest подключён для unit-тестов. Playwright и CI остаются незавершёнными
задачами этапа 0 в `docs/ROADMAP.md`.

## Документация

- `PROJECT_BRIEF.md` — область и цели продукта.
- `ARCHITECTURE.md` — принятые технические решения.
- `DESIGN.md` — дизайн-система и правила интерфейса.
- `docs/REQUIREMENTS.md` — функциональные требования.
- `docs/ROADMAP.md` — этапы реализации и текущий следующий шаг.
- `docs/GIT_FLOW.md` — локальный Git workflow.

## Deployment

Целевая платформа — Vercel. Поскольку Next.js-приложение вложено в Git root,
в настройках проекта Vercel укажите Root Directory `tucuman-market`. Build
Command остаётся `npm run build`, а остальные параметры Next.js могут
определяться автоматически.

Когда появятся переменные окружения, их имена без реальных значений должны быть
задокументированы в `.env.example`. Production-секреты настраиваются у hosting
provider и не сохраняются в Git.

Дополнительные сведения о deployment доступны в
[документации Next.js](https://nextjs.org/docs/app/getting-started/deploying).
