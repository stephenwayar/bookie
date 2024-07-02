import CryptoJS from 'crypto-js';
import { ENCRYPTION_KEY } from '@/config/env';

export function encryptData(data: any): string {
  const dataString: string = JSON.stringify(data);
  const encryptedData: string = ENCRYPTION_KEY ? CryptoJS.AES.encrypt(dataString, ENCRYPTION_KEY).toString() : '';

  return encryptedData;
}

export function decryptData(encryptedData: string | null): any {
  if (!encryptedData) return null
  const decryptedData: string = ENCRYPTION_KEY ? CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8) : '';
  const data: any = JSON.parse(decryptedData);

  return data;
}