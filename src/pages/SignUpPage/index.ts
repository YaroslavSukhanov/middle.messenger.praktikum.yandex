import Block from '../../core/Block.ts';
import template from './sign-up-screen.hbs';
import { Field } from '../../components/Field/index.ts';
import { Action } from '../../components/Action/index.ts';
import {
  setStorage, controlInvalidState, getTip, validate,
} from '../../utils/index.ts';

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
      value: this.props.mailField,
      events: {
        change: (evt: KeyboardEvent) => {
          const { value } = evt.target;
          this.setProps({ mailField: value });
          setStorage(evt, signUpStore);
        },
        focusout: () => {
          const field = this.children.mailField.element.querySelector('input');
          const invalid = validate([{ [field.name]: field.value }]);
          const errorText = getTip(invalid, field);
          this.children.mailField.setProps({ error: errorText });
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.loginField = new Field({
      label: 'Login',
      name: 'login',
      placeholder: 'Login',
      value: this.props.loginField,
      events: {
        change: (evt: KeyboardEvent) => {
          const { value } = evt.target;
          this.setProps({ loginField: value });
          setStorage(evt, signUpStore);
        },
        focusout: () => {
          const field = this.children.loginField.element.querySelector('input');
          const invalid = validate([{ [field.name]: field.value }]);
          const errorText = getTip(invalid, field);
          this.children.loginField.setProps({ error: errorText });
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.nameField = new Field({
      label: 'Name',
      name: 'name',
      placeholder: 'Name',
      value: this.props.nameField,
      events: {
        change: (evt: KeyboardEvent) => {
          const { value } = evt.target;
          this.setProps({ nameField: value });
          setStorage(evt, signUpStore);
        },
        focusout: () => {
          const field = this.children.nameField.element.querySelector('input');
          const invalid = validate([{ [field.name]: field.value }]);
          const errorText = getTip(invalid, field);
          this.children.nameField.setProps({ error: errorText });
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.surnameField = new Field({
      label: 'Surname',
      name: 'surname',
      placeholder: 'Surname',
      value: this.props.surnameField,
      events: {
        change: (evt: KeyboardEvent) => {
          const { value } = evt.target;
          this.setProps({ surnameField: value });
          setStorage(evt, signUpStore);
        },
        focusout: () => {
          const field = this.children.surnameField.element.querySelector('input');
          const invalid = validate([{ [field.name]: field.value }]);
          const errorText = getTip(invalid, field);
          this.children.surnameField.setProps({ error: errorText });
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.phoneField = new Field({
      label: 'Phone number',
      name: 'phone',
      placeholder: 'Phone',
      value: this.props.phoneField,
      events: {
        change: (evt: KeyboardEvent) => {
          const { value } = evt.target;
          this.setProps({ phoneField: value });
          setStorage(evt, signUpStore);
        },
        focusout: () => {
          const field = this.children.phoneField.element.querySelector('input');
          const invalid = validate([{ [field.name]: field.value }]);
          const errorText = getTip(invalid, field);
          this.children.phoneField.setProps({ error: errorText });
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
          const { value } = evt.target;
          this.setProps({ passwordField: value });
          setStorage(evt, signUpStore);
        },
        focusout: () => {
          const field = this.children.passwordField.element.querySelector('input');
          const invalid = validate([{ [field.name]: field.value }]);
          const errorText = getTip(invalid, field);
          this.children.passwordField.setProps({ error: errorText });
          controlInvalidState(invalid, field);
        },
      },
    });

    this.children.repeatedPasswordField = new Field({
      label: 'Password again',
      name: 'repeatedPassword',
      placeholder: 'Password',
      value: this.props.repeatedPasswordField,
      events: {
        change: (evt: KeyboardEvent) => {
          const { value } = evt.target;
          this.setProps({ repeatedPasswordField: value });
          setStorage(evt, signUpStore);
        },
        focusout: () => {
          const field = this.children.repeatedPasswordField.element.querySelector('input');
          const invalid = validate([{ [field.name]: field.value }]);
          const errorText = getTip(invalid, field);
          this.children.repeatedPasswordField.setProps({ error: errorText });
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
                [this.children[key].element?.querySelector('input').name]:
                this.children[key].element?.querySelector('input').value,
              });
            }
          }
          const invalid = validate(listOfFields);
          if (invalid) {
            this.children.signUpAction.element?.classList.add('actions__button_invalid');
          } else {
            this.children.signUpAction.element?.classList.remove('actions__button_invalid');
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
    this.init();
    return this.compile(template, { ...this.props });
  }
}

export const signUpPage = new SignUpPage({ error: 'OOOOOOOO' });
