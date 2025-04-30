import { configureStore } from '@reduxjs/toolkit';
import userSlice from "src/reduxes/features/userstate/userSlice";
export default configureStore({
  reducer: {
    userstate: userSlice
  }
});
