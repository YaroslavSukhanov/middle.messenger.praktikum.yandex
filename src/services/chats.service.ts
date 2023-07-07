import { hasError } from '../utils/hasError.ts';
import { chatsTransport } from '../api/chats.transport';

class ChatsService {
  async getChats(dispatch, state, payload) {
    dispatch({ isLoading: true });

    // const chatList = await chatsTransport.getChats();
    const chatList = [
      {
        id: 123,
        title: 'my-chat',
        avatar: '/123/avatar1.jpg',
        unread_count: 15,
        last_message: {
          user: {
            first_name: 'Petya',
            second_name: 'Pupkin',
            avatar: '/path/to/avatar.jpg',
            email: 'my@email.com',
            login: 'userLogin',
            phone: '8(911)-222-33-22',
          },
          time: '2020-01-02T14:22:22.000Z',
          content: 'this is message content',
        },
      },
      {
        id: 123,
        title: 'my-chat',
        avatar: '/123/avatar1.jpg',
        unread_count: 15,
        last_message: {
          user: {
            first_name: 'Petya',
            second_name: 'Pupkin',
            avatar: '/path/to/avatar.jpg',
            email: 'my@email.com',
            login: 'userLogin',
            phone: '8(911)-222-33-22',
          },
          time: '2020-01-02T14:22:22.000Z',
          content: 'this is message content',
        },
      },
      {
        id: 123,
        title: 'my-chat',
        avatar: '/123/avatar1.jpg',
        unread_count: 15,
        last_message: {
          user: {
            first_name: 'Petya',
            second_name: 'Pupkin',
            avatar: '/path/to/avatar.jpg',
            email: 'my@email.com',
            login: 'userLogin',
            phone: '8(911)-222-33-22',
          },
          time: '2020-01-02T14:22:22.000Z',
          content: 'this is message content',
        },
      },
      {
        id: 123,
        title: 'my-chat',
        avatar: '/123/avatar1.jpg',
        unread_count: 15,
        last_message: {
          user: {
            first_name: 'Petya',
            second_name: 'Pupkin',
            avatar: '/path/to/avatar.jpg',
            email: 'my@email.com',
            login: 'userLogin',
            phone: '8(911)-222-33-22',
          },
          time: '2020-01-02T14:22:22.000Z',
          content: 'this is message content',
        },
      },
      {
        id: 123,
        title: 'my-chat',
        avatar: '/123/avatar1.jpg',
        unread_count: 15,
        last_message: {
          user: {
            first_name: 'Petya',
            second_name: 'Pupkin',
            avatar: '/path/to/avatar.jpg',
            email: 'my@email.com',
            login: 'userLogin',
            phone: '8(911)-222-33-22',
          },
          time: '2020-01-02T14:22:22.000Z',
          content: 'this is message content',
        },
      },
    ];

    if (hasError(chatList)) {
      dispatch({ isLoading: false, loginFormError: chatList.reason });
    }

    dispatch({ isLoading: false, loginFormError: null });

    dispatch({ chats: chatList });
  }
}

export const chatsService = new ChatsService();
