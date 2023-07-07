import Block from '../../core/Block.ts';
import template from './sign-in-screen.hbs';
import { Field } from '../../components/Field/index.ts';
import { Action } from '../../components/Action/index.ts';
import {
  setStorage, controlInvalidState, getTip, validate,
} from '../../utils/index.ts';
import { authService } from '../../services/auth.service.ts';
import { withStore } from "../../utils/withStore";
import { withRouter } from "../../utils/withRouter";
import { router } from "../../router";
import { chatsService } from "../../services/chats.service";

type TSignInStore = {
  login: string;
  password: string;
}

const signInStore: TSignInStore = {};

class SignInPage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    console.log(this.props.store.state.user, 'this.props.store.state.user');
    if (this.props.store.state.user) {
      this.props.router.go('/mainPage');
    }
  }

  protected init() {
    this.children.loginField = new Field({
      label: 'Login',
      name: 'login',
      placeholder: 'Login',
      value: this.props.loginField,
      events: {
        change: (evt: KeyboardEvent) => {
          const {value} = evt.target;
          this.setProps({loginField: value});
          setStorage(evt, signInStore);
        },
        focusout: () => {
          const field = this.children.loginField.element.querySelector('input');
          const invalid = validate([{[field.name]: field.value}]);
          const errorText = getTip(invalid, field);
          this.children.loginField.setProps({error: errorText});
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.passwordField = new Field({
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
      value: this.props.passwordField,
      events: {
        change: (evt: KeyboardEvent) => {
          const {value} = evt.target;
          this.setProps({passwordField: value});
          setStorage(evt, signInStore);
        },
        focusout: () => {
          const field = this.children.passwordField.element.querySelector('input');
          const invalid = validate([{[field.name]: field.value}]);
          const errorText = getTip(invalid, field);
          this.children.passwordField.setProps({error: errorText});
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.signInGoAction = new Action({
      label: 'Go! (Submit)',
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

            window.store.dispatch(authService.logIn, {
              login: signInStore.login,
              password: signInStore.password,
            });

            window.store.dispatch(chatsService.getChats);
          }
        },
      },
    });

    this.children.signUpAction = new Action({
      label: 'Sign Up',
      events: {
        click: () => {
          router.go('/signUp');
        },
      },
    });
  }

  protected render(): DocumentFragment {
    this.init();
    return this.compile(template, {...this.props});
  }
}

export default withRouter(withStore(SignInPage));
