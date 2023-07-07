import { Store } from './core/Store.ts';
import { AppState, defaultState } from './types/appTypes.ts';
import { initApp } from './services/initApp.service.ts';
import { initRouter } from './router.ts';

declare global {
  interface Window {
    store: Store<AppState>;
    // router: HashRouter;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.store = store;

  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      initRouter(store);
    }
  });
  /**
   * Загружаем данные для приложения
   */
  store.dispatch(initApp);
});
