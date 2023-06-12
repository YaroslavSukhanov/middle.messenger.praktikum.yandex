import Block from '../../core/Block.ts';
import template from './chat-list-header.hbs';

class ChatListHeader extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const chatListHeader = new ChatListHeader();
