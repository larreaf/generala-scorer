import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// export const categories = [
//   'ones', 'twos', 'threes', 'fours', 'fives', 'sixes',
//   'fullHouse', 'straight', 'poker', 'generala', 'doubleGenerala'
// ] as const;

// export type Category = keyof (typeof categories);

export enum Categories {
  Ones = "ones",
  Twos = "twos",
  Threes = "threes",
  Fours = "fours",
  Fives = "fives",
  Sixes = "sixes",
  Straight = "straight",
  FullHouse = "fullHouse",
  Poker = "poker",
  Generala = "generala",
  DoubleGenerala = "doubleGenerala",
}

export interface ScoreValue {
  value: number;
  crossedOut: boolean;
}

const zeroScore: ScoreValue = {
  value: 0,
  crossedOut: false
}

export type Score = {
  [index in Categories]: ScoreValue;
}

interface ScorerState {
  userScores: Record<string, Score>;
}

const initialState: ScorerState = {
  userScores: {},
};

const scorerSlice = createSlice({
  name: 'scorer',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (!state.userScores[userId]) {
        state.userScores[userId] = {
          ones: zeroScore,
          twos: zeroScore,
          threes: zeroScore,
          fours: zeroScore,
          fives: zeroScore,
          sixes: zeroScore,
          fullHouse: zeroScore,
          straight: zeroScore,
          poker: zeroScore,
          generala: zeroScore,
          doubleGenerala: zeroScore,
        };
      }
    },
    removeUser: (state, action: PayloadAction<{username: string}>) => {
      delete state.userScores[action.payload.username];
    },
    renameUser: (state, action: PayloadAction<{ oldName: string; newName: string; }>) => {
      const oldKey = action.payload.oldName;
      const newKey = action.payload.newName;

      // the user already exists
      if (newKey in state.userScores){
        return;
      }

      if (oldKey !== newKey) {
        const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(state.userScores, oldKey)!;
        Object.defineProperty(state.userScores, newKey, descriptor);
        delete state.userScores[oldKey];
      }
    },
    updateScore: (state, action: PayloadAction<{ username: string; category: Categories; score: ScoreValue; }>) => {
      const { username, category, score } = action.payload;
      if (state.userScores[username]) {
        state.userScores[username][category] = score;
      }
    },
    resetScore: () => initialState,
  },
});

export const { addUser, updateScore, resetScore } = scorerSlice.actions;
export default scorerSlice.reducer;

// Selectors
export const getScore = (state: RootState) => state.scorer.userScores;