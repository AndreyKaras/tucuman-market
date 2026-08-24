---
version: alpha
name: Tucumán Market Fresh Commerce
sourceOfTruth: true
---

# Дизайн-система Tucumán Market

Нормативный источник для витрины, checkout, аккаунта и admin. Интерфейс должен
быть светлым, практичным и товарным: районный grocery store, а не промо-лендинг.
Публичные языки — `es` и `en`, admin — испанский, валюта — ARS. В текущем релизе
используется только светлая тема и нет online-payment UI.

## Принципы

- Показывай товары, цены и основные действия раньше декоративного контента.
- Сохраняй спокойную иерархию, ровные сетки и достаточный воздух без пустоты.
- Не копируй чужие бренды, assets, тексты и точные композиции.
- Проектируй mobile-first и соблюдай WCAG 2.2 AA.
- Не показывай ссылки на `/admin` на публичной витрине.

## Токены

### Цвета

| Token                    | Значение  | Применение                        |
| ------------------------ | --------- | --------------------------------- |
| `primary-900`            | `#0A3D1B` | заголовки бренда, сильный зелёный |
| `primary-800`            | `#0F5425` | hover главного действия           |
| `primary-700`            | `#146C2E` | CTA, цена, active, success        |
| `primary-600`            | `#1F7A38` | вспомогательный зелёный           |
| `primary-100`            | `#DFF2E4` | мягкие выделения                  |
| `primary-50`             | `#F2FAF4` | service strip и hover surface     |
| `accent-700`             | `#C2410C` | sale badge                        |
| `accent-100`             | `#FFEDD5` | фон accent-состояния              |
| `background` / `surface` | `#FFFFFF` | фон страницы и карточек           |
| `surface-muted`          | `#F7F9F7` | нейтральные блоки                 |
| `surface-strong`         | `#EEF3EF` | skeleton и разделители            |
| `text`                   | `#17201A` | основной текст                    |
| `text-muted`             | `#59635C` | вторичный текст                   |
| `border`                 | `#DDE4DF` | обычная граница                   |
| `border-strong`          | `#B8C4BB` | controls и secondary button       |
| `error`                  | `#B42318` | ошибка                            |
| `focus`                  | `#2563EB` | focus ring                        |

Белый остаётся настоящим белым. Цвет не должен быть единственным носителем
смысла. Текст на `primary-700/800/900` — белый.

### Типографика

Основной шрифт — Geist с fallback `Arial, sans-serif`; технический — Geist Mono
с fallback `Consolas, monospace`.

| Стиль       | Размер / line-height / weight            |
| ----------- | ---------------------------------------- |
| Display     | `48px / 1.08 / 700`, tracking `-0.03em`  |
| H1          | `40px / 1.12 / 700`, tracking `-0.025em` |
| H2          | `32px / 1.2 / 700`                       |
| H3          | `24px / 1.25 / 650`                      |
| Body large  | `18px / 1.55 / 400`                      |
| Body        | `16px / 1.5 / 400`                       |
| Body small  | `14px / 1.45 / 400`                      |
| Label       | `14px / 1.25 / 600`                      |
| Price large | `24px / 1.2 / 700`                       |
| Price card  | `18px / 1.25 / 700`                      |

На mobile H1 обычно `32px`. Основной текст и поля не уменьшаются ниже `16px`.
Мелкий текст допустим только для label, metadata и badges.

### Геометрия

- Базовый шаг spacing: `4px`; основные интервалы: `8, 12, 16, 20, 24, 32,
40, 48, 64, 80px`.
- Радиусы: `4px` badge, `8px` controls, `12px` cards, `16px` крупные panels,
  `9999px` pills.
- Container: максимум `1280px`; gutter `16px` mobile, `24px` tablet, `32px`
  desktop.
- Touch target: минимум `44×44px`; стандартные input/button — `48px`.
- Тени используются только для overlay, drawer и hover affordance; не создавай
  тяжёлую «плиточную» страницу.

## Responsive layout

| Диапазон      | Правило                                                 |
| ------------- | ------------------------------------------------------- |
| `320–639px`   | gutter 16, product/category grid по 2 карточки          |
| `640–767px`   | gutter 24, product grid 3 карточки при доступной ширине |
| `768–1023px`  | tablet-композиция, фильтры над каталогом                |
| `1024–1279px` | 12-column desktop, gutter 32                            |
| `1280px+`     | container 1280, product grid 4 карточки                 |

- Не допускай horizontal overflow страницы.
- Две товарные карточки сохраняются начиная с 320px; компактные controls не
  должны сжимать цифру количества или иконку корзины.
- Hero показывает изображение только при ширине `900px+`. Ниже 900px остаётся
  компактная текстовая карточка без загрузки hero image.
- Категории: 4 колонки wide desktop, 3 tablet, 2 mobile. Горизонтальный rail на
  mobile не используется.
- Каталог: 4 колонки wide desktop, 3 tablet, 2 mobile. Filters становятся
  компактной верхней панелью ниже desktop.
- Checkout: 2 колонки desktop, 1 mobile; summary следует после формы.

## Компоненты витрины

### Header

- Desktop: brand, primary navigation, search, locale switcher, cart.
- Mobile/tablet: menu, brand, locale и cart в первом ряду; search — во втором.
- Sticky header не перекрывает заголовок после навигации.
- Mobile navigation — modal drawer: Escape закрывает, фон блокирует scroll,
  фокус возвращается на кнопку открытия.
- Locale switch сохраняет эквивалентный route, query и корзину.
- Badge корзины остаётся читаемым при `0`, двух цифрах и `99+`.

### Hero

- Одна ясная ценность, краткий supporting text и один главный CTA.
- На desktop композиция компактна и оставляет начало категорий в первом viewport.
- На ширине ниже 900px отсутствуют картинка и пустое место под неё.

### Category tile

- Одно предметное изображение, локализованное название и переход в категорию.
- Все изображения имеют единый масштаб и спокойный фон.
- Hover меняет border/shadow или scale изображения, но не сдвигает карточку.

### Product card

- Порядок: media → name → optional unit metadata → price/action row.
- Карточка и media frame не двигаются на hover. Допустим только плавный небольшой
  scale изображения при `prefers-reduced-motion: no-preference`.
- Изображение и название ведут на страницу товара; отдельной кнопки «Подробнее»
  нет.
- Цена закреплена в нижнем ряду, кнопка корзины расположена справа и не сжимается.
- После добавления появляется компактный quantity control с видимой цифрой.
- Net content показывается один раз: не дублируй значение, уже входящее в name.
- Sale показывает текущую цену, зачёркнутую старую цену и badge; out-of-stock
  блокирует добавление и объясняет состояние текстом.

### Search, filters и pagination

- Search имеет видимый label для assistive technology, submit action и recent
  searches. Очистка истории не ломает поиск при недоступном storage.
- Filters, sort и page отражаются в URL и сохраняются при локализации маршрута.
- Каталог показывает текущий и общий count. «Показать ещё» загружает следующую
  серверную порцию; не передавай весь каталог в Client Component заранее.
- Для 300–500 товаров фильтрация и pagination должны выполняться repository/БД,
  а browser получает только отображаемую порцию и компактные данные корзины.

### Cart

- Добавление товара не открывает drawer автоматически.
- Header cart и дополнительный desktop dock открывают одну корзину. Dock находится
  справа за container, не перекрывает контент и скрыт на узких экранах.
- Drawer имеет focus management, Escape, overlay и понятный переход на cart page.
- Cart row показывает thumbnail, name, unit, quantity control, line price и remove.

### Footer

- Desktop: brand, store links, contacts/address и opening hours.
- Mobile: brand на всю ширину; `Tienda` и `Contacto` — две колонки; WhatsApp
  расположен внутри contact column под телефоном, address/hours — на всю ширину.
- `768–900px`: один компактный ряд без пустой сетки 2×2; `640–767px` использует
  mobile-иерархию.

## Состояния и motion

- Для route и карточек используй skeleton с той же responsive grid, что у готового
  контента, чтобы не создавать layout shift.
- Пустое состояние объясняет причину и даёт одно действие; error — способ повтора.
- Transition UI: `140–220ms`, свойства указываются явно. Не используй `transition-all`.
- Уважай `prefers-reduced-motion`; содержимое не должно зависеть от анимации.

## Accessibility и качество

- Один логичный H1, семантические landmarks и skip link.
- Все controls доступны с клавиатуры, имеют accessible name и видимый focus.
- Изображения имеют содержательный локализованный alt; декоративные скрыты.
- Ошибки формы связаны с полями; статусные сообщения используют live region
  только когда это действительно нужно.
- Проверяй минимум 320px, промежуточную ширину около 850px и desktop; дополнительно
  browser console, horizontal overflow, keyboard и reduced motion.

## Запрещённые паттерны

- cream background, dark mode, glassmorphism и чрезмерные gradients;
- animated card translation, bounce и layout-affecting hover;
- одна товарная карточка в mobile catalog без особой причины;
- скрытие обязательной информации только в tooltip;
- hardcoded UI copy вместо `messages/es.json` и `messages/en.json`;
- client-side загрузка полного каталога при наличии server/repository boundary.
