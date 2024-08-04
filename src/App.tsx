import React, {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import css from './styles.module.css';
import { Wishlists} from './pages/Wishlists';
import { WishlistCreate } from './components/WishlistCreate';
import {Wishlist} from "./pages/WishList";
import { ConfigProvider, theme } from "antd";
import {Item} from "./pages/Item";
import localeRu from 'antd/locale/ru_RU';
import localeEN from 'antd/locale/en_US';
import dayjs from 'dayjs';

const lang = Telegram.WebApp.initDataUnsafe.user?.language_code || '';

dayjs.locale(lang === 'ru' ? 'ru_RU' : 'en_US');
const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const [theme, setTheme] = useState(window.Telegram.WebApp.colorScheme)
  useEffect(() => {
    window.Telegram.WebApp.expand();
    Telegram.WebApp.onEvent('themeChanged', () => setTheme(window.Telegram.WebApp.colorScheme));
  }, [])
  return (
    <ConfigProvider locale={lang === 'ru' ? localeRu : localeEN} theme={{
      algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
    }} >
    <div className={css.app}>
      <div className={css.wrapper}>
        <BrowserRouter>
          <div className={css.main}>
            <Routes>
              <Route path="/wishlists" element={<Wishlists />} />
              <Route path="/wishlists/create" element={<WishlistCreate />} />
              <Route path="/wishlists/:id" element={<Wishlist />} />
              <Route path="/wishlists/:id/add" element={<Wishlist />} />
              <Route path="/wishlists/:id/:itemId" element={<Item />} />
              <Route path="*" element={<Navigate to="/wishlists" replace />} />
            </Routes>
          </div>
{/*
          <Menu />
*/}
        </BrowserRouter>
      </div>
    </div>
    </ConfigProvider>
  );
}

export default App;
