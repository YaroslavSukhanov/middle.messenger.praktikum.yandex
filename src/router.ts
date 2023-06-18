import { PathRouter } from './core/routing/PathRouter.ts';
import { signInPage } from './pages/SignInPage/index.ts';
import { signUpPage } from './pages/SignUpPage/index.ts';
import { profilePage } from './pages/ProfilePage/index.ts';
import { mainPage } from './pages/MainPage/index.ts';

export const router = new PathRouter('#app');

export function initRouter(store) {
  router
    .use({
      pathname: '/signIn',
      block: signInPage,
    })
    .use({
      pathname: '/signUp',
      block: signUpPage,
      needAuth: false,
    })
    .use({
      pathname: '/profile',
      block: profilePage,
      needAuth: true,
      redirectPath: '/signIn',
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: '/mainPage',
      block: mainPage,
      needAuth: true,
      redirectPath: '/signIn',
      onUnautorized: () => Boolean(store.getState().user),
    })
    .start();
}
