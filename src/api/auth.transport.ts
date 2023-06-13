import transport from './transport.ts';

type TLoginRequestData = {
  login: string;
  password: string;
}

const baseUrl = 'https://ya-praktikum.tech/api/v2/auth/';

class AuthTransport {
  login(data: TLoginRequestData): void {
    transport.post(`${baseUrl}signin`, { data, timeout: 1000 });
  }

  getOwnInfo(): void {
    transport.get(`${baseUrl}user`);
  }
}

export const authTransport = new AuthTransport();
