import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { readEnv } from './env.helper';

export function convertToI18nObject(obj: any, lang: string): any {
  if (obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => convertToI18nObject(item, lang));
    } else if (typeof obj === 'object') {
      if (obj[lang]) {
        return obj[lang];
      } else {
        const newObj = {};
        Object.keys(obj).forEach((key) => {
          newObj[key] = convertToI18nObject(obj[key], lang);
        });
        return newObj;
      }
    } else {
      return obj;
    }
  } else {
    return obj;
  }
}

export function i18nEntity(obj: any, lang: string): any {
  if (obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => i18nEntity(item, lang));
    }

    if (
      typeof obj === 'object' &&
      obj.constructor.name !== 'Date' &&
      obj !== null
    ) {
      const newObj = {};
      Object.keys(obj).forEach((key) => {
        // find key that ends with _${lang}, remove _${lang} and set value to key
        if (obj[key]) {
          if (key.endsWith(`_${lang}`)) {
            const newKey = key.replace(`_${lang}`, '');
            newObj[newKey] = obj[key];
            delete newObj[`${newKey}_ar`];
            delete newObj[`${newKey}_en`];
          } else {
            newObj[key] = i18nEntity(obj[key], lang);
          }
        } else {
          newObj[key] = obj[key];
        }
      });
      return newObj;
    } else {
      return obj;
    }
  }
}

// convert from { image: 'path/to/image.png', avatar: 'path/to/avatar.png' }
// to { image: 'https://domain.com/path/to/image.png', avatar: 'https://domain.com/path/to/avatar.png' }

export function toFullUrl(
  obj: any,
  attributes: string[],
  prefix?: string,
): any {
  const host = readEnv('APP_HOST');
  if (obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => toFullUrl(item, attributes, prefix));
    }

    if (typeof obj === 'object' && obj.constructor.name !== 'Date') {
      const newObj = {};
      Object.keys(obj).forEach((key) => {
        if (attributes.includes(key)) {
          newObj[key] = `${host}/${prefix || ''}${obj[key]}`;
        } else {
          newObj[key] = toFullUrl(obj[key], attributes, prefix);
        }
      });
      return newObj;
    }
  }
  return obj;
}

export class I18nResponse {
  private lang = 'en';
  constructor(@Inject(REQUEST) req: Request) {
    this.lang = req.headers['accept-language'];

    if (this.lang === null) this.lang = req.query.lang as string;
    if (this.lang === null) this.lang = req.query.local as string;
    if (!this.lang || this.lang === null) this.lang = 'en';

    // take first two characters from lang without using substr
    this.lang = this.lang.slice(0, 2);
  }

  public entity(obj: any): any {
    return i18nEntity(obj, this.lang);
  }
}
