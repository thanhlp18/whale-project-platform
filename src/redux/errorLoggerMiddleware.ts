import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { notification } from "antd";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      notification.error({
        message: "Oops! Something went wrong. Please try again.",
        description: action?.payload?.data?.error ?? "Unknown Error",
        placement: "bottomRight",
      });
    }

    return next(action);
  };
