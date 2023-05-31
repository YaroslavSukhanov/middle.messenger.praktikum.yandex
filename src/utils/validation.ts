const formRegexp = {
  mail: /^[\w\-#!$@%^&*+~=:;?/]+@[A-Za-z]+\.+[A-Za-z]{2,}$/,
  login: /^(?=.*[A-Za-z])[\w-]{3,20}$/,
  name: /^[A-ZА-Я]+[A-Za-zА-Яа-я-]*$/,
  surname: /^[A-ZА-Я]+[A-Za-zА-Яа-я-]*$/,
  phone: /^\+?\d{10,15}$/,
  password: /^(?=.*[A-ZА-Я])(?=.*\d)\w{8,40}$/,
  repeatedPassword: /^(?=.*[A-ZА-Я])(?=.*\d)\w{8,40}$/,
};

export function validate(inputList: Array<Record<string, string>>): boolean {
  return inputList.some((input): boolean => {
    if (formRegexp[Object.keys(input)[0]] instanceof RegExp) {
      return !formRegexp[Object.keys(input)[0]].test(Object.values(input)[0]);
    }
    return false;
  });
}
