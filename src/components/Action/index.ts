import Block from '../../core/Block.ts';
import template from './action.hbs';

export type TActionProps = {
  label: string;
  events: {
    click?: (evt?: PointerEvent) => void;
  };
}

export class Action extends Block {
  constructor(props: TActionProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
