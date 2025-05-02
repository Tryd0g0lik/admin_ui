import { configureStore } from '@reduxjs/toolkit';
import userSlice from "src/reduxes/features/userstate/userSlice";
export const store = configureStore({
  reducer: {
    userstate: userSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
