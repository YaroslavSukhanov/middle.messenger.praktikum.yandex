import Block from '../../core/Block.ts';
import template from './profile-screen.hbs';
import { Field } from '../../components/Field/index.ts';
import { Action } from '../../components/Action/index.ts';
import { setStorage } from '../../utils/setStorage.ts';
import { validate } from '../../utils/validation.ts';

export type TFormValues = {
  mail: string;
  login: string;
  name: string;
  surname: string;
  nickname?: string;
  phone: string;
  password?: string;
}

const profileStore: Partial<TFormValues> = {};

class ProfilePage extends Block {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super({});
  }

  protected init() {
    this.children.mailField = new Field({
      label: 'Mail',
      name: 'mail',
      placeholder: 'Mail',
      events: { change: (evt: KeyboardEvent) => setStorage(evt, profileStore) },
    });

    this.children.loginField = new Field({
      label: 'Login',
      name: 'login',
      placeholder: 'Login',
      events: { change: (evt: KeyboardEvent) => setStorage(evt, profileStore) },
    });

    this.children.nameField = new Field({
      label: 'Name',
      name: 'name',
      placeholder: 'Name',
      events: { change: (evt: KeyboardEvent) => setStorage(evt, profileStore) },
    });

    this.children.surnameField = new Field({
      label: 'Surname',
      name: 'surname',
      placeholder: 'Surname',
      events: { change: (evt: KeyboardEvent) => setStorage(evt, profileStore) },
    });

    this.children.nicknameField = new Field({
      label: 'Nickname',
      name: 'nickname',
      placeholder: 'Nickname',
      events: { change: (evt: KeyboardEvent) => setStorage(evt, profileStore) },
    });
    this.children.phoneField = new Field({
      label: 'Phone number',
      name: 'phone',
      placeholder: 'Phone',
      events: { change: (evt: KeyboardEvent) => setStorage(evt, profileStore) },
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
    return this.compile(template, { ...this.props });
  }
}

export const profilePage = new ProfilePage();
