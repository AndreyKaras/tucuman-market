# План каталога на 80 товаров

Этот документ фиксирует реализованный демонстрационный ассортимент Tucumán Market:
8 основных категорий по 10 товаров. Спецификация перенесена в рабочие файлы
`data/catalog/categories.json` и `data/catalog/products.json`.

Полный frontend-каталог содержит 80 товаров. Первоначальный набор из 20 позиций
будет использоваться для проверки цепочки JSON → Prisma seed → PostgreSQL → каталог,
после чего seed будет расширен на остальные 60 позиций.

## Статус данных

- Согласованы категории, SKU, названия, slug `es`/`en`, описания, единицы продажи и net content.
- Добавлены демонстрационные цены ARS по snapshot Vea и La Anónima от 11 августа 2026 года.
- Цены хранятся как decimal-строки; остатки остаются демонстрационными до подключения PostgreSQL и админки.
- Изображения будут добавлены отдельно; временные storefront sprites остаются без изменений.
- `validate:catalog` проверяет обе локали, цены, связи категорий и структуру будущих изображений.

## Ценовой snapshot

Демонстрационные цены зафиксированы 11 августа 2026 года по открытым онлайн-витринам
[Vea](https://www.vea.com.ar/) и
[La Anónima](https://www.laanonima.com.ar/leches/n3_722/). Для товаров без бренда
использована цена сопоставимой фасовки и категории, округлённая до удобного значения
в ARS. Акционная цена и `compareAtPrice` добавлены только для нескольких проверяемых
сценариев витрины.

Это не синхронизация с магазинами и не обещание покупателю актуальной рыночной цены.
Перед production deployment snapshot необходимо обновить или заменить ценами владельца
Tucumán Market. Источники и дата также сохранены в metadata `products.json`.

## Категории

| `key`                    | Название ES                 | Название EN                | `slug_es`                     | `slug_en`                    |
| ------------------------ | --------------------------- | -------------------------- | ----------------------------- | ---------------------------- |
| `fruit-vegetables`       | Frutas y verduras           | Fruits and vegetables      | `frutas-y-verduras`           | `fruits-and-vegetables`      |
| `dairy-fresh`            | Lácteos y frescos           | Dairy and fresh            | `lacteos-y-frescos`           | `dairy-and-fresh`            |
| `bakery-breakfast`       | Panadería y desayuno        | Bakery and breakfast       | `panaderia-y-desayuno`        | `bakery-and-breakfast`       |
| `pantry`                 | Almacén                     | Pantry                     | `almacen`                     | `pantry`                     |
| `beverages`              | Bebidas                     | Beverages                  | `bebidas`                     | `beverages`                  |
| `snacks-sweets`          | Snacks y golosinas          | Snacks and sweets          | `snacks-y-golosinas`          | `snacks-and-sweets`          |
| `frozen`                 | Congelados                  | Frozen foods               | `congelados`                  | `frozen-foods`               |
| `cleaning-personal-care` | Limpieza y cuidado personal | Cleaning and personal care | `limpieza-y-cuidado-personal` | `cleaning-and-personal-care` |

`Mascotas`, `Bebés`, `Carnicería`, `Perfumería` и `Bazar` можно вынести в
отдельные категории после расширения каталога за пределы 80 товаров.

## Frutas y verduras

| SKU       | Название ES              | Название EN             | Slug ES                    | Продажа / net content |
| --------- | ------------------------ | ----------------------- | -------------------------- | --------------------- |
| `FRU-001` | Banana por kg            | Bananas per kg          | `banana-por-kg`            | `KG`, шаг 0.5         |
| `FRU-002` | Manzana roja por kg      | Red apples per kg       | `manzana-roja-por-kg`      | `KG`, шаг 0.5         |
| `FRU-003` | Naranja para jugo por kg | Juice oranges per kg    | `naranja-para-jugo-por-kg` | `KG`, шаг 0.5         |
| `FRU-004` | Mandarina por kg         | Mandarins per kg        | `mandarina-por-kg`         | `KG`, шаг 0.5         |
| `FRU-005` | Limón por kg             | Lemons per kg           | `limon-por-kg`             | `KG`, шаг 0.5         |
| `VER-001` | Papa blanca por kg       | White potatoes per kg   | `papa-blanca-por-kg`       | `KG`, шаг 0.5         |
| `VER-002` | Cebolla por kg           | Onions per kg           | `cebolla-por-kg`           | `KG`, шаг 0.5         |
| `VER-003` | Tomate redondo por kg    | Round tomatoes per kg   | `tomate-redondo-por-kg`    | `KG`, шаг 0.5         |
| `VER-004` | Zanahoria por kg         | Carrots per kg          | `zanahoria-por-kg`         | `KG`, шаг 0.5         |
| `VER-005` | Zapallo anco por kg      | Butternut squash per kg | `zapallo-anco-por-kg`      | `KG`, шаг 0.5         |

Для весовых товаров используется `saleUnit: "KG"`, `quantityStep: 0.5` и
`netContent: null`.

## Lácteos y frescos

| SKU       | Название ES                   | Название EN                     | Slug ES                     | Продажа / net content |
| --------- | ----------------------------- | ------------------------------- | --------------------------- | --------------------- |
| `LAC-001` | Leche entera 1 L              | Whole milk 1 L                  | `leche-entera-1l`           | `UNIT`, 1 L           |
| `LAC-002` | Leche descremada 1 L          | Skim milk 1 L                   | `leche-descremada-1l`       | `UNIT`, 1 L           |
| `LAC-003` | Yogur natural 1 kg            | Plain yogurt 1 kg               | `yogur-natural-1kg`         | `UNIT`, 1 kg          |
| `LAC-004` | Yogur bebible de frutilla 1 L | Strawberry drinkable yogurt 1 L | `yogur-bebible-frutilla-1l` | `UNIT`, 1 L           |
| `LAC-005` | Manteca 200 g                 | Butter 200 g                    | `manteca-200g`              | `UNIT`, 200 g         |
| `LAC-006` | Queso cremoso 500 g           | Soft cheese 500 g               | `queso-cremoso-500g`        | `UNIT`, 500 g         |
| `FRE-001` | Huevos blancos x 12           | White eggs pack of 12           | `huevos-blancos-x12`        | `UNIT`, 12 units      |
| `FRE-002` | Jamón cocido 200 g            | Cooked ham 200 g                | `jamon-cocido-200g`         | `UNIT`, 200 g         |
| `FRE-003` | Pechuga de pollo por kg       | Chicken breast per kg           | `pechuga-de-pollo-por-kg`   | `KG`, шаг 0.5         |
| `FRE-004` | Carne picada por kg           | Ground beef per kg              | `carne-picada-por-kg`       | `KG`, шаг 0.5         |

## Panadería y desayuno

| SKU       | Название ES                  | Название EN                  | Slug ES                       | Продажа / net content |
| --------- | ---------------------------- | ---------------------------- | ----------------------------- | --------------------- |
| `PAN-001` | Pan francés por kg           | French-style bread per kg    | `pan-frances-por-kg`          | `KG`, шаг 0.5         |
| `PAN-002` | Pan lactal blanco 500 g      | White sandwich bread 500 g   | `pan-lactal-blanco-500g`      | `UNIT`, 500 g         |
| `PAN-003` | Medialunas x 6               | Croissants pack of 6         | `medialunas-x6`               | `UNIT`, 6 units       |
| `PAN-004` | Bizcochos de grasa 250 g     | Savory biscuits 250 g        | `bizcochos-de-grasa-250g`     | `UNIT`, 250 g         |
| `DES-001` | Galletitas de agua 300 g     | Water crackers 300 g         | `galletitas-de-agua-300g`     | `UNIT`, 300 g         |
| `DES-002` | Avena tradicional 500 g      | Rolled oats 500 g            | `avena-tradicional-500g`      | `UNIT`, 500 g         |
| `DES-003` | Cereales de maíz 300 g       | Corn flakes 300 g            | `cereales-de-maiz-300g`       | `UNIT`, 300 g         |
| `DES-004` | Dulce de leche clásico 400 g | Classic dulce de leche 400 g | `dulce-de-leche-clasico-400g` | `UNIT`, 400 g         |
| `DES-005` | Mermelada de durazno 454 g   | Peach jam 454 g              | `mermelada-de-durazno-454g`   | `UNIT`, 454 g         |
| `DES-006` | Café molido 500 g            | Ground coffee 500 g          | `cafe-molido-500g`            | `UNIT`, 500 g         |

## Almacén

| SKU       | Название ES                 | Название EN                 | Slug ES                      | Продажа / net content |
| --------- | --------------------------- | --------------------------- | ---------------------------- | --------------------- |
| `ALM-001` | Arroz largo fino 1 kg       | Long-grain rice 1 kg        | `arroz-largo-fino-1kg`       | `UNIT`, 1 kg          |
| `ALM-002` | Fideos spaghetti 500 g      | Spaghetti 500 g             | `fideos-spaghetti-500g`      | `UNIT`, 500 g         |
| `ALM-003` | Harina de trigo 000 1 kg    | Wheat flour 1 kg            | `harina-de-trigo-000-1kg`    | `UNIT`, 1 kg          |
| `ALM-004` | Azúcar 1 kg                 | Sugar 1 kg                  | `azucar-1kg`                 | `UNIT`, 1 kg          |
| `ALM-005` | Yerba mate tradicional 1 kg | Traditional yerba mate 1 kg | `yerba-mate-tradicional-1kg` | `UNIT`, 1 kg          |
| `ALM-006` | Aceite de girasol 1,5 L     | Sunflower oil 1.5 L         | `aceite-de-girasol-15l`      | `UNIT`, 1.5 L         |
| `ALM-007` | Puré de tomate 520 g        | Tomato purée 520 g          | `pure-de-tomate-520g`        | `UNIT`, 520 g         |
| `ALM-008` | Lentejas secas 400 g        | Dried lentils 400 g         | `lentejas-secas-400g`        | `UNIT`, 400 g         |
| `ALM-009` | Sal fina 500 g              | Fine salt 500 g             | `sal-fina-500g`              | `UNIT`, 500 g         |
| `ALM-010` | Polenta rápida 500 g        | Instant polenta 500 g       | `polenta-rapida-500g`        | `UNIT`, 500 g         |

## Bebidas

| SKU       | Название ES                     | Название EN                     | Slug ES                      | Продажа / net content |
| --------- | ------------------------------- | ------------------------------- | ---------------------------- | --------------------- |
| `BEB-001` | Agua mineral sin gas 2 L        | Still mineral water 2 L         | `agua-mineral-sin-gas-2l`    | `UNIT`, 2 L           |
| `BEB-002` | Soda 2 L                        | Soda water 2 L                  | `soda-2l`                    | `UNIT`, 2 L           |
| `BEB-003` | Gaseosa cola 2,25 L             | Cola soft drink 2.25 L          | `gaseosa-cola-225l`          | `UNIT`, 2.25 L        |
| `BEB-004` | Gaseosa de naranja 2,25 L       | Orange soft drink 2.25 L        | `gaseosa-naranja-225l`       | `UNIT`, 2.25 L        |
| `BEB-005` | Gaseosa lima-limón 2,25 L       | Lemon-lime soft drink 2.25 L    | `gaseosa-lima-limon-225l`    | `UNIT`, 2.25 L        |
| `BEB-006` | Jugo de manzana 1 L             | Apple juice 1 L                 | `jugo-de-manzana-1l`         | `UNIT`, 1 L           |
| `BEB-007` | Jugo de naranja 1 L             | Orange juice 1 L                | `jugo-de-naranja-1l`         | `UNIT`, 1 L           |
| `BEB-008` | Agua saborizada de pomelo 1,5 L | Grapefruit flavored water 1.5 L | `agua-saborizada-pomelo-15l` | `UNIT`, 1.5 L         |
| `BEB-009` | Cerveza rubia 473 ml            | Lager beer 473 ml               | `cerveza-rubia-473ml`        | `UNIT`, 473 ml        |
| `BEB-010` | Vino tinto 750 ml               | Red wine 750 ml                 | `vino-tinto-750ml`           | `UNIT`, 750 ml        |

## Snacks y golosinas

| SKU       | Название ES                  | Название EN                       | Slug ES                       | Продажа / net content |
| --------- | ---------------------------- | --------------------------------- | ----------------------------- | --------------------- |
| `SNA-001` | Papas fritas clásicas 150 g  | Classic potato chips 150 g        | `papas-fritas-clasicas-150g`  | `UNIT`, 150 g         |
| `SNA-002` | Palitos sabor queso 100 g    | Cheese-flavored corn snacks 100 g | `palitos-sabor-queso-100g`    | `UNIT`, 100 g         |
| `SNA-003` | Maní salado 200 g            | Salted peanuts 200 g              | `mani-salado-200g`            | `UNIT`, 200 g         |
| `SNA-004` | Maíz para pochoclo 400 g     | Popcorn kernels 400 g             | `maiz-para-pochoclo-400g`     | `UNIT`, 400 g         |
| `SNA-005` | Galletitas saladas 300 g     | Salted crackers 300 g             | `galletitas-saladas-300g`     | `UNIT`, 300 g         |
| `GOL-001` | Chocolate con leche 100 g    | Milk chocolate 100 g              | `chocolate-con-leche-100g`    | `UNIT`, 100 g         |
| `GOL-002` | Alfajor triple de chocolate  | Triple chocolate alfajor          | `alfajor-triple-chocolate`    | `UNIT`, 1 unit        |
| `GOL-003` | Gomitas frutales 150 g       | Fruit gummies 150 g               | `gomitas-frutales-150g`       | `UNIT`, 150 g         |
| `GOL-004` | Caramelos surtidos 300 g     | Assorted hard candies 300 g       | `caramelos-surtidos-300g`     | `UNIT`, 300 g         |
| `GOL-005` | Galletitas de vainilla 300 g | Vanilla cookies 300 g             | `galletitas-de-vainilla-300g` | `UNIT`, 300 g         |

## Congelados

| SKU       | Название ES                      | Название EN                | Slug ES                           | Продажа / net content |
| --------- | -------------------------------- | -------------------------- | --------------------------------- | --------------------- |
| `CON-001` | Hamburguesas de carne x 4        | Beef burgers pack of 4     | `hamburguesas-de-carne-x4`        | `UNIT`, 4 units       |
| `CON-002` | Papas prefritas congeladas 700 g | Frozen French fries 700 g  | `papas-prefritas-congeladas-700g` | `UNIT`, 700 g         |
| `CON-003` | Nuggets de pollo 400 g           | Chicken nuggets 400 g      | `nuggets-de-pollo-400g`           | `UNIT`, 400 g         |
| `CON-004` | Empanadas de carne x 6           | Beef empanadas pack of 6   | `empanadas-de-carne-x6`           | `UNIT`, 6 units       |
| `CON-005` | Pizza de mozzarella              | Mozzarella pizza           | `pizza-de-mozzarella`             | `UNIT`, 1 unit        |
| `CON-006` | Mix de vegetales 500 g           | Frozen vegetable mix 500 g | `mix-de-vegetales-500g`           | `UNIT`, 500 g         |
| `CON-007` | Arvejas congeladas 500 g         | Frozen peas 500 g          | `arvejas-congeladas-500g`         | `UNIT`, 500 g         |
| `CON-008` | Espinaca congelada 400 g         | Frozen spinach 400 g       | `espinaca-congelada-400g`         | `UNIT`, 400 g         |
| `CON-009` | Helado de vainilla 1 L           | Vanilla ice cream 1 L      | `helado-de-vainilla-1l`           | `UNIT`, 1 L           |
| `CON-010` | Hielo en cubos 2 kg              | Ice cubes 2 kg             | `hielo-en-cubos-2kg`              | `UNIT`, 2 kg          |

## Limpieza y cuidado personal

| SKU       | Название ES                     | Название EN                  | Slug ES                          | Продажа / net content |
| --------- | ------------------------------- | ---------------------------- | -------------------------------- | --------------------- |
| `LIM-001` | Detergente para platos 750 ml   | Dishwashing liquid 750 ml    | `detergente-para-platos-750ml`   | `UNIT`, 750 ml        |
| `LIM-002` | Lavandina 1 L                   | Bleach 1 L                   | `lavandina-1l`                   | `UNIT`, 1 L           |
| `LIM-003` | Jabón líquido para ropa 3 L     | Liquid laundry detergent 3 L | `jabon-liquido-para-ropa-3l`     | `UNIT`, 3 L           |
| `LIM-004` | Suavizante para ropa 900 ml     | Fabric softener 900 ml       | `suavizante-para-ropa-900ml`     | `UNIT`, 900 ml        |
| `LIM-005` | Limpiador para pisos 900 ml     | Floor cleaner 900 ml         | `limpiador-para-pisos-900ml`     | `UNIT`, 900 ml        |
| `LIM-006` | Bolsas para residuos x 10       | Trash bags pack of 10        | `bolsas-para-residuos-x10`       | `UNIT`, 10 units      |
| `LIM-007` | Papel higiénico 4 rollos        | Toilet paper 4 rolls         | `papel-higienico-4-rollos`       | `UNIT`, 4 units       |
| `LIM-008` | Rollo de cocina x 3             | Kitchen paper 3 rolls        | `rollo-de-cocina-x3`             | `UNIT`, 3 units       |
| `CUI-001` | Jabón líquido para manos 250 ml | Liquid hand soap 250 ml      | `jabon-liquido-para-manos-250ml` | `UNIT`, 250 ml        |
| `CUI-002` | Shampoo uso diario 400 ml       | Daily shampoo 400 ml         | `shampoo-uso-diario-400ml`       | `UNIT`, 400 ml        |

## Общие значения при переносе в JSON

Если для конкретного товара не согласовано иное, после определения обязательных
данных можно использовать следующие демонстрационные значения:

```json
{
  "brand": null,
  "compareAtPrice": null,
  "isActive": true,
  "isFeatured": false,
  "quantityStep": 1,
  "stockQuantity": 20,
  "lowStockThreshold": 5,
  "images": []
}
```

Для весовых товаров:

```json
{
  "saleUnit": "KG",
  "quantityStep": 0.5,
  "netContent": null
}
```

Для упакованных товаров:

```json
{
  "saleUnit": "UNIT",
  "quantityStep": 1,
  "netContent": {
    "value": 1,
    "unit": "L"
  }
}
```

Значения `netContent` для упакованных товаров берутся из соответствующей строки
таблицы, а не из общего примера.

## Следующие шаги

1. Выполнить seed первоначального набора из 20 товаров через Prisma/PostgreSQL.
2. После стабилизации pipeline распространить seed на остальные 60 позиций.
3. Добавить изображения с размерами, `sortOrder` и локализованными alt-текстами.
4. Перед production заменить или подтвердить демонстрационные цены новым snapshot.

После подключения админки источником истины станет PostgreSQL. JSON останется
начальным seed, а добавление, скрытие и редактирование товаров будет выполняться
через защищённые admin-сценарии без изменения UI-компонентов.
