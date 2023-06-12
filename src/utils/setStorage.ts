export function setStorage(evt: any, store: Record<string, string>): void {
  const { value } = evt.target;
  store[evt.target.name] = value;
}
