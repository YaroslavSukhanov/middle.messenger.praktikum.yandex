import { authTransport } from '../api/auth.transport.ts';
import { hasError } from '../utils/hasError.ts';
import { transformUser } from '../utils/apiAdapters.ts';
import { UserDTO } from '../api/types.ts';
import { Dispatch } from '../core/Store.ts';
import { AppState } from '../types/appTypes.ts';
import { router } from '../router';

class AuthService {
  async logIn(dispatch, state, payload) {
    dispatch({ isLoading: true });

    const response = await authTransport.login(payload);

    if (hasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
    }

    const responseUser = await authTransport.getOwnInfo();

    dispatch({ isLoading: false, loginFormError: null });

    if (hasError(responseUser)) {
      dispatch(this.logOut);
      return;
    }

    dispatch({ user: transformUser(responseUser as UserDTO) });

    router.go('/mainPage');
  }

  async signUp(dispatch, state, action) {
    dispatch({ isLoading: true });
    const signUpresponse = await authTransport.signUp(action);
    console.log(signUpresponse, 'response');

    if (hasError(signUpresponse)) {
      console.log('Error');
      dispatch({ loginFormError: signUpresponse.reason });
    } else {
      window.store.dispatch({ userId: signUpresponse.id });
      router.go('/mainPage');
    }
    //
    // window.store.dispatch({ userId: signUpresponse.id });
    // router.go('/mainPage');
  }

  logOut(dispatch: Dispatch<AppState>) {
    authTransport.logOut();
  }
}

export const authService = new AuthService();
