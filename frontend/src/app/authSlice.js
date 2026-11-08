import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'learn_english_auth';

// "Beni hatırla": işaretliyse oturum localStorage'da tutulur (tarayıcı kapanınca da kalır),
// değilse sessionStorage'da (tarayıcı/sekme kapanınca biter). Kod/Google ile girişlerde hatırlanır.
const storageFor = (remember) => (remember ? localStorage : sessionStorage);

const loadInitialState = () => {
  try {
    const fromLocal = localStorage.getItem(STORAGE_KEY);
    const raw = fromLocal ?? sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return { user: parsed?.user ?? null, token: parsed?.token ?? null, remember: fromLocal !== null || !raw };
  } catch {
    return { user: null, token: null, remember: true };
  }
};

const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Depolama erişilemiyorsa (gizli mod vb.) yapacak bir şey yok.
  }
};

const persist = (state) => {
  clearStorage();
  try {
    storageFor(state.remember).setItem(STORAGE_KEY, JSON.stringify({ user: state.user, token: state.token }));
  } catch {
    // Depolama erişilemiyorsa oturum sadece bu sayfa açıkken sürer.
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    // payload: { user, token, remember? } — remember verilmezse mevcut tercih korunur
    // (profil güncelleme gibi oturum içi çağrılar tercihi değiştirmez).
    setCredentials(state, action) {
      const { user, token, remember } = action.payload;
      state.user = user;
      state.token = token;
      if (typeof remember === 'boolean') state.remember = remember;
      persist(state);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.remember = true;
      clearStorage();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
