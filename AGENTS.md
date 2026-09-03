# Инструкции для агентов — Tucumán Market

Работай как senior full-stack инженер. Общайся с пользователем по-русски, если
он не попросил иначе; код, команды и идентификаторы пиши по-английски.

## Контекст задачи

Перед любой работой прочитай этот файл целиком. Затем загружай только документы,
которые относятся к задаче:

| Область                                     | Обязательный документ                          |
| ------------------------------------------- | ---------------------------------------------- |
| Scope, цели и релизы                        | [PROJECT_BRIEF.md](./PROJECT_BRIEF.md)         |
| Сценарии, роли и бизнес-правила             | [docs/REQUIREMENTS.md](./docs/REQUIREMENTS.md) |
| Архитектура, backend, данные, интеграции    | [ARCHITECTURE.md](./ARCHITECTURE.md)           |
| Страницы, React, CSS, responsive и любой UI | [DESIGN.md](./DESIGN.md)                       |
| Feature, bug fix или refactor               | [docs/GIT_FLOW.md](./docs/GIT_FLOW.md)         |
| Реализация или проверка прогресса           | [docs/ROADMAP.md](./docs/ROADMAP.md)           |

Ближайший вложенный `AGENTS.md` имеет приоритет. Перед изменениями проверь
`git status`, `package.json` и целевые файлы. Не загружай несвязанные документы.

## Definition of Done

- Внесено минимальное целостное изменение без перезаписи пользовательской работы.
- Поведение и документация согласованы; архитектурные решения отражены в
  `ARCHITECTURE.md`.
- Для задачи из roadmap её статус обновлён в том же change после фактической
  реализации и проверок. Не ставь `DONE` частичной или непроверенной работе;
  актуализируй «Текущую следующую задачу».
- Запущены пропорциональные проверки из `package.json`; незапущенные проверки и
  ограничения явно указаны в отчёте.
- Для UI проверены mobile, desktop, console и horizontal overflow через доступный
  browser/DevTools. Без браузерной проверки не заявляй о визуальной корректности.
- Просмотрены итоговые `git diff` и `git status`.

`ROADMAP.md` не определяет завершённость кода автоматически: это семантическое
решение. Обязательное обновление roadmap в Definition of Done является механизмом
его синхронизации для каждого агента.

## Windows и npm

В PowerShell запускай `npm.cmd run <script>` и `npx.cmd <command>`: это обходит
`npm.ps1`, который может блокироваться Execution Policy. В Git Bash используй
обычные `npm` и `npx`. Не меняй системную Execution Policy ради работы агента.

## Инварианты продукта

- Публичные локали: аргентинский испанский (`es`, default) и английский (`en`).
  Валюта всегда ARS; admin UI — на испанском.
- Витрина не показывает ссылки на `/admin`; безопасность обеспечивается не
  сокрытием URL, а серверной проверкой сессии и роли `ADMIN` на каждой admin
  странице, Server Action и Route Handler.
- Онлайн-оплата не входит в текущий scope.
- Заказ сохраняется до Telegram-уведомления. Сбой уведомления не отменяет заказ.
- `OrderItem` хранит снимок названия, SKU, цены, количества и единицы.
- Никогда не доверяй браузерным итогам, ценам, остаткам, user ID, ролям или
  статусам: загружай и проверяй их на сервере.

## Код и данные

- Strict TypeScript; избегай `any`, сужай `unknown` на границах.
- Предпочитай Server Components. Добавляй `'use client'` только для браузерного
  состояния и взаимодействия; не размещай бизнес-логику в компонентах и handlers.
- Внешние данные валидируй на серверной границе. Не добавляй абстракции и
  зависимости без практической необходимости.
- Денежные значения храни в точном типе БД и не вычисляй итоговые суммы через
  floating point.
- `data/catalog/*.json` — детерминированные demo/seed-данные, не будущий
  production source of truth.
- У каждого публичного товара и категории есть переводы `es`/`en`; SKU уникален
  глобально, slug — в локали. `compareAtPrice` равен `null` или больше `price`.
- `stockQuantity === 0` означает out of stock, `isActive === false` скрывает товар.
- UI-тексты находятся в обоих `messages/*.json` под одинаковым семантическим
  ключом. Не меняй согласованный контент без запроса.
- Используй semantic HTML, keyboard controls, visible focus и осмысленный alt.

## Безопасность и секреты

- Расширенный `$tucuman-market-security-review` используй при явном запросе и при
  изменениях auth/roles, API/Actions, Prisma/БД, checkout, денег/остатков,
  uploads, секретов или внешних интеграций. Для изолированного CSS/UI он не нужен.
- Секреты хранятся только в `.env.local`/deployment provider и никогда не
  выводятся, не коммитятся и не получают префикс `NEXT_PUBLIC_`.
- Поддерживай безопасный `.env.example`; проверяй env централизованно в
  `src/lib/env.ts`. Не редактируй применённую Prisma migration.

## Git

Следуй `docs/GIT_FLOW.md`. Не меняй код в `main`, `master` или `dev`. Merge,
push, rebase, Pull Request и удаление branch/worktree требуют отдельного прямого
разрешения. Не используй destructive Git-команды и не коммить несвязанные файлы.

## Проверки

- Markdown: `npm.cmd run format:check`.
- TypeScript/логика: `lint`, `typecheck`, релевантные тесты; для общего поведения
  — полный `test`.
- Каталог/seed: дополнительно `validate:catalog`.
- UI: `lint`, `typecheck` и browser QA; тесты добавляй при изменении логики.
- Конфигурация, маршрутизация, dependencies или крупная сквозная задача:
  дополнительно `build`.
- Перед merge/release или завершением значимой feature: `format:check`, `lint`,
  `typecheck`, `test`, `build`.

Не запускай несвязанные дорогие проверки после точечной правки и не утверждай,
что незапущенная проверка прошла.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
