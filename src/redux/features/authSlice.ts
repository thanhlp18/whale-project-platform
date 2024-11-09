import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string;
};

const initialState: AuthState = {
  token: "",
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken, reset } = auth.actions;
export default auth.reducer;
