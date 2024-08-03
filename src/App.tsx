import React, {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import css from './styles.module.css';
import { Wishlists} from './pages/Wishlists';
import { WishlistCreate } from './components/WishlistCreate';
import {Menu} from "./layout/Menu";
import {Wishlist} from "./pages/WishList";
import { ConfigProvider, theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const [theme, setTheme] = useState(window.Telegram.WebApp.colorScheme)
  useEffect(() => {
    window.Telegram.WebApp.expand();
    Telegram.WebApp.onEvent('themeChanged', () => setTheme(window.Telegram.WebApp.colorScheme));
  }, [])
  return (
    <ConfigProvider theme={{
      algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
    }} >
    <div className={css.app}>
      <div className={css.wrapper}>
        <BrowserRouter>
          <div className={css.main}>
            <Routes>
              <Route path="/wishlists" element={<Wishlists />} />
              <Route path="/wishlists/create" element={<WishlistCreate />} />
              <Route path="/wishlist/:id" element={<Wishlist />} />
              <Route path="/wishlists/:id/add" element={<Wishlist />} />
              <Route path="*" element={<Navigate to="/wishlists" replace />} />
            </Routes>
          </div>
          <Menu />
        </BrowserRouter>
      </div>
    </div>
    </ConfigProvider>
  );
}

export default App;
