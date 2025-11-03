import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Platform } from "react-native";

export interface Person {
  id: number;
  name: string;
  age: number;
  picture: string;
  location: string;
  likes_count: number;
  notified_at: string | null;
  created_at: string;
  updated_at: string;
}

// IP laptop kamu
const LOCAL_IP = "192.168.18.97";

// Gunakan base URL yang sesuai environment
const API_BASE =
  Platform.OS === "android"
    ? (__DEV__
        ? "http://10.0.2.2/api/v1" // Android emulator
        : `http://${LOCAL_IP}/api/v1`)
    : (__DEV__
        ? "http://127.0.0.1/api/v1" // iOS simulator
        : `http://${LOCAL_IP}/api/v1`);

// Karena di Laragon kamu pakai domain virtual host
// Ganti dengan domain yang kamu akses di browser:
const WEB_BASE_URL = "http://hyperhire_notion_test.test";

// Helper untuk membentuk URL gambar
const getFullImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${WEB_BASE_URL}/${path}`;
};

export const usePeople = () => {
  return useQuery<Person[]>({
    queryKey: ["people"],
    queryFn: async () => {
      const { data } = await axios.get(`${WEB_BASE_URL}/api/v1/people`);
      const formatted = data.data.map((p: Person) => ({
        ...p,
        picture: getFullImageUrl(p.picture),
      }));
      return formatted;
    },
    staleTime: 0,
  });
};

export const useLikePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ personId, userId }: { personId: number; userId: number }) => {
      await axios.post(`${WEB_BASE_URL}/api/v1/people/${personId}/like`, { user_id: userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};

export const useDislikePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ personId, userId }: { personId: number; userId: number }) => {
      await axios.post(`${WEB_BASE_URL}/api/v1/people/${personId}/dislike`, { user_id: userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
}