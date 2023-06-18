import { authTransport } from '../api/auth.transport.ts';
import { hasError } from '../utils/hasError.ts';
import { transformUser, User } from '../utils/apiAdapters.ts';
import { UserDTO } from '../api/types.ts';
import { Dispatch } from '../core/Store.ts';
import { AppState } from '../types/appTypes.ts';
import { profileTransport } from '../api/profile.transport.ts';

class ProfileService {
  changeUserInfo(dispatch: Dispatch<AppState>, state: AppState, payload: Partial<UserDTO>) {
    dispatch({ isLoading: true });

    const response = profileTransport.changeInfo(payload);

    if (hasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
    }

    dispatch({ user: response as User });
  }

  changeUserAvatar(formData: FormData) {

  }

  changeUserPassword(data: Record<string, string>) {}
}

export const authService = new ProfileService();
