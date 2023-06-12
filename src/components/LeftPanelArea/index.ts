import Block from '../../core/Block.ts';
import template from './left-panel-area.hbs';
import { chatListHeader } from '../ChatListHeader/index.ts';
import { chatList } from '../ChatList/index.ts';

class LeftPanelArea extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected init() {
    this.children.chatListHeader = chatListHeader;
    this.children.chatList = chatList;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const leftPanelArea = new LeftPanelArea();
