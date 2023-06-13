import { authTransport } from '../api/auth.transport.ts';
import { hasError } from '../utils/hasError.ts';
import { transformUser } from '../utils/apiAdapters.ts';
import { UserDTO } from '../api/types.ts';

class AuthService {
  async logIn(dispatch, state, action) {
    const response = await authTransport.login(action);

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
  }

  getUser() {

  }

  logOut() {

  }
}

export const authService = new AuthService();
