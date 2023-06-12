import { AllPages } from './pages/AllPages/index.ts';
import renderDOM from './utils/renderDom.ts';
import { mainPage } from './pages/MainPage/index.ts';
import { profilePage } from './pages/ProfilePage/index.ts';
import { signUpPage } from './pages/SignUpPage/index.ts';
import { signInPage } from './pages/SignInPage/index.ts';
import { errorPage500 } from './pages/500ErrorPage/index.ts';
import { errorPage400 } from './pages/400ErrorPage/index.ts';

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
    default: renderDOM(allPages);
      break;
  }
});
