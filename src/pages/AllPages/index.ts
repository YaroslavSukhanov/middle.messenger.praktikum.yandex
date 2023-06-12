import template from './allPages.hbs';
import Block from '../../core/Block.ts';

type link = {
  link: string;
  label: string;
};

interface AllPagesProps {
  pages: Array<link>;
}

export class AllPages extends Block {
  constructor(props: AllPagesProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
