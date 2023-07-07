import Block from '../../core/Block.ts';
import template from './chat-card.hbs';
import { withRouter } from '../../utils/withRouter.ts';
import { withStore } from '../../utils/withStore.ts';

interface ChatCardProps {
  events: {
    click: () => void;

  }
}

export class ChatCard extends Block<ChatCardProps> {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatCardProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const chatCard = new ChatCard({ events: { click: () => console.log('onClick') } });
// export default(ChatCard);
