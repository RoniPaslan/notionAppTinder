import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IP lokal Laragon
const LOCAL_IP = "192.168.18.97";
const API_BASE = `http://${LOCAL_IP}/api`;

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  token?: string;
}

// ------------------ REGISTER ------------------
export const useRegister = () => {
  return useMutation<User, any, RegisterInput>({
    mutationFn: async (data: RegisterInput) => {
      const res = await axios.post(`${API_BASE}/register`, data);
      return res.data;
    },
  });
};

// ------------------ LOGIN ------------------
export const useLogin = () => {
  return useMutation<User, any, LoginInput>({
    mutationFn: async ({ email, password }) => {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      await AsyncStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    },
  });
};

// ------------------ LOGOUT ------------------
export const useLogout = (onSuccess?: () => void) => {
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await AsyncStorage.removeItem("user");
    },
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });
};
// ------------------ GET CURRENT USER ------------------
export const getCurrentUser = async (): Promise<User | null> => {
  const data = await AsyncStorage.getItem("user");
  if (!data) return null;
  return JSON.parse(data);
};

// ------------------ FORGOT PASSWORD ------------------
export const useForgotPassword = () => {
  return useMutation<any, any, { email: string }>({
    mutationFn: async ({ email }) => {
      const res = await axios.post(`${API_BASE}/forgot-password`, { email });
      return res.data;
    },
  });
};
