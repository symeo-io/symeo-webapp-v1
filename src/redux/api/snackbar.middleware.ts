import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { intl } from "../../intl";

export const snackbarMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (
        action?.payload?.data?.errors &&
        Array.isArray(action.payload.data.errors)
      ) {
        action.payload.data.errors.forEach((error: { code: string }) => {
          enqueueSnackbar(
            intl.formatMessage({
              id: `errors.${error.code}`,
            }),
            { variant: "error", autoHideDuration: 3000000 }
          );
        });
      }
    }

    return next(action);
  };
