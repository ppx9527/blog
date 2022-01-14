interface CookieOptions {
  path?: string;
  secure?: boolean;
  expires?: Date | string;
  'max-age'?: number;
}

export default class Cookie {
  static set(name: string, value: string, options?: CookieOptions): void {
    options = {
      path: '/',
      ...options,
    };
    if (options?.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (const [optionKey, optionValue] of Object.entries(options)) {
      updatedCookie += ';' + optionKey;
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  static get(name: string): string | undefined {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  static delete(name = '') {
    Cookie.set(name, '', {
      'max-age': -1,
    });
  }
}
