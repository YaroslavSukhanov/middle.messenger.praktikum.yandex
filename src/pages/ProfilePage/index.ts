import Block from '../../core/Block.ts';
import template from './profile-screen.hbs';
import { Field } from '../../components/Field/index.ts';
import { Action } from '../../components/Action/index.ts';
import {
  setStorage, controlInvalidState, getTip, validate,
} from '../../utils/index.ts';
import { withStore } from '../../utils/wothStore.ts';

export type TFormValues = {
  mail: string;
  login: string;
  name: string;
  surname: string;
  nickname?: string;
  phone: string;
  password?: string;
}

// const state = window.store.getState();
// console.log(state, 'state');

const profileStore: Partial<TFormValues> = {};

class ProfilePage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected init() {
    console.log(window, 'window.store.getState()');
    // const state = window.store.getState();
    // const {
    //   id, login, firstName, displayName, secondName, phone, email, avatar,
    // } = state.user;

    this.children.mailField = new Field({
      label: 'Mail',
      name: 'mail',
      placeholder: 'Mail',
      value: this.props.mail,
      events: {
        change: (evt: KeyboardEvent) => {
          const { value } = evt.target;
          // window.store.dispatch(state.user?.email);
          this.setProps({ mailField: value });
          setStorage(evt, profileStore);
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
          setStorage(evt, profileStore);
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
          setStorage(evt, profileStore);
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
          setStorage(evt, profileStore);
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

    this.children.nicknameField = new Field({
      label: 'Nickname',
      name: 'nickname',
      placeholder: 'Nickname',
      value: this.props.nicknameField,
      events: {
        change: (evt: KeyboardEvent) => {
          const { value } = evt.target;
          this.setProps({ nicknameField: value });
          setStorage(evt, profileStore);
        },
      },
      focusout: () => {
        const field = this.children.nicknameField.element.querySelector('input');
        const invalid = validate([{ [field.name]: field.value }]);
        const errorText = getTip(invalid, field);
        this.children.nicknameField.setProps({ error: errorText });
        controlInvalidState(invalid, field);
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
          setStorage(evt, profileStore);
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

    this.children.changeDataAction = new Action({
      label: 'Изменить данные (Submit)',
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
            this.children.changeDataAction.element?.classList.add('actions__button_invalid');
          } else {
            this.children.changeDataAction.element?.classList.remove('actions__button_invalid');
            console.log(profileStore);
          }
        },
      },
    });
    this.children.changePasswordAction = new Action({
      label: 'Изменить пароль',
      events: {
        click: (data: object) => console.log(data),
      },
    });
    this.children.quitAction = new Action({
      label: 'Выйти',
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

export const profilePage = new ProfilePage();
// export default withStore(profilePage);
