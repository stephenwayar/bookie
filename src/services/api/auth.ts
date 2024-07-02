import { httpNoAuth } from "@/config/axios";
import { LoginData, RegistrationData } from "../types/auth.types";

export const login = async (payload: LoginData) => {
  const url = '/api/auth/login'
  const res = await httpNoAuth.post(url, payload);

  return res.data;
};

export const register = async (payload: RegistrationData) => {
  const url = '/api/auth/register'
  const res = await httpNoAuth.post(url, payload);

  return res.data;
};