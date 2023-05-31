import Block from '../../core/Block.ts';
import template from './chat-area.hbs';

class ChatArea extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const chatArea = new ChatArea();
