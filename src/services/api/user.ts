import { http, httpNoAuth } from "@/config/axios";
import { UpdateProfileData } from "../types/user.types";

export const deleteAccount = async (id: string) => {
  const url = `/api/users/${id}`
  const res = await http.delete(url);

  return res.data;
};

export const updateProfile = async (payload: UpdateProfileData, id: string) => {
  const url = `/api/users/${id}`
  const res = await http.put(url, payload);

  return res.data;
};

export const getMyBooks = async () => {
  const url = '/api/users/books'
  const res = await http.get(url);

  return res.data;
}

export const getAuthors = async () => {
  const url = '/api/users'
  const res = await httpNoAuth.get(url);

  return res.data;
}

export const getAuthor = async (id: string) => {
  const url = `/api/users/${id}`
  const res = await httpNoAuth.get(url);

  return res.data;
}