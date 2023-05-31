import Block from '../../core/Block.ts';
import template from './500-error-screen.hbs';

class ErrorPage500 extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const errorPage500 = new ErrorPage500();
