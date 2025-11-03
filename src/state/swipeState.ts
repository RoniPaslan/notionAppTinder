import { atom } from 'recoil';

export const swipeState = atom({
  key: 'swipeState',
  default: {
    liked: [],
    disliked: [],
  },
});
