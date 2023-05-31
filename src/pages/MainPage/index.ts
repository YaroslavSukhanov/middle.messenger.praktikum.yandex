import Block from '../../core/Block.ts';
import template from './main-screen.hbs';
import { leftPanelArea } from '../../components/LeftPanelArea/index.ts';
import { chatArea } from '../../components/ChatArea/index.ts';

class MainPage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected init() {
    console.log(this.children, 'this.children');
    this.children.leftPanelArea = leftPanelArea;
    this.children.chatArea = chatArea;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const mainPage = new MainPage();
