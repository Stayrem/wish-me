import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { IntlProvider } from 'react-intl'
import { getLang } from "./utils/getLang";
import ru from './intl/ru';
import en from './intl/en';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const lang = getLang();
function loadLocaleData(locale: string) {
  switch (locale) {
    case 'ru-RU':
      return ru
    default:
      return en
  }
}
root.render(
    <IntlProvider messages={loadLocaleData(lang)} locale={lang} defaultLocale="en">
        <App />
    </IntlProvider>
);

