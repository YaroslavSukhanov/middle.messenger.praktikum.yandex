import Block from '../../core/Block.ts';
import template from './chat-list-header.hbs';
import { withRouter } from "../../utils/withRouter";
import { withStore } from "../../utils/withStore";
import { ChatCard } from "../ChatCard";

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
// export default withStore(ChatListHeader);

