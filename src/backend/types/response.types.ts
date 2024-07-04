export type ErrorResponse = {
  success: boolean;
  message: string
}

export type LoginDataResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  access_token: string;
};

export type DecryptedToken = {
  id: string;
  email: string;
};