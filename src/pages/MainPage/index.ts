import Block from '../../core/Block.ts';
import template from './main-screen.hbs';
import { leftPanelArea } from '../../components/LeftPanelArea/index.ts';
import chatArea from '../../components/ChatArea/index.ts';
import { withRouter } from '../../utils/withRouter.ts';
import { withStore } from '../../utils/withStore.ts';

class MainPage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected init() {
    this.children.leftPanelArea = leftPanelArea;
    this.children.chatArea = chatArea;
  }

  protected render(): DocumentFragment {
    console.log(this.props, 'this.props');
    return this.compile(template, {...this.props});
  }
}

// export const mainPage = new MainPage();
export default withRouter(MainPage);
