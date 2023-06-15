import { authTransport } from '../api/auth.transport.ts';
import { hasError } from '../utils/hasError.ts';
import { transformUser } from '../utils/apiAdapters.ts';
import { UserDTO } from '../api/types.ts';
import { Dispatch } from '../core/Store.ts';
import { AppState } from '../types/appTypes.ts';

class AuthService {
  async logIn(dispatch, state, action) {
    dispatch({ isLoading: true });

    const response = await authTransport.login(action);

    if (hasError(response)) {
      dispatch({ isLoading: true, loginFormError: response.reason });
    }

    const responseUser = await authTransport.getOwnInfo();

    dispatch({ isLoading: false, loginFormError: null });

    if (hasError(responseUser)) {
      dispatch(this.logOut);
      return;
    }

    dispatch({ user: transformUser(responseUser as UserDTO) });
  }

  async signUp(dispatch, state, action) {
    dispatch({ isLoading: true });
    const response = await authTransport.signUp(action);
    console.log(response, 'response');

    if (hasError(response)) {
      console.log('Error');
      dispatch({ loginFormError: response.reason });
    }

    // window.store.dispatch({userId: response.id})
  }

  logOut(dispatch: Dispatch<AppState>) {
    authTransport.logOut();
  }
}

export const authService = new AuthService();
