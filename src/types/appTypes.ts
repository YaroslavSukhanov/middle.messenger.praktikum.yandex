import { User } from '../utils/apiAdapters.ts';

export interface AppState {
  loginFormError: string | null;
  user: User | null;
  isLoading: boolean;
  userId: number | null;
  appIsInited: boolean
}

export const defaultState: AppState = {
  loginFormError: null,
  user: null,
  isLoading: false,
  userId: null,
  appIsInited: false,
};
