import Block from '../../core/Block.ts';
import template from './field.hbs';

export type TFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  error?: string;
  value?: string;
  events: {
    change: (evt: KeyboardEvent) => void;
    focusout?: (evt: KeyboardEvent) => void;
  };
}

export class Field extends Block {
  constructor(props: TFieldProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
