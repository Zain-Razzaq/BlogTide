import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";
import { validationApi } from "./api/validationApi";
import { blogsApi } from "./api/blogsApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [validationApi.reducerPath]: validationApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      blogsApi.middleware,
      validationApi.middleware
    ),
});

export default store;
