export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  access_token: string;
}

export type UserState = {
  value: User | null
}

export enum UserKey {
  BOOKIED_USER = 'bookie-user',
}