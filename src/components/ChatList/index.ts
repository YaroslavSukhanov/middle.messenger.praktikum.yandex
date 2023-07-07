import Block from '../../core/Block.ts';
import template from './chat-list.hbs';
import { chatCard } from '../ChatCard/index.ts';
import { chatsService } from '../../services/chats.service.ts';
import { withRouter } from '../../utils/withRouter.ts';
import { withStore } from '../../utils/withStore.ts';

class ChatList extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
    window.store.dispatch(chatsService.getChats);
    if (true) {
      console.log(window.store.getState().chats, 'this.props.store.state.chats');
    }
  }

  protected init() {
    this.children.chatCard = chatCard;
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}

// export const chatList = new ChatList();
export default withStore(ChatList);
