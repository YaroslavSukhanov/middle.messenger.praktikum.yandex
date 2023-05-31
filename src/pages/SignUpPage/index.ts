import Block from '../../core/Block.ts';
import template from './sign-up-screen.hbs';
import { Field } from '../../components/Field/index.ts';
import { Action } from '../../components/Action/index.ts';
import { setStorage } from '../../utils/setStorage.ts';
import { validate } from '../../utils/validation.ts';

function controlInvalidState(isInvalid: boolean, field): void {
  const input = field.element.lastElementChild;
  if (isInvalid) {
    input.classList.add('fields__input_invalid');
  } else {
    input.classList.remove('fields__input_invalid');
  }
}

const signUpStore = {};

export type TSignUpPageProps = {
  error?: string;
}

class SignUpPage extends Block {
  constructor(props: TSignUpPageProps) {
    super(props);
  }

  protected init() {
    this.children.mailField = new Field({
      label: 'Mail',
      name: 'mail',
      placeholder: 'Mail',
      events: {
        change: (evt: KeyboardEvent) => setStorage(evt, signUpStore),
        focusout: () => {
          const field = this.children.mailField;
          const invalid = validate([{
            [field.element.lastElementChild.name]: field.element.lastElementChild.value,
          }]);
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.loginField = new Field({
      error: 'AAAAAAAAA',
      label: 'Login',
      name: 'login',
      placeholder: 'Login',
      events: {
        change: (evt: KeyboardEvent) => setStorage(evt, signUpStore),
        focusout: () => {
          const field = this.children.loginField;
          const invalid = validate([{
            [field.element.lastElementChild.name]: field.element.lastElementChild.value,
          }]);
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.nameField = new Field({
      label: 'Name',
      name: 'name',
      placeholder: 'Name',
      events: {
        change: (evt: KeyboardEvent) => setStorage(evt, signUpStore),
        focusout: () => {
          const field = this.children.nameField;
          const invalid = validate([{
            [field.element.lastElementChild.name]: field.element.lastElementChild.value,
          }]);
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.surnameField = new Field({
      label: 'Surname',
      name: 'surname',
      placeholder: 'Surname',
      events: {
        change: (evt: KeyboardEvent) => setStorage(evt, signUpStore),
        focusout: () => {
          const field = this.children.surnameField;
          const invalid = validate([{
            [field.element.lastElementChild.name]: field.element.lastElementChild.value,
          }]);
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.phoneField = new Field({
      label: 'Phone number',
      name: 'phone',
      placeholder: 'Phone',
      events: {
        change: (evt: KeyboardEvent) => setStorage(evt, signUpStore),
        focusout: () => {
          const field = this.children.phoneField;
          const invalid = validate([{
            [field.element.lastElementChild.name]: field.element.lastElementChild.value,
          }]);
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.passwordField = new Field({
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
      events: {
        change: (evt: KeyboardEvent) => setStorage(evt, signUpStore),
        focusout: () => {
          const field = this.children.passwordField;
          const invalid = validate([{
            [field.element.lastElementChild.name]: field.element.lastElementChild.value,
          }]);
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.repeatedPasswordField = new Field({
      label: 'Password again',
      name: 'repeatedPassword',
      placeholder: 'Password',
      events: {
        change: (evt: KeyboardEvent) => setStorage(evt, signUpStore),
        focusout: () => {
          const field = this.children.repeatedPasswordField;
          const invalid = validate([{
            [field.element.lastElementChild.name]: field.element.lastElementChild.value,
          }]);
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.signUpAction = new Action({
      label: 'Sign Up (Submit)',
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
            this.children.signUpAction.element?.classList.add('actions__button_invalid');
          } else {
            this.children.signUpAction.element?.classList.remove('actions__button_invalid');
            console.log(signUpStore);
          }
        },
      },
    });
    this.children.signInPasswordAction = new Action({
      label: 'Sign In',
      events: {
        click: (data: object) => console.log(data),
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const signUpPage = new SignUpPage({ error: 'OOOOOOOO' });
