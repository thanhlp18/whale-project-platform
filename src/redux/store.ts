import { isDev } from "@/lib/common/env";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { imageAnalyzingApi } from "@/redux/services/imageAnalyzingApi";
import { blogApi } from "@/redux/services/blogApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [imageAnalyzingApi.reducerPath]: imageAnalyzingApi.reducer,
      [blogApi.reducerPath]: blogApi.reducer,
    },
    devTools: isDev(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({})
        .concat(imageAnalyzingApi.middleware)
        .concat(blogApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
