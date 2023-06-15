import { AllPages } from './pages/AllPages/index.ts';
import renderDOM from './utils/renderDom.ts';
import { mainPage } from './pages/MainPage/index.ts';
import { profilePage } from './pages/ProfilePage/index.ts';
import { signUpPage } from './pages/SignUpPage/index.ts';
import { signInPage } from './pages/SignInPage/index.ts';
import { errorPage500 } from './pages/500ErrorPage/index.ts';
import { errorPage400 } from './pages/400ErrorPage/index.ts';
import { Store } from './core/Store.ts';
import { AppState, defaultState } from './types/appTypes.ts';

declare global {
  interface Window {
    store: Store<AppState>;
    // router: HashRouter;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const pages = [
    { link: '/home', label: 'Home' },
    { link: '/profile', label: 'Profile' },
    { link: '/sign-up', label: 'Sign Up' },
    { link: '/sign-in', label: 'Sign In' },
    { link: '/400-error', label: '400 Error' },
    { link: '/500-error', label: '500 Error' },
  ];
  const allPages = new AllPages({ pages });

  document.addEventListener('DOMContentLoaded', () => {
    const store = new Store<AppState>(defaultState);

    /**
     * Помещаем роутер и стор в глобальную область для доступа в хоках with*
     * @warning Не использовать такой способ на реальный проектах
     */
    window.store = store;

    store.on('changed', (prevState, nextState) => {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
    });


    /**
     * Загружаем данные для приложения
     */
    store.dispatch(initApp);
  });

  switch (window.location.pathname) {
    case '/home':
      renderDOM(mainPage);
      break;
    case '/profile':
      renderDOM(profilePage);
      break;
    case '/sign-up':
      renderDOM(signUpPage);
      break;
    case '/sign-in':
      renderDOM(signInPage);
      break;
    case '/500-error':
      renderDOM(errorPage500);
      break;
    case '/400-error':
      renderDOM(errorPage400);
      break;
    default: renderDOM(profilePage);
      break;
  }
});
