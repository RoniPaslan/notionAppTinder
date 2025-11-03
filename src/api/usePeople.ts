import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

const LOCAL_IP = "192.168.18.97";
const API_BASE = `http://${LOCAL_IP}/api/v1`;

const getFullImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `http://${LOCAL_IP}/${path.replace(/^\/+/, "")}`;
};

// ------------------ usePeople ------------------
export const usePeople = () => {
  return useQuery<Person[]>({
    queryKey: ["people"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/people`);
      return data.data.map((p: Person) => ({
        ...p,
        picture: getFullImageUrl(p.picture),
      }));
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

// ------------------ useLikePerson ------------------
export const useLikePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      personId,
      userId,
    }: {
      personId: number;
      userId: number;
    }) => {
      console.log("[API] Like person:", personId, "by user:", userId);
      const { data } = await axios.post(
        `${API_BASE}/people/${personId}/like`,
        { user_id: userId }
      );
      return { personId, likes_count: data.likes_count };
    },
    onMutate: async ({ personId }) => {
      await queryClient.cancelQueries({ queryKey: ["people"] });
      const previousPeople = queryClient.getQueryData<Person[]>(["people"]);

      queryClient.setQueryData<Person[]>(["people"], (oldData) =>
        oldData
          ? oldData.map((p) =>
              p.id === personId ? { ...p, likes_count: p.likes_count + 1 } : p
            )
          : []
      );

      return { previousPeople };
    },
    onError: (err, variables, context) => {
      console.error("LIKE error:", err);
      if (context?.previousPeople) {
        queryClient.setQueryData(["people"], context.previousPeople);
      }
    },
    onSuccess: (data) => {
      console.log("LIKE success:", data);
      queryClient.setQueryData<Person[]>(["people"], (oldData) =>
        oldData
          ? oldData.map((p) =>
              p.id === data.personId ? { ...p, likes_count: data.likes_count } : p
            )
          : []
      );
    },
  });
};

// ------------------ useDislikePerson ------------------
export const useDislikePerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      personId,
      userId,
    }: {
      personId: number;
      userId: number;
    }) => {
      console.log("[API] Dislike person:", personId, "by user:", userId);
      const { data } = await axios.post(
        `${API_BASE}/people/${personId}/dislike`,
        { user_id: userId }
      );
      return { personId, likes_count: data.likes_count };
    },
    onMutate: async ({ personId }) => {
      await queryClient.cancelQueries({ queryKey: ["people"] });
      const previousPeople = queryClient.getQueryData<Person[]>(["people"]);

      queryClient.setQueryData<Person[]>(["people"], (oldData) =>
        oldData
          ? oldData.map((p) =>
              p.id === personId
                ? { ...p, likes_count: Math.max(p.likes_count - 1, 0) }
                : p
            )
          : []
      );

      return { previousPeople };
    },
    onError: (err, variables, context) => {
      console.error("DISLIKE error:", err);
      if (context?.previousPeople) {
        queryClient.setQueryData(["people"], context.previousPeople);
      }
    },
    onSuccess: (data) => {
      console.log("DISLIKE success:", data);
      queryClient.setQueryData<Person[]>(["people"], (oldData) =>
        oldData
          ? oldData.map((p) =>
              p.id === data.personId ? { ...p, likes_count: data.likes_count } : p
            )
          : []
      );
    },
  });
};

// ------------------ useRefreshPeople ------------------
export const useRefreshPeople = () => {
  const queryClient = useQueryClient();
  return async () => {
    console.log("[Refresh] Resetting people query");
    await queryClient.resetQueries({ queryKey: ["people"] });
  };
};
