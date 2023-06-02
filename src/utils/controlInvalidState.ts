export function controlInvalidState(isInvalid: boolean, field): void {
  if (isInvalid) {
    field.classList.add('fields__input_invalid');
  } else {
    field.classList.remove('fields__input_invalid');
  }
}
