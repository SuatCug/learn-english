import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from '../services/authApi';
import { topicsApi } from '../services/topicsApi';
import { usersApi } from '../services/usersApi';
import { placementApi } from '../services/placementApi';
import { classroomApi } from '../services/classroomApi';
import { examsApi } from '../services/examsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [placementApi.reducerPath]: placementApi.reducer,
    [classroomApi.reducerPath]: classroomApi.reducer,
    [examsApi.reducerPath]: examsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      topicsApi.middleware,
      usersApi.middleware,
      placementApi.middleware,
      classroomApi.middleware,
      examsApi.middleware
    ),
});

export default store;
