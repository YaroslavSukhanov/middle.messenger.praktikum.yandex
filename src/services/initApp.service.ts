import type { Dispatch } from '../core/Store.ts';
import { hasError } from '../utils/hasError.ts';
import { AppState } from '../types/appTypes.ts';
import { User } from '../utils/apiAdapters.ts';
import { authTransport } from '../api/auth.transport.ts';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await authTransport.getOwnInfo();

    if (hasError(response)) {
      return;
    }

    dispatch({ user: response as User });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
