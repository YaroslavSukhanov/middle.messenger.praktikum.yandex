import transport from './transport.ts';

type TLoginRequestData = {
  login: string;
  password: string;
}

type TSignUpRequest = {
  'first_name': string,
  'second_name': string,
  'login': string,
  'email': string,
  'password': string,
  'phone': string
}

const baseUrl = 'https://ya-praktikum.tech/api/v2/auth/';

class AuthTransport {
  login(data: TLoginRequestData): void {
    transport.post(`${baseUrl}signin`, { data, timeout: 1000 });
  }

  signUp(data: TSignUpRequest) {
    transport.post(`${baseUrl}signup`, { data, timeout: 1000 });
  }

  getOwnInfo(): object {
    console.log(transport.get(`${baseUrl}user`), 'transport.getuser`)');
    return transport.get(`${baseUrl}user`);
  }

  logOut(): void {
    transport.post(`${baseUrl}logout`);
  }
}

export const authTransport = new AuthTransport();
