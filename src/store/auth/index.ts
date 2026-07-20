import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthState, User, ADMIN_ROLE, session, SESSION_KEYS } from 'utilities';

// Define the initial state using that type
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: Cookies.get(SESSION_KEYS.AccessToken) || null,
  canViewStatistics: false,
  canCreateOrUpdateRecord: false,
  canApproveWithdrawal: false,
  isSupperAdmin: false,
};

export const userSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      const user = action.payload;
      user ? (state.isAuthenticated = true) : (state.isAuthenticated = false);
      state.user = action.payload;
      if (user) {
        const canViewStatistics = user.role !== ADMIN_ROLE.CUSTOMER_SUPPORT;
        const canApproveWithdrawal = user.role === ADMIN_ROLE.SUPER_ADMIN;
        const canCreateOrUpdateRecord =
          user.role !== ADMIN_ROLE.CUSTOMER_SUPPORT;
        state.canViewStatistics = canViewStatistics;
        state.canCreateOrUpdateRecord = canCreateOrUpdateRecord;
        state.canApproveWithdrawal = canApproveWithdrawal;
        state.isSupperAdmin = user.role === ADMIN_ROLE.SUPER_ADMIN;
      }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      // if (action.payload === null) {
      // 	Storage.deleteItem(StorageKeys.UserToken);
      // } else {
      // 	Storage.saveItem(StorageKeys.UserToken, action.payload);
      // }
      state.token = action.payload;
    },
    logout: (state) => {
      session.deleteSession(SESSION_KEYS.AccessToken);
      state.isAuthenticated = false;
      state.token = '';
      state.user = null;
    },
  },
});

export const { setToken, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
