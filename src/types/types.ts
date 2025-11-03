export interface Person {
  id: number;
  name: string;
  age?: number;
  picture?: string;
  location?: string;
  likes_count: number;
}

export interface LikePayload {
  personId: number;
  userId: number;
}

// export type RootStackParamList = {
//   Home: undefined;        // route awal
//   Profile: { userId: number }; // contoh route lain
// };

