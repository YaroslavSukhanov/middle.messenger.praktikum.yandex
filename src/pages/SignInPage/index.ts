import Block from '../../core/Block.ts';
import template from './sign-in-screen.hbs';
import { Field } from '../../components/Field/index.ts';
import { setStorage } from '../../utils/setStorage.ts';
import { Action } from '../../components/Action/index.ts';
import { validate } from '../../utils/validation.ts';

const signInStore = {};

class SignInPage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected init() {
    this.children.loginField = new Field({
      label: 'Login',
      name: 'login',
      placeholder: 'Login',
      events: { change: (evt: KeyboardEvent) => setStorage(evt, signInStore) },
    });

    this.children.passwordField = new Field({
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
      events: { change: (evt: KeyboardEvent) => setStorage(evt, signInStore) },
    });

    this.children.signInGoAction = new Action({
      label: 'Go (Submit)!',
      events: {
        click: (evt: PointerEvent) => {
          evt.preventDefault();
          const listOfFields: Array<Record<string, string>> = [];
          for (const key in this.children) {
            if (this.children[key] instanceof Field) {
              listOfFields.push({
                [this.children[key].element?.lastElementChild.name]:
                this.children[key].element?.lastElementChild.value,
              });
            }
          }
          const invalid = validate(listOfFields);
          if (invalid) {
            this.children.signInGoAction.element?.classList.add('actions__button_invalid');
          } else {
            this.children.signInGoAction.element?.classList.remove('actions__button_invalid');
            console.log(signInStore);
          }
        },
      },
    });
    this.children.signUpAction = new Action({
      label: 'Sign Up',
      events: {
        click: () => { console.log(signInStore); },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const signInPage = new SignInPage();
