import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/products': {
      es: '/productos',
      en: '/products',
    },
    '/products/[slug]': {
      es: '/productos/[slug]',
      en: '/products/[slug]',
    },
    '/categories/[slug]': {
      es: '/categorias/[slug]',
      en: '/categories/[slug]',
    },
    '/cart': {
      es: '/carrito',
      en: '/cart',
    },
  },
});
