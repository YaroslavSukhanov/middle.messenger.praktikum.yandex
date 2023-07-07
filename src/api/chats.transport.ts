import transport from './transport.ts';

const baseUrl = 'https://ya-praktikum.tech/api/v2/chats';

class ChatsTransport {
  getChats(): object {
    return transport.get(`${baseUrl}`);
  }

  createChat(data) {
    transport.post(`${baseUrl}signup`, { data, timeout: 1000 });
  }

  deleteChat(): object {
    console.log(transport.get(`${baseUrl}user`), 'transport.getuser`)');
    return transport.get(`${baseUrl}user`);
  }
}

export const chatsTransport = new ChatsTransport();
