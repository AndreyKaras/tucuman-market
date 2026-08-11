import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");

async function readJson(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  return JSON.parse(await readFile(absolutePath, "utf8"));
}

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function addUnique(set, value, label) {
  invariant(typeof value === "string" && value.length > 0, `${label} is required`);
  invariant(!set.has(value), `Duplicate ${label}: ${value}`);
  set.add(value);
}

const [categoryCatalog, productCatalog] = await Promise.all([
  readJson("data/catalog/categories.json"),
  readJson("data/catalog/products.json")
]);

const { categories } = categoryCatalog;
const { products } = productCatalog;

invariant(categoryCatalog.schemaVersion === 2, "unsupported category schemaVersion");
invariant(productCatalog.schemaVersion === 2, "unsupported product schemaVersion");
invariant(productCatalog.currency === "ARS", "catalog currency must be ARS");
invariant(productCatalog.priceFormat === "decimal-string", "catalog prices must use decimal strings");

invariant(Array.isArray(categories), "categories must be an array");
invariant(Array.isArray(products), "products must be an array");

const categoryKeys = new Set();
const activeCategoryKeys = new Set();
const categorySlugs = { es: new Set(), en: new Set() };

for (const category of categories) {
  addUnique(categoryKeys, category.key, "category key");
  if (category.isActive) activeCategoryKeys.add(category.key);
  invariant(Number.isInteger(category.displayOrder), `${category.key}: invalid displayOrder`);

  for (const locale of ["es", "en"]) {
    const translation = category.translations?.[locale];
    invariant(translation?.name, `${category.key}: missing ${locale} category name`);
    addUnique(categorySlugs[locale], translation.slug, `${locale} category slug`);
  }
}

const skus = new Set();
const productSlugs = { es: new Set(), en: new Set() };
const allowedSaleUnits = new Set(["UNIT", "KG"]);
const allowedContentUnits = new Set(["G", "KG", "ML", "L", "UNIT"]);
const moneyPattern = /^(0|[1-9]\d{0,9})(?:\.(\d{1,2}))?$/;

function moneyToMinorUnits(value, label) {
  invariant(typeof value === "string" && moneyPattern.test(value), `${label}: invalid decimal money string`);
  const [, whole, fraction = ""] = moneyPattern.exec(value);
  return BigInt(whole) * 100n + BigInt(fraction.padEnd(2, "0"));
}

for (const product of products) {
  addUnique(skus, product.sku, "SKU");
  invariant(categoryKeys.has(product.categoryKey), `${product.sku}: unknown category`);
  invariant(
    !product.isActive || activeCategoryKeys.has(product.categoryKey),
    `${product.sku}: active product belongs to an inactive category`
  );
  const price = moneyToMinorUnits(product.price, `${product.sku} price`);
  invariant(price > 0n, `${product.sku}: price must be greater than zero`);
  invariant(
    product.compareAtPrice === null ||
      moneyToMinorUnits(product.compareAtPrice, `${product.sku} compareAtPrice`) > price,
    `${product.sku}: compareAtPrice must be null or greater than price`
  );
  invariant(allowedSaleUnits.has(product.saleUnit), `${product.sku}: invalid saleUnit`);
  invariant(Number.isFinite(product.quantityStep) && product.quantityStep > 0, `${product.sku}: invalid quantityStep`);
  invariant(Number.isFinite(product.stockQuantity) && product.stockQuantity >= 0, `${product.sku}: invalid stockQuantity`);
  invariant(Number.isFinite(product.lowStockThreshold) && product.lowStockThreshold >= 0, `${product.sku}: invalid lowStockThreshold`);

  if (product.netContent !== null) {
    invariant(Number.isFinite(product.netContent.value) && product.netContent.value > 0, `${product.sku}: invalid net content value`);
    invariant(allowedContentUnits.has(product.netContent.unit), `${product.sku}: invalid net content unit`);
  }

  invariant(Array.isArray(product.images), `${product.sku}: images must be an array`);
  const imageOrders = new Set();

  for (const image of product.images) {
    invariant(
      typeof image.src === "string" && /^(\/|https:\/\/)/.test(image.src),
      `${product.sku}: invalid image src`
    );
    invariant(Number.isInteger(image.width) && image.width > 0, `${product.sku}: invalid image width`);
    invariant(Number.isInteger(image.height) && image.height > 0, `${product.sku}: invalid image height`);
    invariant(Number.isInteger(image.sortOrder) && image.sortOrder >= 0, `${product.sku}: invalid image sortOrder`);
    invariant(!imageOrders.has(image.sortOrder), `${product.sku}: duplicate image sortOrder ${image.sortOrder}`);
    imageOrders.add(image.sortOrder);

    for (const locale of ["es", "en"]) {
      invariant(image.translations?.[locale]?.alt, `${product.sku}: missing ${locale} image alt`);
    }
  }

  for (const locale of ["es", "en"]) {
    const translation = product.translations?.[locale];
    invariant(translation?.name, `${product.sku}: missing ${locale} product name`);
    invariant(translation?.description, `${product.sku}: missing ${locale} description`);
    addUnique(productSlugs[locale], translation.slug, `${locale} product slug`);
  }
}

console.log(`Catalog valid: ${categories.length} categories, ${products.length} products.`);
