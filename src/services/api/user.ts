import { http } from "@/config/axios";
import { UpdateProfileData } from "../types/user.types";

export const deleteAccount = async (id: string) => {
  const url = `/api/user/${id}`
  const res = await http.delete(url);

  return res.data;
};

export const updateProfile = async (payload: UpdateProfileData, id: string) => {
  const url = `/api/user/${id}`
  const res = await http.put(url, payload);

  return res.data;
};