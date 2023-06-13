import { User } from '../utils/apiAdapters.ts';

export interface AppState {
  loginFormError: string | null;
  user: User | null;
  isLoading: boolean;
}

export const defaultState: AppState = {
  loginFormError: null,
  user: null,
  isLoading: false,
};
