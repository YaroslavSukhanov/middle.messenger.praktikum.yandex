import Block from '../../core/Block.ts';
import template from './400-error-screen.hbs';

class ErrorPage400 extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const errorPage400 = new ErrorPage400();
