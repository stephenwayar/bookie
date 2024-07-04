import cookie from "cookiejs";
import { IncomingMessage } from "http";
import { encryptData, decryptData } from "./encryption";

export function setCookieItem(key: string, value: any) {
  cookie.set(key, encryptData(value), 1)
}

export function getCookieItem(key: string) {
  const value = cookie.get(key);

  if (typeof value === 'string') {
    return decryptData(value)
  }

  return null;
}

export const parseCookies = (req: IncomingMessage) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return {};

  return cookieHeader
    .split(';')
    .map(v => v.split('='))
    .reduce((acc: Record<string, string>, [key, val]) => {
      acc[key.trim()] = decodeURIComponent(val);

      return acc;
    }, {});
};