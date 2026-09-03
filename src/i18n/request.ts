import * as rootParams from 'next/root-params';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import enMessages from '../../messages/en.json';
import esMessages from '../../messages/es.json';

import { routing } from './routing';

const messagesByLocale = {
  en: enMessages,
  es: esMessages,
} as const;

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    locale = await rootParams.locale();
  }

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return {
    locale,
    messages: messagesByLocale[locale],
  };
});
