# Дорожная карта

Статусы: `TODO`, `IN PROGRESS`, `DONE`, `BLOCKED`.

## Как обновляется прогресс

Roadmap не может надёжно определить по коду, завершено ли бизнес-требование.
Поэтому его обновление входит в Definition of Done в `AGENTS.md`: агент обязан в
том же change сопоставить выполненную работу с пунктом ниже, поставить честный
статус после проверок и актуализировать «Текущую следующую задачу». Отдельный
генератор чекбоксов не используется, потому что он создавал бы ложные `DONE`.

## Этап 0 — Основа — `IN PROGRESS`

- [x] Настроить `next-intl` с основной локалью `es` и дополнительной `en`.
- [x] Настроить scripts для lint, typecheck, Vitest, Prettier и catalog validation.
- [x] Подтвердить product, architecture, requirements, design и workflow документы.
- [ ] Установить только зависимости этапа PostgreSQL/Prisma.
- [ ] Настроить PostgreSQL, Prisma schema и первоначальную migration.
- [ ] Настроить JSON → Prisma seed pipeline для текущего каталога.
- [ ] Настроить централизованную валидацию окружения.
- [ ] Добавить CI для format, lint, typecheck, tests, catalog validation и build.
- [ ] Настроить Playwright для критических E2E-сценариев.

Критерий: чистая установка, безопасный env template, рабочие migration/seed и
зелёный CI.

## Этап 1 — Вертикальный срез витрины — `DONE` для JSON adapter

- [x] Каркас, дизайн-токены, responsive header/footer и service states.
- [x] Локализованная главная с compact hero и category grid 4/3/2.
- [x] JSON catalog repository категорий и товаров.
- [x] Catalog/category routes и сетка товаров 4/3/2 без layout shift skeleton.
- [x] Локализованная страница товара.
- [x] Поиск, фильтры, сортировка и URL pagination.
- [x] Loading, empty, error и not-found states.
- [x] Разделить `Header` на search, locale switcher и mobile navigation.
- [x] Передавать в client grid только видимую серверную порцию каталога.
- [ ] После Prisma перевести фильтры/pagination на database repository для
      300–500 товаров без загрузки полного каталога в browser.

Критерий JSON-среза выполнен: покупатель может просматривать текущий двуязычный
demo-каталог. Database scalability завершается вместе с этапом 0.

## Этап 2 — Гостевая корзина — `IN PROGRESS`

- [x] Domain-правила корзины и unit/component/integration тесты.
- [x] Версионированное локальное сохранение гостевой корзины через reducer/context.
- [x] Drawer, desktop cart dock и отдельная cart page.
- [x] Добавление товара не открывает drawer автоматически.
- [x] Корзина сохраняется при reload и переключении локали.
- [x] `CartProvider` получает компактные product snapshots, а не полные записи.
- [ ] При checkout повторно проверять на сервере товар, цену, остаток и количество.

Критерий: локальная корзина уже сохраняется и восстанавливается; полная безопасная
проверка завершится после появления server checkout.

## Этап 3 — Оформление заказа и заказы — `TODO`

- [ ] Форма доставки/самовывоза и валидация.
- [ ] Настройки магазина и правила способов получения.
- [ ] Идемпотентное транзакционное создание заказа и snapshots позиций.
- [ ] Атомарная проверка/изменение остатков и защита от повторной отправки.
- [ ] Страница подтверждения.
- [ ] Telegram outbox/job с безопасными retry.
- [ ] E2E обоих способов получения.

Критерий: гость оформляет заказ, магазин получает надёжное уведомление.

## Этап 4 — Администрирование — `TODO`

- [ ] Better Auth и создание первого администратора.
- [ ] Авторизация admin routes, actions и handlers.
- [ ] CRUD товаров и категорий.
- [ ] Upload через storage abstraction.
- [ ] Список/детали заказов и переходы статусов.
- [ ] Редактор store settings.
- [ ] Auth/admin integration и E2E tests.

Критерий: магазин управляется без редактирования кода и seed-файлов.

## Этап 5 — Аккаунты покупателей — `TODO`

- [ ] Registration/login и профиль.
- [ ] Сохранённые адреса.
- [ ] Корзина в БД и идемпотентное объединение guest cart.
- [ ] История/детали принадлежащих пользователю заказов.
- [ ] Повтор заказа по актуальным данным каталога.

Критерий: аккаунт сохраняет корзину и историю заказов.

## Этап 6 — Качество и релиз — `TODO`

- [ ] Audit переводов, hardcoded copy и неиспользуемых messages.
- [ ] Accessibility/keyboard audit и responsive visual QA.
- [ ] Performance/image optimization для production-каталога.
- [ ] Localized SEO, sitemap, robots и structured data.
- [ ] Security review auth, authorization, inputs, uploads, secrets и logs.
- [ ] Production DB/storage/Telegram/Vercel configuration.
- [ ] Backup/restore и эксплуатационная документация.

Критерий: production deployment проверен, документирован и готов для портфолио.

## Текущая следующая задача

Настроить PostgreSQL и Prisma, создать первоначальную migration и выполнить seed
по цепочке JSON → Prisma seed → PostgreSQL. Сразу спроектировать repository query
с server-side pagination/filtering для 300–500 товаров, не устанавливая заранее
остальные зависимости backend-этапов.
