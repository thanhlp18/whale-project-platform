import { isDev } from "@/lib/common/env";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { imageAnalyzingApi } from "@/redux/services/imageAnalyzingApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [imageAnalyzingApi.reducerPath]: imageAnalyzingApi.reducer,
    },
    devTools: isDev(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat(imageAnalyzingApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
