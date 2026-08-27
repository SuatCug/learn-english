import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'learn_english_auth';

const loadInitialState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return { user: parsed?.user ?? null, token: parsed?.token ?? null };
  } catch {
    return { user: null, token: null };
  }
};

const persist = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: state.user, token: state.token }));
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      persist(state);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
