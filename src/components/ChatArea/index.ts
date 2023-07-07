import Block from '../../core/Block.ts';
import template from './chat-area.hbs';
import { withStore } from "../../utils/withStore";

class ChatArea extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}

// export const chatArea = new ChatArea();
export default withStore(ChatArea);

