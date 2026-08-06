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

const [{ categories }, { products }] = await Promise.all([
  readJson("data/catalog/categories.json"),
  readJson("data/catalog/products.json")
]);

invariant(Array.isArray(categories), "categories must be an array");
invariant(Array.isArray(products), "products must be an array");

const categoryKeys = new Set();
const categorySlugs = { es: new Set(), en: new Set() };

for (const category of categories) {
  addUnique(categoryKeys, category.key, "category key");
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

for (const product of products) {
  addUnique(skus, product.sku, "SKU");
  invariant(categoryKeys.has(product.categoryKey), `${product.sku}: unknown category`);
  invariant(Number.isFinite(product.price) && product.price > 0, `${product.sku}: invalid price`);
  invariant(
    product.compareAtPrice === null || product.compareAtPrice > product.price,
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

  for (const locale of ["es", "en"]) {
    const translation = product.translations?.[locale];
    invariant(translation?.name, `${product.sku}: missing ${locale} product name`);
    invariant(translation?.description, `${product.sku}: missing ${locale} description`);
    addUnique(productSlugs[locale], translation.slug, `${locale} product slug`);
  }
}

console.log(`Catalog valid: ${categories.length} categories, ${products.length} products.`);
