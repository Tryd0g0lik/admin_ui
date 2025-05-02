import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserPrivaleges, UserStatus, User } from "src/interfesaces";

// https://react-redux.js.org/introduction/getting-started
// https://redux.js.org/tutorials/quick-start#create-a-redux-store
// https://redux-toolkit.js.org/api/createSlice
// https://redux-toolkit.js.org/tutorials/typescript
// https://redux-toolkit.js.org/usage/usage-guide
const clearState = {
  "email": "",
  "password": "",
  "status": UserStatus.STATUS_ANONYMOUSUSER,
  "privaleges": [UserPrivaleges.PRIVALEGES_ANONYMOUS],
  "token": ""
};

export let initialState: User = clearState;
const cachState = localStorage.getItem("user");
initialState = cachState ? JSON.parse(cachState) as User : initialState as User;
const userSlice = createSlice({
  name: 'userstate',
  initialState,
  reducers: {
    resetSetUser: () => clearState,
    setUser: (state, action: PayloadAction<User>) => {

      state = action.payload;

      return { ...state };
    }
  }
});

export const { setUser, resetSetUser } = userSlice.actions;
export default userSlice.reducer;

