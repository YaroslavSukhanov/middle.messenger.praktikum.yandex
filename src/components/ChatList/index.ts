import Block from '../../core/Block.ts';
import template from './chat-list.hbs';
import { chatCard } from '../ChatCard/index.ts';

class ChatList extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected init() {
    this.children.chatCard = chatCard;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const chatList = new ChatList();
