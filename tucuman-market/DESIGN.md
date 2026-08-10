---
version: alpha
name: Tucumán Market Fresh Commerce
description: "Светлая, практичная и доступная дизайн-система двуязычного продуктового магазина в Тукумане."
colors:
  primary-900: "#0A3D1B"
  primary-800: "#0F5425"
  primary-700: "#146C2E"
  primary-600: "#1F7A38"
  primary-100: "#DFF2E4"
  primary-50: "#F2FAF4"
  accent-700: "#C2410C"
  accent-100: "#FFEDD5"
  background: "#FFFFFF"
  surface: "#FFFFFF"
  surface-muted: "#F7F9F7"
  surface-strong: "#EEF3EF"
  text: "#17201A"
  text-muted: "#59635C"
  text-subtle: "#6B756E"
  border: "#DDE4DF"
  border-strong: "#B8C4BB"
  on-primary: "#FFFFFF"
  success: "#146C2E"
  warning: "#A15C07"
  error: "#B42318"
  info: "#1D4ED8"
  focus: "#2563EB"
typography:
  display:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: -0.025em
  headline-md:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: -0.01em
  body-lg:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
  body-md:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  label-md:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.25
  label-sm:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0.01em
  price-lg:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.015em
  price-md:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.25
  technical:
    fontFamily: "Geist Mono, Consolas, monospace"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  full: 9999px
spacing:
  0: 0px
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
  20: 80px
  page-gutter-mobile: 16px
  page-gutter-tablet: 24px
  page-gutter-desktop: 32px
  container-max: 1280px
components:
  button-primary:
    backgroundColor: "{colors.primary-700}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-800}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary-800}"
    borderColor: "{colors.border-strong}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: "0 20px"
  button-compact:
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 40px
    padding: "0 16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    borderColor: "{colors.border}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: "0 16px"
  product-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: 16px
  category-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: 16px
  badge-sale:
    backgroundColor: "{colors.accent-700}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xs}"
    padding: "4px 8px"
  badge-status:
    backgroundColor: "{colors.primary-100}"
    textColor: "{colors.primary-900}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
---

# Дизайн-система Tucumán Market

## Overview

Tucumán Market — понятный и доброжелательный продуктовый магазин для жителей
Тукумана. Интерфейс должен создавать ощущение свежести, надёжности и близости
районного магазина, но оставаться достаточно строгим для ежедневных покупок,
оформления заказов и административной работы.

Визуальное направление использует общие сильные стороны grocery-commerce
референсов Shopery: белый фон, насыщенный зелёный цвет, выразительные фотографии
продуктов, ясную ценовую иерархию и компактные торговые компоненты. Нельзя
копировать логотип, assets, тексты, точную композицию страниц или фирменные
элементы Shopery. Настоящий документ является самостоятельным источником истины.

Ненормативная база, использованная при формировании системы:

- формат `DESIGN.md`: https://github.com/google-labs-code/design.md/blob/main/docs/spec.md;
- обзор Shopery: https://shopery.netlify.app/index.html#preview;
- storefront Shopery: https://shopery.netlify.app/main/#;
- order details Shopery: https://shopery.netlify.app/main/order-details.

Реализация не должна зависеть от доступности этих страниц: все нормативные
значения и правила зафиксированы ниже.

Основные качества системы:

- свежая, локальная и практичная, без премиальной холодности;
- светлая и воздушная, но не пустая и не похожая на landing page;
- визуально ориентированная на товары, цены и быстрые действия;
- единообразная для витрины, checkout, аккаунта и admin;
- mobile-first, двуязычная и соответствующая WCAG 2.2 AA;
- без online-payment UI и без видимых ссылок на `/admin` на витрине.

Публичная витрина использует аргентинский испанский как исходный язык и
английский как дополнительный. Admin UI представлен на испанском. Валюта всегда
ARS. Текущий релиз использует только светлую тему; dark mode не входит в
утверждённую дизайн-систему.

## Colors

Основной зелёный передаёт свежесть и используется для главных действий,
активной навигации, цен и подтверждённых состояний. Белый является настоящим
белым `#FFFFFF`, а не кремовым или серым. Мягкие нейтральные поверхности нужны
только для группировки и не должны визуально конкурировать с товарами.

- **Primary 700 (`#146C2E`)** — основные кнопки, активные элементы, цены и
  ключевые ссылки.
- **Primary 800–900** — hover, крупный wordmark и высококонтрастный зелёный
  текст.
- **Primary 50–100** — ненавязчивые success/status backgrounds и service bands.
- **Accent 700 (`#C2410C`)** — только sale, заметное изменение цены и редкие
  коммерческие акценты. Не использовать как второй основной brand color.
- **Text (`#17201A`)** — основной текст; muted и subtle — пояснения и metadata.
- **Border (`#DDE4DF`)** — основной способ разделения компонентов.
- **Focus (`#2563EB`)** — заметное focus-кольцо, визуально отличимое от зелёных
  success-состояний.
- **Error, warning, info** используются только семантически и всегда вместе с
  текстом или иконкой.

Все пары текста и фона должны соответствовать WCAG 2.2 AA: минимум 4.5:1 для
обычного текста и 3:1 для крупного текста и графических элементов управления.
Цвет не является единственным способом передачи скидки, ошибки, наличия или
статуса заказа.

## Typography

Основной шрифт — уже подключённый в проекте Geist с системными fallback. Он
подходит одновременно для дружелюбной витрины и плотного admin UI. Geist Mono
используется только для SKU, номера заказа и других коротких технических
идентификаторов; обычные цены не набираются моноширинным шрифтом.

- **Display / Headline:** короткие заголовки с плотным tracking и ясной
  двухуровневой иерархией. Не использовать display-размер для длинных текстов.
- **Body:** 16px является базовым размером. Пояснения могут использовать 14px,
  но основной контент и формы не уменьшаются ниже 16px на mobile.
- **Labels:** 14px/600 для кнопок и полей; 12px допустим только для компактных
  badges и вторичных metadata.
- **Prices:** цена визуально сильнее названия единицы продажи. ARS, число и
  `/ kg` или `/ unidad` должны читаться как одна группа.
- **Compare-at price:** меньше текущей цены, зачёркнута и использует muted color.

На viewport меньше 640px `display` уменьшается до 36px, `headline-lg` до 32px,
а `headline-md` до 28px. Размеры body и controls сохраняются. Заголовки не
должны оставлять одиночные короткие слова на новой строке при доступной ширине.

## Layout

Система использует mobile-first fluid layout и фиксированный максимальный
контейнер 1280px. Базовый ритм кратен 4px; основные интервалы кратны 8px.

### Grid и breakpoints

- **Mobile, 320–639px:** 4 условные колонки, gutter 16px.
- **Small/tablet, 640–767px:** 8 колонок, gutter 24px.
- **Tablet/desktop, 768–1023px:** 8 колонок, gutter 24px.
- **Desktop, 1024–1279px:** 12 колонок, gutter 32px.
- **Wide, от 1280px:** контейнер не шире 1280px и центрируется.

Breakpoints служат поведению контента, а не конкретным моделям устройств.
Компонент переключается на другую композицию только когда текущей не хватает
места.

### Ритм страниц

- Между крупными homepage-секциями используется 48–80px на desktop и 32–48px
  на mobile.
- Внутренний padding cards обычно 16px; в формах и summary panels — 20–24px.
- Основные страницы начинают содержимое с 24–32px после header/breadcrumb.
- Hero на desktop использует две сбалансированные области: короткий текст и
  одно сильное grocery-изображение. На mobile они складываются вертикально.
- Категории на desktop располагаются сеткой или rail; на mobile — горизонтальным
  scroll-snap rail с видимой частью следующего элемента.
- Product grid использует 4 колонки на wide desktop, 3 на tablet, 2 на mobile.
  На узких экранах controls карточки переходят в compact icon variant.
- Checkout использует форму и order summary в двух колонках на desktop и одну
  колонку на mobile. Summary следует после данных покупателя, но остаётся видимым
  рядом на широком экране.
- Order details и account используют один основной content column плюс узкую
  summary/navigation область только при достаточной ширине.
- Admin предпочитает tables, toolbars и split panels вместо превращения каждой
  строки в декоративную card. На mobile таблица получает контролируемый
  horizontal scroll или осмысленное list-представление.

Ни одна страница не должна создавать horizontal overflow на viewport 320px.
Sticky-элементы не перекрывают focus, ошибки формы и системную клавиатуру.

## Elevation & Depth

Иерархия строится прежде всего через белые и muted поверхности, borders,
spacing и типографику. Тяжёлые плавающие cards не соответствуют системе.

- Базовые cards: border `1px solid #DDE4DF`, без тени.
- Hover product card: border `#B8C4BB` и тень
  `0 6px 18px rgba(10, 61, 27, 0.08)`.
- Header, dropdown, cart drawer и modal могут использовать
  `0 12px 32px rgba(23, 32, 26, 0.12)`.
- Focus и selected states не обозначаются тенью elevation.
- Не использовать glow, glassmorphism, цветные размытия и постоянные крупные
  drop shadows.

Hover не должен сдвигать layout. Допустимы изменение border/shadow и подъём не
более 2px, отключаемый через `prefers-reduced-motion`.

## Shapes

Форма компонентов умеренно мягкая, без чрезмерно округлого «игрушечного» вида.

- 4px — badges, небольшие utility элементы и внутренние image frames.
- 8px — buttons, inputs, selects и quantity controls.
- 12px — product cards, category tiles и обычные panels.
- 16px — hero media, drawer sections и крупные информационные bands.
- Full radius — только status chips, avatar и небольшие круглые icon buttons.

Не использовать giant rounded containers вокруг целых страниц или секций.
Круглая форма допустима для иконки, но не должна превращать все controls в
pills. Радиус изображения согласуется с контейнером и всегда немного меньше
внешнего радиуса card.

## Components

### Header и навигация

- Desktop header состоит из optional service strip, основной строки с wordmark,
  essential navigation, search, locale switcher, account и cart.
- Search является заметным рабочим элементом, но не конкурирует с wordmark и
  cart. Высота соответствует обычным inputs — 48px.
- Активная nav-ссылка использует зелёный текст и короткую нижнюю линию; inactive
  links остаются тёмными, а не серыми до потери контраста.
- Cart показывает иконку, количество товаров и при наличии места subtotal. На
  mobile subtotal скрывается раньше счётчика.
- Mobile header использует первую строку brand/actions и вторую строку search.
  Остальная навигация открывается доступной кнопкой menu.
- Locale switcher должен быть коротким (`ES` / `EN`) и сохранять понятное
  accessible name. Переключение языка не выглядит primary action.
- На публичной витрине никогда не показывается ссылка на `/admin`.

### Buttons и icon buttons

- На экране обычно только одно визуально доминирующее primary action в каждой
  локальной группе.
- Primary button — зелёная заливка и белый текст; secondary — белая поверхность,
  зелёный текст и border; tertiary — текстовая ссылка без card-контейнера.
- Высота обычной кнопки 48px, compact — 40px. Интерактивная область любого icon
  button не меньше 44×44px.
- Hover затемняет green; active незначительно уменьшает brightness; disabled
  сохраняет читаемость, но не выглядит интерактивным.
- Focus ring: 2px `focus`, offset 2px, не обрезается overflow контейнера.
- Иконки используют единый outline-набор с размером 20–24px и stroke около 2px.
  Не использовать emoji и текстовые символы вместо UI icons.

### Search, fields и формы

- Labels всегда видимы; placeholder не заменяет label.
- Input, select и textarea используют белую поверхность, 1px border и focus
  ring. Textarea имеет минимальную высоту 112px.
- Ошибка размещается под полем, связывается через `aria-describedby` и не
  меняет смысл только цветом.
- Delivery и pickup оформляются как radio choice с названием, кратким
  пояснением и явным selected state, а не как декоративные cards без controls.
- Необязательные поля помечаются словом из locale messages, а не звёздочкой без
  объяснения.

### Category tile

- Category tile содержит одно предметное изображение, локализованное название и
  ненавязчивый directional icon.
- Изображения категорий используют одинаковый визуальный масштаб и чистый фон.
- Вся tile является одной ссылкой. Не помещать вложенную кнопку внутрь ссылки.
- Desktop tile остаётся компактной и горизонтальной либо почти квадратной;
  mobile rail показывает часть следующей категории.

### Product card

- Обязательная структура: media → badges → локализованное название → unit/net
  content → price group → quantity/add action.
- Product image использует стабильный квадратный или 4:3 frame и
  `object-fit: contain`, чтобы упаковки и продукты не обрезались случайно.
- Название занимает предсказуемое место, но не обрезается без доступного
  полного названия для assistive technology.
- Текущая цена — primary green. Sale price использует accent только при наличии
  корректной compare-at price; старая цена располагается рядом или ниже.
- `/ kg`, `/ unidad` и quantity step отображаются явно. Товар на вес нельзя
  визуально выдавать за товар с заранее известным итоговым весом.
- Out-of-stock card сохраняет читаемость, показывает текстовый статус и
  недоступное действие. Не делать весь товар полупрозрачным до нечитаемости.
- Low-stock и sale badges короткие и семантические. Не добавлять декоративные
  badges вроде «популярно» без данных продукта.
- На desktop quantity control и add-to-cart могут находиться рядом. На mobile
  используется компактная компоновка без уменьшения touch targets.

### Cart и checkout

- Cart drawer открывается со стороны, соответствующей reading direction, и
  сохраняет focus trap, понятное закрытие и возврат focus.
- Каждая cart row показывает thumbnail, название, unit, quantity control, цену
  и remove action. Итоги отделяются border, а не дополнительной вложенной card.
- Empty cart использует короткий текст и одно действие продолжения покупок;
  декоративная иллюстрация необязательна.
- Checkout показывает последовательные блоки: contact → fulfillment → address
  или pickup instructions → notes → review → confirmation.
- Order summary всегда показывает subtotal, delivery fee и total раздельно.
  Онлайн-оплата и логотипы платёжных систем отсутствуют.
- При изменении цены или остатка показывается локализованное inline-сообщение и
  конкретное действие для исправления корзины.

### Order details и статусы

- Верх страницы содержит номер заказа, дату, текущий status chip и основное
  допустимое действие.
- Status progression отображается как timeline/stepper с текстовыми labels.
  Завершённые шаги зелёные, будущие нейтральные, cancelled — красный отдельный
  исход, а не один из положительных шагов.
- Items используют snapshots названия, SKU, unit, количества и цены. Визуально
  это компактный list/table, а не повтор каталожных product cards.
- Customer, fulfillment и totals разделены заголовками и spacing. Персональные
  данные не используются как декоративный контент.
- На mobile timeline становится вертикальным, totals остаются легко
  сопоставимыми, а длинные order numbers безопасно переносятся или копируются.

### Account и admin

- Account сохраняет стиль витрины, но уменьшает декоративность: простая боковая
  навигация на desktop и select/menu на mobile.
- Admin является плотнее витрины, использует те же tokens и испанский UI, но
  отдаёт приоритет tables, filters, forms и status visibility.
- Admin login — простой центрированный form panel без storefront navigation.
- Опасные действия визуально отделены от primary actions, требуют понятного
  подтверждения и используют error color только по назначению.
- Не маскировать admin под отдельный несвязанный продукт и не добавлять другую
  палитру или типографику.

### Feedback и системные состояния

- Loading сохраняет геометрию будущего содержимого и не вызывает layout shift.
- Skeleton использует neutral surfaces без shimmer при reduced motion.
- Empty state объясняет состояние и предлагает одно следующее действие.
- Error state содержит локализованный заголовок, краткое объяснение и retry либо
  путь восстановления.
- Toast используется для краткого подтверждения; критические ошибки формы и
  checkout остаются рядом с проблемой и не исчезают автоматически.
- Success заказа — самостоятельная страница/состояние с номером заказа и
  дальнейшими инструкциями, а не только toast.

### Изображения и иконки

- Hero использует одно сильное изображение свежих продуктов или локальной
  покупки, без цветного overlay поверх продукта. Для читаемости текста
  используются отдельная колонка, edge fade или естественное свободное место.
- Product photos имеют единый свет, чистый нейтральный фон и сопоставимый
  масштаб. Нельзя смешивать случайные lifestyle crops и catalog cutouts в одной
  product grid.
- У изображений заданы width/height или aspect ratio; layout не прыгает после
  загрузки.
- Alt описывает товар и полезную визуальную информацию, но не повторяет слово
  «изображение» и не содержит SEO-spam.
- Один согласованный outline icon family используется во всех интерфейсах.

### Homepage composition

Рекомендуемый порядок без добавления новых продуктовых требований:

1. Service strip при наличии подтверждённых данных доставки/самовывоза.
2. Header с search и storefront navigation.
3. Hero с основной ценностью и CTA перехода в каталог.
4. Category rail/grid.
5. Featured products и offers.
6. Delivery/pickup information band.
7. Контактные данные и footer.

Не добавлять testimonials, blog, fake counters, партнёрские логотипы или
маркетинговые claims, отсутствующие в данных магазина.

## Do's and Don'ts

### Делать

- Использовать зелёный для главного действия и подтверждённого состояния.
- Сохранять белый фон и давать продуктовым изображениям визуальный приоритет.
- Использовать borders и spacing раньше, чем shadows и дополнительные cards.
- Показывать ARS и единицу продажи рядом с ценой.
- Проектировать сразу для длинных английских строк и испанских диакритических
  знаков.
- Проверять 320px mobile, desktop, keyboard navigation, visible focus, console
  и horizontal overflow после UI-изменений.
- Сохранять минимум 44×44px для touch targets и понятные labels для icons.
- Уважать `prefers-reduced-motion`; стандартные переходы держать в диапазоне
  120–220ms.
- Загружать UI-тексты из `messages/es.json` и `messages/en.json`.

### Не делать

- Не копировать Shopery pixel-for-pixel и не использовать его brand assets.
- Не заменять белый фон cream/off-white без изменения настоящего документа.
- Не использовать orange для обычных primary buttons.
- Не добавлять gradients, glassmorphism, glow, giant pills и bento-layout по
  умолчанию.
- Не превращать каждую секцию, строку или field group во вложенную card.
- Не скрывать важные действия только за hover.
- Не использовать цвет как единственный индикатор sale, stock, error или order
  status.
- Не помещать секреты, внутренние admin-ссылки или персональные данные в
  клиентские декоративные элементы и screenshots.
- Не добавлять online-payment UI, пока область проекта явно не изменена.
- Не фиксировать пользовательские тексты непосредственно в компонентах.

Перед значимым визуальным изменением обновляется этот документ или явно
фиксируется согласованное отклонение. Если референс, существующий код и
`DESIGN.md` расходятся, нормативными являются tokens и правила `DESIGN.md`, пока
пользователь не утвердил другое решение.
