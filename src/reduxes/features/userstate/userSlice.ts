import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserPrivaleges, UserStatus, User } from "src/interfesaces";

// https://react-redux.js.org/introduction/getting-started
// https://redux.js.org/tutorials/quick-start#create-a-redux-store
//https://redux-toolkit.js.org/api/createSlice

export let initialState: User = {
  "email": "",
  "password": "",
  "status": UserStatus.STATUS_ANONYMOUSUSER,
  "privaleges": [UserPrivaleges.PRIVALEGES_ANONYMOUS],
  "token": ""
};

const userSlice = createSlice({
  name: 'userstate',
  initialState,
  reducers: {

    updateSetUser(state): User {
      // if (initialState && typeof initialState === "object") {
      //   initialState = Object.assign({}, state);
      // }
      return { ...state };
    },
    setUser(state, action: PayloadAction<User>) {

      state = action.payload;

      return { ...state };
    }
  }
});

export const { updateSetUser, setUser } = userSlice.actions;
export default userSlice.reducer;
