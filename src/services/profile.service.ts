import { authTransport } from '../api/auth.transport.ts';
import { hasError } from '../utils/hasError.ts';
import { transformUser } from '../utils/apiAdapters.ts';
import { UserDTO } from '../api/types.ts';
import { Dispatch } from '../core/Store.ts';
import { AppState } from '../types/appTypes.ts';

class ProfileService {
  changeUserInfo(data: Partial<UserDTO>) {
    
  }

  changeUserAvatar(formData: FormData) {

  }

  changeUserPassword(data: Record<string, string>) {}
}

export const authService = new ProfileService();
