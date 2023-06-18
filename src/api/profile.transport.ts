import transport from './transport.ts';
import { UserDTO } from './types.ts';

const baseUrl = 'https://ya-praktikum.tech/api/v2/user/';

class ProfileTransport {
  changeInfo(data: Partial<UserDTO>): void {
    transport.put(`${baseUrl}profile`, { data, timeout: 1000 });
  }

  changeAvatar(formData: FormData) {
    transport.put(`${baseUrl}profile/avatar`, { data: formData, timeout: 1000 });
  }

  changePassword(data: object): void {
    transport.put(`${baseUrl}password`, { data });
  }

  getUserInfo(id: string): void {
    transport.get(`${baseUrl}${id}`);
  }
}

export const profileTransport = new ProfileTransport();
